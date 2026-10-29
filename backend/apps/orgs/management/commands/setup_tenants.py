from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
# pyrefly: ignore [missing-import]
from apps.orgs.models import Client, Domain

User = get_user_model()


class Command(BaseCommand):
    help = "Sets up the public tenant, demo organization, and admin user"

    def handle(self, *args, **options):
        self.stdout.write("Configuring multi-tenant environment...")

        # 1. Setup Public Tenant (Required by django-tenants)
        public_tenant, created = Client.objects.get_or_create(
            schema_name="public",
            defaults={
                "name": "amops Public Platform",
                "is_active": True,
            },
        )
        if created:
            self.stdout.write(self.style.SUCCESS("Created public tenant: public"))
        else:
            self.stdout.write("Public tenant already exists.")

        # Public Domain
        public_domain, domain_created = Domain.objects.get_or_create(
            domain="localhost",
            defaults={
                "tenant": public_tenant,
                "is_primary": True,
            },
        )
        if domain_created:
            self.stdout.write(self.style.SUCCESS("Created public domain: localhost"))

        # Also map 127.0.0.1
        Domain.objects.get_or_create(
            domain="127.0.0.1",
            defaults={
                "tenant": public_tenant,
                "is_primary": False,
            },
        )

        # 2. Setup Superuser in Public Schema
        admin_email = "admin@nexus.dev"
        if not User.objects.filter(email=admin_email).exists():
            User.objects.create_superuser(
                email=admin_email,
                username="admin",
                password="nexus_admin_password_2026",
            )
            self.stdout.write(
                self.style.SUCCESS(f"Created superuser: {admin_email} (Password: nexus_admin_password_2026)")
            )
        else:
            self.stdout.write("Admin superuser already exists.")

        # 3. Setup Demo Tenant (Triggers automatic PostgreSQL schema creation)
        demo_tenant, demo_created = Client.objects.get_or_create(
            schema_name="demo",
            defaults={
                "name": "Acme Corp (Demo)",
                "is_active": True,
            },
        )
        if demo_created:
            self.stdout.write(self.style.SUCCESS("Created demo tenant schema: demo"))
        else:
            self.stdout.write("Demo tenant already exists.")

        demo_domain, demo_dom_created = Domain.objects.get_or_create(
            domain="demo.localhost",
            defaults={
                "tenant": demo_tenant,
                "is_primary": True,
            },
        )
        if demo_dom_created:
            self.stdout.write(self.style.SUCCESS("Created demo domain: demo.localhost"))

        self.stdout.write(self.style.SUCCESS("Multi-tenant setup complete!"))

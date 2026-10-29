import uuid
from django.conf import settings
from django.db import models
from django_tenants.models import TenantMixin, DomainMixin
# pyrefly: ignore [missing-import]
from apps.core.models import BaseModel


class Client(TenantMixin):
    """
    Tenant organization representing a separate tenant schema in PostgreSQL.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=120)
    created_on = models.DateField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    # Automatically create the PostgreSQL schema upon saving
    auto_create_schema = True

    class Meta:
        verbose_name = "Tenant Organization"
        verbose_name_plural = "Tenant Organizations"

    def __str__(self):
        return f"{self.name} ({self.schema_name})"


class Domain(DomainMixin):
    """
    Domain/subdomain mapping to a tenant organization.
    """
    pass


class Workspace(BaseModel):
    """
    Logical workspace inside a tenant organization.
    """
    name = models.CharField(max_length=120)
    slug = models.SlugField(max_length=120, db_index=True)
    description = models.TextField(blank=True)
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name="owned_workspaces",
    )

    class Meta:
        ordering = ["name"]
        unique_together = ("slug",)

    def __str__(self):
        return self.name


class WorkspaceMembership(BaseModel):
    """
    User membership and role assignment within a workspace.
    """
    class RoleChoices(models.TextChoices):
        OWNER = "OWNER", "Owner"
        ADMIN = "ADMIN", "Administrator"
        MEMBER = "MEMBER", "Member"
        VIEWER = "VIEWER", "Viewer"

    workspace = models.ForeignKey(
        Workspace,
        on_delete=models.CASCADE,
        related_name="memberships",
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="workspace_memberships",
    )
    role = models.CharField(
        max_length=20,
        choices=RoleChoices.choices,
        default=RoleChoices.MEMBER,
    )

    class Meta:
        unique_together = ("workspace", "user")
        verbose_name = "Workspace Membership"
        verbose_name_plural = "Workspace Memberships"

    def __str__(self):
        return f"{self.user.email} -> {self.workspace.name} ({self.role})"

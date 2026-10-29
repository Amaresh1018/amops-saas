from django.contrib import admin
from .models import Project, Milestone, Epic, Label, Task, Subtask


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("key", "name", "workspace", "status", "owner", "created_at")
    list_filter = ("status", "workspace")
    search_fields = ("name", "key", "description")


@admin.register(Milestone)
class MilestoneAdmin(admin.ModelAdmin):
    list_display = ("title", "project", "status", "due_date")
    list_filter = ("status", "project")
    search_fields = ("title", "description")


@admin.register(Epic)
class EpicAdmin(admin.ModelAdmin):
    list_display = ("title", "project", "status", "color")
    list_filter = ("status", "project")
    search_fields = ("title", "summary")


@admin.register(Label)
class LabelAdmin(admin.ModelAdmin):
    list_display = ("name", "project", "color")
    search_fields = ("name",)


class SubtaskInline(admin.TabularInline):
    model = Subtask
    extra = 1


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ("identifier", "title", "project", "status", "priority", "assignee", "order")
    list_filter = ("status", "priority", "project", "type")
    search_fields = ("title", "description")
    inlines = [SubtaskInline]

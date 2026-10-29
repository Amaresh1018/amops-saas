from django.conf import settings
from django.db import models
# pyrefly: ignore [missing-import]
from apps.core.models import BaseModel
# pyrefly: ignore [missing-import]
from apps.orgs.models import Workspace


class Project(BaseModel):
    """
    Core project entity scoped to a tenant workspace.
    """
    class ProjectStatus(models.TextChoices):
        PLANNED = "PLANNED", "Planned"
        ACTIVE = "ACTIVE", "Active"
        PAUSED = "PAUSED", "Paused"
        COMPLETED = "COMPLETED", "Completed"
        ARCHIVED = "ARCHIVED", "Archived"

    workspace = models.ForeignKey(
        Workspace,
        on_delete=models.CASCADE,
        related_name="projects",
    )
    name = models.CharField(max_length=150)
    key = models.CharField(max_length=10, db_index=True)
    description = models.TextField(blank=True)
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name="owned_projects",
    )
    status = models.CharField(
        max_length=20,
        choices=ProjectStatus.choices,
        default=ProjectStatus.ACTIVE,
        db_index=True,
    )
    target_date = models.DateField(null=True, blank=True)

    class Meta:
        ordering = ["-created_at"]
        unique_together = ("workspace", "key")

    def save(self, *args, **kwargs):
        self.key = self.key.upper().strip()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"[{self.key}] {self.name}"


class Milestone(BaseModel):
    """
    Time-boxed milestone or release target within a project.
    """
    class MilestoneStatus(models.TextChoices):
        OPEN = "OPEN", "Open"
        CLOSED = "CLOSED", "Closed"

    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name="milestones",
    )
    title = models.CharField(max_length=150)
    description = models.TextField(blank=True)
    due_date = models.DateField(null=True, blank=True)
    status = models.CharField(
        max_length=20,
        choices=MilestoneStatus.choices,
        default=MilestoneStatus.OPEN,
    )

    class Meta:
        ordering = ["due_date", "title"]

    def __str__(self):
        return f"{self.project.key} Milestone: {self.title}"


class Epic(BaseModel):
    """
    High-level feature theme or initiative grouping tasks.
    """
    class EpicStatus(models.TextChoices):
        PLANNED = "PLANNED", "Planned"
        IN_PROGRESS = "IN_PROGRESS", "In Progress"
        COMPLETED = "COMPLETED", "Completed"

    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name="epics",
    )
    title = models.CharField(max_length=150)
    summary = models.TextField(blank=True)
    color = models.CharField(max_length=7, default="#5842FF")  # NDLS Electric Iris
    status = models.CharField(
        max_length=20,
        choices=EpicStatus.choices,
        default=EpicStatus.PLANNED,
    )

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.project.key} Epic: {self.title}"


class Label(BaseModel):
    """
    Category tag attached to tasks with bespoke NDLS colors.
    """
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name="labels",
    )
    name = models.CharField(max_length=50)
    color = models.CharField(max_length=7, default="#00D5B6")  # NDLS Cyber Teal

    class Meta:
        ordering = ["name"]
        unique_together = ("project", "name")

    def __str__(self):
        return f"{self.name} ({self.project.key})"


class Task(BaseModel):
    """
    Work item tracked across Kanban boards, sprints, and backlogs.
    """
    class TaskType(models.TextChoices):
        TASK = "TASK", "Task"
        BUG = "BUG", "Bug"
        STORY = "STORY", "Story"

    class TaskStatus(models.TextChoices):
        BACKLOG = "BACKLOG", "Backlog"
        TODO = "TODO", "To Do"
        IN_PROGRESS = "IN_PROGRESS", "In Progress"
        IN_REVIEW = "IN_REVIEW", "In Review"
        DONE = "DONE", "Done"
        CANCELLED = "CANCELLED", "Cancelled"

    class TaskPriority(models.TextChoices):
        LOW = "LOW", "Low"
        MEDIUM = "MEDIUM", "Medium"
        HIGH = "HIGH", "High"
        URGENT = "URGENT", "Urgent"

    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name="tasks",
    )
    epic = models.ForeignKey(
        Epic,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="tasks",
    )
    milestone = models.ForeignKey(
        Milestone,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="tasks",
    )
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    task_number = models.PositiveIntegerField(editable=False)
    type = models.CharField(
        max_length=20,
        choices=TaskType.choices,
        default=TaskType.TASK,
    )
    status = models.CharField(
        max_length=30,
        choices=TaskStatus.choices,
        default=TaskStatus.TODO,
        db_index=True,
    )
    priority = models.CharField(
        max_length=20,
        choices=TaskPriority.choices,
        default=TaskPriority.MEDIUM,
        db_index=True,
    )
    assignee = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="assigned_tasks",
    )
    reporter = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name="reported_tasks",
    )
    labels = models.ManyToManyField(Label, blank=True, related_name="tasks")
    story_points = models.PositiveSmallIntegerField(null=True, blank=True)
    due_date = models.DateField(null=True, blank=True)
    order = models.FloatField(default=0.0, db_index=True)

    class Meta:
        ordering = ["order", "-created_at"]
        unique_together = ("project", "task_number")

    @property
    def identifier(self) -> str:
        return f"{self.project.key}-{self.task_number}"

    def save(self, *args, **kwargs):
        if not self.task_number:
            max_num = Task.objects.filter(project=self.project).aggregate(
                models.Max("task_number")
            )["task_number__max"] or 0
            self.task_number = max_num + 1
        super().save(*args, **kwargs)

    def __str__(self):
        return f"[{self.identifier}] {self.title}"


class Subtask(BaseModel):
    """
    Granular checklist item belonging directly to a parent task.
    """
    task = models.ForeignKey(
        Task,
        on_delete=models.CASCADE,
        related_name="subtasks",
    )
    title = models.CharField(max_length=255)
    is_completed = models.BooleanField(default=False)
    order = models.FloatField(default=0.0)

    class Meta:
        ordering = ["order", "created_at"]

    def __str__(self):
        status_symbol = "✓" if self.is_completed else "○"
        return f"{status_symbol} {self.title}"

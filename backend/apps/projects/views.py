from django.db import models, transaction
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema, extend_schema_view

from .models import Project, Milestone, Epic, Label, Task, Subtask
from .serializers import (
    ProjectSerializer,
    MilestoneSerializer,
    EpicSerializer,
    LabelSerializer,
    TaskSerializer,
    TaskReorderSerializer,
    SubtaskSerializer,
)


@extend_schema_view(
    list=extend_schema(summary="List projects in current tenant workspace"),
    create=extend_schema(summary="Create a new project"),
    retrieve=extend_schema(summary="Get project details"),
    update=extend_schema(summary="Update project details"),
    destroy=extend_schema(summary="Delete a project"),
)
class ProjectViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ProjectSerializer

    def get_queryset(self):
        qs = Project.objects.annotate(
            task_count=models.Count("tasks")
        ).select_related("workspace", "owner")
        
        workspace_id = self.request.query_params.get("workspace")
        if workspace_id:
            qs = qs.filter(workspace_id=workspace_id)
            
        status_filter = self.request.query_params.get("status")
        if status_filter:
            qs = qs.filter(status=status_filter)
            
        search = self.request.query_params.get("search")
        if search:
            qs = qs.filter(models.Q(name__icontains=search) | models.Q(key__icontains=search))
            
        return qs


@extend_schema_view(
    list=extend_schema(summary="List tasks with filtering and ordering"),
    create=extend_schema(summary="Create a new task"),
    retrieve=extend_schema(summary="Get task details"),
    update=extend_schema(summary="Update a task"),
    destroy=extend_schema(summary="Delete a task"),
)
class TaskViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = TaskSerializer

    def get_queryset(self):
        qs = Task.objects.select_related(
            "project", "epic", "milestone", "assignee", "reporter"
        ).prefetch_related("labels", "subtasks")

        project_id = self.request.query_params.get("project")
        if project_id:
            qs = qs.filter(project_id=project_id)

        status_filter = self.request.query_params.get("status")
        if status_filter:
            qs = qs.filter(status=status_filter)

        priority = self.request.query_params.get("priority")
        if priority:
            qs = qs.filter(priority=priority)

        assignee_id = self.request.query_params.get("assignee")
        if assignee_id:
            qs = qs.filter(assignee_id=assignee_id)

        search = self.request.query_params.get("search")
        if search:
            qs = qs.filter(models.Q(title__icontains=search) | models.Q(description__icontains=search))

        return qs.order_by("order", "-created_at")

    @extend_schema(
        summary="Batch reorder tasks on Kanban board",
        request=TaskReorderSerializer(many=True),
        responses={200: TaskSerializer(many=True)},
    )
    @action(detail=False, methods=["post"], url_path="reorder")
    def reorder(self, request):
        """
        Updates task status and order position for drag-and-drop Kanban updates.
        Accepts a list of: [{ "id": "...", "status": "IN_PROGRESS", "order": 1.5 }]
        """
        serializer = TaskReorderSerializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)

        updated_ids = []
        with transaction.atomic():
            for item in serializer.validated_data:
                task_id = item["id"]
                new_status = item["status"]
                new_order = item["order"]
                Task.objects.filter(id=task_id).update(
                    status=new_status,
                    order=new_order,
                )
                updated_ids.append(task_id)

        updated_tasks = self.get_queryset().filter(id__in=updated_ids)
        return Response(TaskSerializer(updated_tasks, many=True).data)


class MilestoneViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = MilestoneSerializer

    def get_queryset(self):
        qs = Milestone.objects.select_related("project")
        project_id = self.request.query_params.get("project")
        if project_id:
            qs = qs.filter(project_id=project_id)
        return qs


class EpicViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = EpicSerializer

    def get_queryset(self):
        qs = Epic.objects.select_related("project")
        project_id = self.request.query_params.get("project")
        if project_id:
            qs = qs.filter(project_id=project_id)
        return qs


class LabelViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = LabelSerializer

    def get_queryset(self):
        qs = Label.objects.select_related("project")
        project_id = self.request.query_params.get("project")
        if project_id:
            qs = qs.filter(project_id=project_id)
        return qs


class SubtaskViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = SubtaskSerializer

    def get_queryset(self):
        qs = Subtask.objects.select_related("task")
        task_id = self.request.query_params.get("task")
        if task_id:
            qs = qs.filter(task_id=task_id)
        return qs

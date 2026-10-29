from rest_framework import serializers
from .models import Project, Milestone, Epic, Label, Task, Subtask


class SubtaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subtask
        fields = ["id", "task", "title", "is_completed", "order", "created_at"]
        read_only_fields = ["id", "created_at"]


class LabelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Label
        fields = ["id", "project", "name", "color", "created_at"]
        read_only_fields = ["id", "created_at"]


class EpicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Epic
        fields = ["id", "project", "title", "summary", "color", "status", "created_at"]
        read_only_fields = ["id", "created_at"]


class MilestoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Milestone
        fields = ["id", "project", "title", "description", "due_date", "status", "created_at"]
        read_only_fields = ["id", "created_at"]


class TaskSerializer(serializers.ModelSerializer):
    identifier = serializers.CharField(read_only=True)
    assignee_email = serializers.EmailField(source="assignee.email", read_only=True)
    reporter_email = serializers.EmailField(source="reporter.email", read_only=True)
    subtasks = SubtaskSerializer(many=True, read_only=True)
    label_items = LabelSerializer(source="labels", many=True, read_only=True)

    class Meta:
        model = Task
        fields = [
            "id",
            "project",
            "identifier",
            "task_number",
            "epic",
            "milestone",
            "title",
            "description",
            "type",
            "status",
            "priority",
            "assignee",
            "assignee_email",
            "reporter",
            "reporter_email",
            "labels",
            "label_items",
            "story_points",
            "due_date",
            "order",
            "subtasks",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "identifier", "task_number", "created_at", "updated_at"]

    def create(self, validated_data):
        # Set reporter to request user if not explicitly passed
        request = self.context.get("request")
        if request and request.user and "reporter" not in validated_data:
            validated_data["reporter"] = request.user
        return super().create(validated_data)


class TaskReorderSerializer(serializers.Serializer):
    """
    Payload for smooth drag-and-drop Kanban updates.
    """
    id = serializers.UUIDField()
    status = serializers.ChoiceField(choices=Task.TaskStatus.choices)
    order = serializers.FloatField()


class ProjectSerializer(serializers.ModelSerializer):
    task_count = serializers.IntegerField(read_only=True, default=0)
    owner_email = serializers.EmailField(source="owner.email", read_only=True)

    class Meta:
        model = Project
        fields = [
            "id",
            "workspace",
            "name",
            "key",
            "description",
            "owner",
            "owner_email",
            "status",
            "target_date",
            "task_count",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]

    def create(self, validated_data):
        request = self.context.get("request")
        if request and request.user and "owner" not in validated_data:
            validated_data["owner"] = request.user
        return super().create(validated_data)

from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    ProjectViewSet,
    TaskViewSet,
    MilestoneViewSet,
    EpicViewSet,
    LabelViewSet,
    SubtaskViewSet,
)

router = DefaultRouter()
router.register("projects", ProjectViewSet, basename="project")
router.register("tasks", TaskViewSet, basename="task")
router.register("milestones", MilestoneViewSet, basename="milestone")
router.register("epics", EpicViewSet, basename="epic")
router.register("labels", LabelViewSet, basename="label")
router.register("subtasks", SubtaskViewSet, basename="subtask")

urlpatterns = [
    path("", include(router.urls)),
]

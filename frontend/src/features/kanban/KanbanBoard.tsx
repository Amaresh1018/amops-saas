"use client"

import React, { useState } from "react"
import { TaskItem, TaskStatus, KANBAN_COLUMNS } from "./types"
import { KanbanColumn } from "./KanbanColumn"
import { NewTaskModal } from "./NewTaskModal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Plus,
  Search,
  ChevronDown,
  LayoutGrid,
} from "lucide-react"

const INITIAL_TASKS: TaskItem[] = [
  {
    id: "1",
    identifier: "AMP-101",
    task_number: 101,
    title: "PostgreSQL schema-based tenant routing",
    description: "Verify tenant schema middleware isolation and domain resolution.",
    status: "DONE",
    priority: "URGENT",
    type: "STORY",
    story_points: 8,
    due_date: "2026-10-15",
    order: 1.0,
    assignee_email: "lead@nexus.dev",
    created_at: "2026-10-09T08:00:00Z",
  },
  {
    id: "2",
    identifier: "AMP-102",
    task_number: 102,
    title: "OpenAPI 3 contract generator & typed client",
    description: "Export DRF spectacular schema and automate frontend TS sync via openapi-ts.",
    status: "DONE",
    priority: "HIGH",
    type: "TASK",
    story_points: 5,
    due_date: "2026-10-16",
    order: 2.0,
    assignee_email: "dev@nexus.dev",
    created_at: "2026-10-09T08:00:00Z",
  },
  {
    id: "3",
    identifier: "AMP-103",
    task_number: 103,
    title: "Interactive Drag-and-Drop Kanban Board",
    description: "Build responsive Kanban board with shadcn/ui primitives and NDLS design tokens.",
    status: "IN_PROGRESS",
    priority: "HIGH",
    type: "STORY",
    story_points: 5,
    due_date: "2026-10-18",
    order: 1.0,
    assignee_email: "ui@nexus.dev",
    created_at: "2026-10-09T08:00:00Z",
  },
  {
    id: "4",
    identifier: "AMP-104",
    task_number: 104,
    title: "Real-time board synchronization via WebSockets",
    description: "Connect Django Channels consumer to broadcast live card drag events.",
    status: "TODO",
    priority: "MEDIUM",
    type: "TASK",
    story_points: 3,
    due_date: "2026-10-20",
    order: 1.0,
    assignee_email: "ws@nexus.dev",
    created_at: "2026-10-09T08:00:00Z",
  },
  {
    id: "5",
    identifier: "AMP-105",
    task_number: 105,
    title: "Celery async task assignment notifications",
    description: "Dispatch in-app alerts and email dispatches when assignees change.",
    status: "BACKLOG",
    priority: "LOW",
    type: "TASK",
    story_points: 2,
    due_date: "2026-10-25",
    order: 1.0,
    created_at: "2026-10-09T08:00:00Z",
  },
]

export const KanbanBoard: React.FC = () => {
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPriority, setSelectedPriority] = useState<string>("ALL")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalDefaultStatus, setModalDefaultStatus] = useState<TaskStatus>("TODO")

  const handleDropTask = async (taskId: string, targetStatus: TaskStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: targetStatus } : task
      )
    )

    try {
      await fetch("http://127.0.0.1:8000/api/v1/tasks/reorder/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([{ id: taskId, status: targetStatus, order: Date.now() / 1000 }]),
      }).catch(() => {})
    } catch {}
  }

  const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
    handleDropTask(taskId, newStatus)
  }

  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId))
  }

  const handleCreateTask = (
    data: Omit<TaskItem, "id" | "identifier" | "task_number" | "created_at" | "order">
  ) => {
    const nextNumber = tasks.length + 101
    const newTask: TaskItem = {
      ...data,
      id: `task-${Date.now()}`,
      identifier: `AMP-${nextNumber}`,
      task_number: nextNumber,
      order: Date.now() / 1000,
      created_at: "2026-10-09T08:00:00Z",
    }
    setTasks((prev) => [...prev, newTask])
  }

  const handleNewTaskInColumn = (status: TaskStatus) => {
    setModalDefaultStatus(status)
    setIsModalOpen(true)
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.identifier.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesPriority =
      selectedPriority === "ALL" || task.priority === selectedPriority

    return matchesSearch && matchesPriority
  })

  const totalTasks = tasks.length
  const completedTasks = tasks.filter((t) => t.status === "DONE").length
  const inProgressTasks = tasks.filter((t) => t.status === "IN_PROGRESS").length
  const completionPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  return (
    <div className="flex flex-col h-full w-full bg-background">
      {/* Board Controls Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-3 border-b border-border/70 bg-card/30 backdrop-blur-xl">
        {/* Left: Sprint Identity & Velocity Bar */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-secondary text-foreground border border-border flex items-center justify-center font-bold text-xs">
              <LayoutGrid className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xs font-semibold text-foreground tracking-tight">
                  Sprint 1 · Core Platform
                </h2>
                <span className="font-mono text-[9px] px-1.5 py-0.2 rounded bg-muted text-muted-foreground border border-border font-semibold">
                  NEX
                </span>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-3 pl-4 border-l border-border/60 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
              <span className="text-[11px]">{inProgressTasks} In Progress</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-[11px]">{completedTasks} Done</span>
            </div>

            {/* Velocity progress indicator */}
            <div className="flex items-center gap-2 ml-1">
              <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300 rounded-full"
                  style={{ width: `${completionPercent}%` }}
                />
              </div>
              <span className="font-mono text-[10px] text-muted-foreground font-medium">
                {completionPercent}%
              </span>
            </div>
          </div>
        </div>

        {/* Right: Search, Filter, Action */}
        <div className="flex items-center gap-2">
          <div className="relative w-40 sm:w-56">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search issues..."
              className="pl-8 pr-12 h-8 text-xs bg-muted/30 border-border/70 focus-visible:ring-1"
            />
            <kbd className="absolute right-2 top-2 pointer-events-none text-[9px] font-mono text-muted-foreground/60 px-1 py-0.5 rounded bg-muted border border-border/50">
              /
            </kbd>
          </div>

          <div className="relative">
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="h-8 pl-2.5 pr-6 rounded-lg border border-border/70 bg-muted/30 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring appearance-none cursor-pointer"
            >
              <option value="ALL">All Priorities</option>
              <option value="URGENT">Urgent</option>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>
            <ChevronDown className="absolute right-2 top-2.5 h-3 w-3 text-muted-foreground pointer-events-none opacity-60" />
          </div>

          <Button
            size="sm"
            onClick={() => {
              setModalDefaultStatus("TODO")
              setIsModalOpen(true)
            }}
            className="h-8 px-2.5 text-xs gap-1.5 shadow-sm bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>New Issue</span>
          </Button>
        </div>
      </div>

      {/* Horizontal Kanban Columns Canvas */}
      <div className="flex-1 overflow-x-auto p-5 bg-background">
        <div className="flex gap-3.5 items-start min-h-[550px] pb-6">
          {KANBAN_COLUMNS.map((column) => {
            const columnTasks = filteredTasks.filter((t) => t.status === column.id)
            return (
              <KanbanColumn
                key={column.id}
                column={column}
                tasks={columnTasks}
                onDropTask={handleDropTask}
                onDeleteTask={handleDeleteTask}
                onStatusChange={handleStatusChange}
                onNewTaskClick={handleNewTaskInColumn}
              />
            )
          })}
        </div>
      </div>

      {/* New Task Creation Modal */}
      <NewTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultStatus={modalDefaultStatus}
        onCreateTask={handleCreateTask}
      />
    </div>
  )
}

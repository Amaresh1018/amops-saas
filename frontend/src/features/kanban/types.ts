export type TaskStatus =
  | "BACKLOG"
  | "TODO"
  | "IN_PROGRESS"
  | "IN_REVIEW"
  | "DONE"
  | "CANCELLED"

export type TaskPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT"

export interface TaskItem {
  id: string
  identifier: string
  task_number: number
  title: string
  description?: string
  status: TaskStatus
  priority: TaskPriority
  type: "TASK" | "BUG" | "STORY"
  story_points?: number | null
  due_date?: string | null
  order: number
  assignee_email?: string | null
  labels?: string[]
  created_at: string
}

export interface ColumnDefinition {
  id: TaskStatus
  title: string
  color: string
}

export const KANBAN_COLUMNS: ColumnDefinition[] = [
  { id: "BACKLOG", title: "Backlog", color: "#64748B" },
  { id: "TODO", title: "To Do", color: "#60A5FA" },
  { id: "IN_PROGRESS", title: "In Progress", color: "#3B66F5" },
  { id: "IN_REVIEW", title: "In Review", color: "#F59E0B" },
  { id: "DONE", title: "Done", color: "#10B981" },
]

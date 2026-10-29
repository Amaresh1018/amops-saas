"use client"

import React, { useState } from "react"
import { ColumnDefinition, TaskItem, TaskStatus } from "./types"
import { TaskCard } from "./TaskCard"
import { Button } from "@/components/ui/button"
import {
  Plus,
  Circle,
  Clock,
  CheckCircle2,
  CircleDot,
} from "lucide-react"

interface KanbanColumnProps {
  column: ColumnDefinition
  tasks: TaskItem[]
  onDropTask: (taskId: string, targetStatus: TaskStatus) => void
  onDeleteTask?: (id: string) => void
  onStatusChange?: (id: string, newStatus: TaskStatus) => void
  onNewTaskClick?: (status: TaskStatus) => void
}

function ColumnStatusIcon({ status }: { status: TaskStatus }) {
  switch (status) {
    case "BACKLOG":
      return <Circle className="h-3 w-3 stroke-[2.5] stroke-dashed text-slate-400" />
    case "TODO":
      return <Circle className="h-3 w-3 stroke-[2.5] text-sky-500" />
    case "IN_PROGRESS":
      return <CircleDot className="h-3 w-3 text-[#5E6AD2]" />
    case "IN_REVIEW":
      return <Clock className="h-3 w-3 text-amber-500" />
    case "DONE":
      return <CheckCircle2 className="h-3 w-3 text-emerald-500" />
    default:
      return <Circle className="h-3 w-3 text-muted-foreground" />
  }
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({
  column,
  tasks,
  onDropTask,
  onDeleteTask,
  onStatusChange,
  onNewTaskClick,
}) => {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
    if (!isDragOver) setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    if (e.currentTarget.contains(e.relatedTarget as Node)) return
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    try {
      const data = JSON.parse(e.dataTransfer.getData("text/plain"))
      if (data.taskId) {
        onDropTask(data.taskId, column.id)
      }
    } catch (err) {
      console.error("Failed to parse dropped task payload", err)
    }
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`flex flex-col flex-1 min-w-[285px] max-w-[340px] rounded-2xl bg-muted/20 dark:bg-card/25 border transition-all duration-150 select-none ${
        isDragOver
          ? "border-primary/80 bg-primary/[0.04] shadow-[0_0_20px_rgba(94,106,210,0.15)] ring-1 ring-primary/50"
          : "border-border/60 hover:border-border/80"
      }`}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between px-3.5 py-3 border-b border-border/40">
        <div className="flex items-center gap-2">
          <ColumnStatusIcon status={column.id} />
          <h3 className="font-semibold text-xs tracking-tight text-foreground">
            {column.title}
          </h3>
          <span className="flex items-center justify-center min-w-[18px] h-4.5 px-1.5 text-[10px] font-mono font-medium rounded-full bg-muted/80 text-muted-foreground border border-border/40">
            {tasks.length}
          </span>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => onNewTaskClick?.(column.id)}
          className="h-6 w-6 text-muted-foreground hover:text-foreground hover:bg-muted/70 rounded-md transition-colors"
          title={`Add task to ${column.title}`}
        >
          <Plus className="h-3.5 w-3.5" />
        </Button>
      </div>

      {/* Cards List */}
      <div className="flex-1 flex flex-col gap-2 p-2.5 overflow-y-auto min-h-[440px]">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={onDeleteTask}
            onStatusChange={onStatusChange}
          />
        ))}

        {tasks.length === 0 && (
          <div className="flex flex-col items-center justify-center flex-1 py-10 border border-dashed border-border/50 rounded-xl text-center text-xs text-muted-foreground/60 gap-1.5 my-2">
            <Plus className="h-3.5 w-3.5 opacity-40 text-muted-foreground" />
            <span className="text-[11px]">Drop task here</span>
          </div>
        )}
      </div>
    </div>
  )
}

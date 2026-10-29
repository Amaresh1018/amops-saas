"use client"

import React from "react"
import { TaskItem, TaskPriority } from "./types"
import { Card } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import {
  MoreHorizontal,
  Calendar,
  Layers,
  CheckCircle2,
  ArrowRight,
  Trash2,
  AlertTriangle,
} from "lucide-react"

interface TaskCardProps {
  task: TaskItem
  onDelete?: (id: string) => void
  onStatusChange?: (id: string, newStatus: TaskItem["status"]) => void
  onDragStart?: (e: React.DragEvent, task: TaskItem) => void
}

function PrioritySignal({ priority }: { priority: TaskPriority }) {
  if (priority === "URGENT") {
    return (
      <div className="flex items-center gap-1 text-rose-500 bg-rose-500/10 border border-rose-500/20 px-1.5 py-0.5 rounded text-[10px] font-medium" title="Urgent priority">
        <AlertTriangle className="h-3 w-3" />
        <span>Urgent</span>
      </div>
    )
  }
  if (priority === "HIGH") {
    return (
      <div className="flex items-center gap-1.5 text-amber-500 px-1.5 py-0.5 rounded text-[10px] font-medium bg-amber-500/10 border border-amber-500/20" title="High priority">
        <span className="flex items-end gap-[2px] h-2.5">
          <span className="w-[3px] h-1.5 bg-amber-500 rounded-xs" />
          <span className="w-[3px] h-2 bg-amber-500 rounded-xs" />
          <span className="w-[3px] h-2.5 bg-amber-500 rounded-xs" />
        </span>
        <span>High</span>
      </div>
    )
  }
  if (priority === "MEDIUM") {
    return (
      <div className="flex items-center gap-1.5 text-sky-500 px-1.5 py-0.5 rounded text-[10px] font-medium bg-sky-500/10 border border-sky-500/20" title="Medium priority">
        <span className="flex items-end gap-[2px] h-2.5">
          <span className="w-[3px] h-1.5 bg-sky-500 rounded-xs" />
          <span className="w-[3px] h-2 bg-sky-500 rounded-xs" />
          <span className="w-[3px] h-2.5 bg-muted-foreground/30 rounded-xs" />
        </span>
        <span>Med</span>
      </div>
    )
  }
  return (
    <div className="flex items-center gap-1.5 text-slate-400 px-1.5 py-0.5 rounded text-[10px] font-medium bg-muted/60 border border-border/50" title="Low priority">
      <span className="flex items-end gap-[2px] h-2.5">
        <span className="w-[3px] h-1.5 bg-slate-400 rounded-xs" />
        <span className="w-[3px] h-2 bg-muted-foreground/30 rounded-xs" />
        <span className="w-[3px] h-2.5 bg-muted-foreground/30 rounded-xs" />
      </span>
      <span>Low</span>
    </div>
  )
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onDelete,
  onStatusChange,
  onDragStart,
}) => {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify({ taskId: task.id, fromStatus: task.status })
    )
    e.dataTransfer.effectAllowed = "move"
    if (onDragStart) {
      onDragStart(e, task)
    }
  }

  return (
    <Card
      draggable
      onDragStart={handleDragStart}
      className="group relative cursor-grab active:cursor-grabbing rounded-xl border border-border/80 bg-card p-3 shadow-xs hover:border-border hover:shadow-md hover:bg-card/95 transition-all duration-150"
    >
      {/* Header: Key & Priority & Actions */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
            {task.identifier}
          </span>
          <PrioritySignal priority={task.priority} />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 opacity-0 group-hover:opacity-100 focus:opacity-100 hover:bg-accent text-muted-foreground transition-opacity rounded-md"
            >
              <MoreHorizontal className="h-3.5 w-3.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" sideOffset={6} className="w-40">
            <DropdownMenuItem onClick={() => onStatusChange?.(task.id, "TODO")}>
              <ArrowRight className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
              Move to To Do
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onStatusChange?.(task.id, "IN_PROGRESS")}>
              <ArrowRight className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
              Move to In Progress
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onStatusChange?.(task.id, "DONE")}>
              <CheckCircle2 className="h-3.5 w-3.5 mr-2 text-emerald-500" />
              Move to Done
            </DropdownMenuItem>
            {onDelete && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => onDelete(task.id)}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="h-3.5 w-3.5 mr-2 text-destructive" />
                  Delete Task
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Task Title */}
      <h4 className="text-xs font-medium text-foreground leading-snug line-clamp-2 mb-1.5">
        {task.title}
      </h4>

      {/* Description Snippet */}
      {task.description && (
        <p className="text-[11px] text-muted-foreground line-clamp-2 mb-2.5 leading-relaxed">
          {task.description}
        </p>
      )}

      {/* Metadata Row */}
      <div className="flex items-center justify-between pt-2 border-t border-border/40 text-[11px] text-muted-foreground">
        <div className="flex items-center gap-2.5">
          {task.story_points != null && (
            <span className="flex items-center gap-1 font-mono text-[10px]">
              <Layers className="h-3 w-3 opacity-60" />
              {task.story_points}
            </span>
          )}
          {task.due_date && (
            <span className="flex items-center gap-1 text-[10px]">
              <Calendar className="h-3 w-3 opacity-60" />
              {task.due_date}
            </span>
          )}
        </div>

        {task.assignee_email ? (
          <div
            title={task.assignee_email}
            className="h-5 w-5 rounded-full bg-secondary border border-border flex items-center justify-center font-bold text-[9px] uppercase tracking-tighter text-foreground"
          >
            {task.assignee_email.slice(0, 2)}
          </div>
        ) : (
          <div className="h-4.5 w-4.5 rounded-full border border-dashed border-border/60 flex items-center justify-center text-[9px] text-muted-foreground/60">
            -
          </div>
        )}
      </div>
    </Card>
  )
}

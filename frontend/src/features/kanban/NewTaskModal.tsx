"use client"

import React, { useState } from "react"
import { TaskItem, TaskPriority, TaskStatus, KANBAN_COLUMNS } from "./types"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus } from "lucide-react"

interface NewTaskModalProps {
  isOpen: boolean
  onClose: () => void
  defaultStatus?: TaskStatus
  onCreateTask: (task: Omit<TaskItem, "id" | "identifier" | "task_number" | "created_at" | "order">) => void
}

export const NewTaskModal: React.FC<NewTaskModalProps> = ({
  isOpen,
  onClose,
  defaultStatus = "TODO",
  onCreateTask,
}) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState<TaskStatus>(defaultStatus)
  const [priority, setPriority] = useState<TaskPriority>("MEDIUM")
  const [storyPoints, setStoryPoints] = useState<number | undefined>(3)
  const [dueDate, setDueDate] = useState<string>("")

  const [prevIsOpen, setPrevIsOpen] = useState(isOpen)
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen)
    if (isOpen) {
      setStatus(defaultStatus)
      setTitle("")
      setDescription("")
      setPriority("MEDIUM")
      setStoryPoints(3)
      setDueDate("")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    onCreateTask({
      title: title.trim(),
      description: description.trim() || undefined,
      status,
      priority,
      type: "TASK",
      story_points: storyPoints || null,
      due_date: dueDate || null,
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base font-bold text-foreground">
            <Plus className="h-4 w-4 text-primary" />
            Create New Task
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1 block">
              Title <span className="text-destructive">*</span>
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Implement OAuth login with Google"
              required
              autoFocus
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1 block">
              Description
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add key context, acceptance criteria, or technical details..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
                className="w-full h-10 px-3 rounded-md border border-input bg-background/50 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {KANBAN_COLUMNS.map((col) => (
                  <option key={col.id} value={col.id}>
                    {col.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className="w-full h-10 px-3 rounded-md border border-input bg-background/50 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="URGENT">Urgent</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">
                Story Points
              </label>
              <Input
                type="number"
                min={1}
                max={21}
                value={storyPoints ?? ""}
                onChange={(e) =>
                  setStoryPoints(e.target.value ? parseInt(e.target.value) : undefined)
                }
                placeholder="e.g. 5"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">
                Due Date
              </label>
              <Input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter className="pt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Create Task</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

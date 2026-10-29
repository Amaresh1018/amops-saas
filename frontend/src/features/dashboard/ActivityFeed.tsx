"use client"

import React from "react"
import {
  Activity,
  GitPullRequest,
  CheckCircle2,
  Clock,
  PlusCircle,
} from "lucide-react"
import { ActivityEvent } from "./types"

const ACTIVITIES: ActivityEvent[] = [
  {
    id: "act-1",
    type: "status_change",
    actor: { name: "Alex Thorne", initials: "AT" },
    action: "moved to Done",
    target: {
      identifier: "AMP-101",
      title: "PostgreSQL schema-based tenant routing",
    },
    timestamp: "18m ago",
    meta: "Verification tests passed",
  },
  {
    id: "act-2",
    type: "pr_merge",
    actor: { name: "Sarah Chen", initials: "SC" },
    action: "merged pull request #42",
    target: {
      identifier: "AMP-102",
      title: "OpenAPI 3 contract generator & typed client",
    },
    timestamp: "1h ago",
    meta: "CI pipeline passed in 2m 14s",
  },
  {
    id: "act-3",
    type: "status_change",
    actor: { name: "Devon Reed", initials: "DR" },
    action: "moved to In Progress",
    target: {
      identifier: "AMP-103",
      title: "Interactive Drag-and-Drop Kanban Board",
    },
    timestamp: "2h ago",
  },
  {
    id: "act-4",
    type: "task_created",
    actor: { name: "Marcus Vance", initials: "MV" },
    action: "created issue",
    target: {
      identifier: "AMP-106",
      title: "Redis pub/sub channel layer cluster config",
    },
    timestamp: "3h ago",
  },
  {
    id: "act-5",
    type: "milestone",
    actor: { name: "System", initials: "SYS" },
    action: "sprint milestone reached",
    target: {
      identifier: "MILE-01",
      title: "Sprint 1 — Core Platform Engine (68% complete)",
    },
    timestamp: "5h ago",
  },
]

export function ActivityFeed() {
  const getEventIcon = (type: ActivityEvent["type"]) => {
    switch (type) {
      case "pr_merge":
        return <GitPullRequest className="h-3 w-3 text-purple-400" />
      case "status_change":
        return <CheckCircle2 className="h-3 w-3 text-emerald-400" />
      case "task_created":
        return <PlusCircle className="h-3 w-3 text-primary" />
      case "milestone":
        return <Activity className="h-3 w-3 text-amber-400" />
      default:
        return <Clock className="h-3 w-3 text-muted-foreground" />
    }
  }

  return (
    <div className="flex flex-col h-full rounded-xl border border-border/70 bg-card/60 p-5 backdrop-blur-xl shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-border/50">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
            <Activity className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-xs font-semibold text-foreground tracking-tight">
              Live Activity Pulse
            </h3>
            <p className="text-[11px] text-muted-foreground">
              Real-time engineering audit stream
            </p>
          </div>
        </div>

        <span className="flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          LIVE
        </span>
      </div>

      {/* Stream Items */}
      <div className="divide-y divide-border/40 flex-1 flex flex-col justify-around py-1">
        {ACTIVITIES.map((act) => (
          <div
            key={act.id}
            className="py-2.5 flex items-start gap-3 hover:bg-accent/20 px-2 rounded-lg transition-colors group"
          >
            {/* Event Type Icon Indicator */}
            <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-md bg-secondary border border-border/80 shrink-0 shadow-2xs">
              {getEventIcon(act.type)}
            </div>

            {/* Event Description */}
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-2">
                <p className="text-xs text-foreground truncate">
                  <span className="font-semibold text-foreground">
                    {act.actor.name}
                  </span>{" "}
                  <span className="text-muted-foreground">{act.action}</span>
                </p>
                <span className="text-[10px] font-mono text-muted-foreground shrink-0">
                  {act.timestamp}
                </span>
              </div>

              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] font-mono font-semibold text-primary px-1.5 py-0.2 rounded bg-primary/10 shrink-0">
                  {act.target.identifier}
                </span>
                <span className="text-xs text-muted-foreground truncate group-hover:text-foreground transition-colors">
                  {act.target.title}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

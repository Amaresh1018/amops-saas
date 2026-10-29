"use client"

import React from "react"
import { Users } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { TeamMemberWorkload } from "./types"

const TEAM_WORKLOAD: TeamMemberWorkload[] = [
  {
    id: "1",
    name: "Alex Thorne",
    role: "Lead Platform Architect",
    avatar: "",
    initials: "AT",
    assignedTasks: 4,
    storyPoints: 14,
    capacityPoints: 16,
    capacityPercentage: 87.5,
    status: "optimal",
  },
  {
    id: "2",
    name: "Sarah Chen",
    role: "Senior Backend Engineer",
    avatar: "",
    initials: "SC",
    assignedTasks: 5,
    storyPoints: 15,
    capacityPoints: 16,
    capacityPercentage: 93.8,
    status: "approaching_limit",
  },
  {
    id: "3",
    name: "Devon Reed",
    role: "Frontend Specialist",
    avatar: "",
    initials: "DR",
    assignedTasks: 4,
    storyPoints: 11,
    capacityPoints: 14,
    capacityPercentage: 78.6,
    status: "optimal",
  },
  {
    id: "4",
    name: "Marcus Vance",
    role: "DevOps & Cloud Engineer",
    avatar: "",
    initials: "MV",
    assignedTasks: 2,
    storyPoints: 8,
    capacityPoints: 10,
    capacityPercentage: 80.0,
    status: "optimal",
  },
]

export function WorkloadDistribution() {
  return (
    <div className="flex flex-col h-full rounded-xl border border-border/70 bg-card/60 p-5 backdrop-blur-xl shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-border/50">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
            <Users className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-xs font-semibold text-foreground tracking-tight">
              Team Workload &amp; Capacity
            </h3>
            <p className="text-[11px] text-muted-foreground">
              4 Active Engineers &bull; 48 Story Points Total
            </p>
          </div>
        </div>

        <span className="text-[11px] font-mono text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-medium">
          Balanced (85% Avg)
        </span>
      </div>

      {/* Team Member Rows */}
      <div className="divide-y divide-border/40 flex-1 flex flex-col justify-around py-1">
        {TEAM_WORKLOAD.map((member) => {
          const isHigh = member.capacityPercentage >= 90
          return (
            <div
              key={member.id}
              className="py-2.5 flex items-center justify-between gap-3 group hover:bg-accent/20 px-2 rounded-lg transition-colors"
            >
              {/* Member Avatar & Identity */}
              <div className="flex items-center gap-2.5 min-w-0">
                <Avatar className="h-7 w-7 shrink-0 shadow-2xs">
                  <AvatarFallback className="bg-secondary text-foreground text-[10px] font-bold">
                    {member.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-medium text-foreground truncate">
                      {member.name}
                    </span>
                    {isHigh && (
                      <span className="text-[10px] text-amber-400 font-mono" title="High allocation">
                        &bull; Near Limit
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-muted-foreground truncate block">
                    {member.role}
                  </span>
                </div>
              </div>

              {/* Workload Progress & Story Points */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="w-24 hidden sm:block">
                  <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                    <span>{member.capacityPercentage}%</span>
                    <span className="font-mono">
                      {member.storyPoints}/{member.capacityPoints} pts
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-secondary/80 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isHigh
                          ? "bg-amber-400"
                          : "bg-gradient-to-r from-primary to-indigo-500"
                      }`}
                      style={{ width: `${member.capacityPercentage}%` }}
                    />
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-mono font-semibold text-foreground">
                    {member.assignedTasks}
                  </span>
                  <span className="text-[10px] text-muted-foreground ml-1">tasks</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

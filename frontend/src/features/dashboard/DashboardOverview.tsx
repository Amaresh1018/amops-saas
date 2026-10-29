"use client"

import React from "react"
import { StatCards } from "./StatCards"
import { BurndownChart } from "./BurndownChart"
import { WorkloadDistribution } from "./WorkloadDistribution"
import { ActivityFeed } from "./ActivityFeed"
import { Button } from "@/components/ui/button"
import {
  Sparkles,
  Kanban,
  Plus,
  Server,
  Database,
  Cpu,
  Layers,
} from "lucide-react"

interface DashboardOverviewProps {
  onSwitchToKanban?: () => void
}

export function DashboardOverview({ onSwitchToKanban }: DashboardOverviewProps) {
  return (
    <div className="flex-1 overflow-y-auto px-6 py-6 max-w-7xl w-full mx-auto space-y-6">
      {/* Executive Command Center Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium">
            <Sparkles className="h-3 w-3" />
            <span>Sprint 1 &bull; Active Sprint Cadence</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-sans">
            Executive Command Center
          </h1>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Real-time multi-tenant engineering velocity, capacity allocation, and system pulse.
          </p>
        </div>

        {/* Quick Action Tools */}
        <div className="flex items-center gap-2.5 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={onSwitchToKanban}
            className="h-8 gap-1.5 text-xs font-medium border-border/80 hover:bg-accent"
          >
            <Kanban className="h-3.5 w-3.5 text-primary" />
            <span>Open Kanban Board</span>
          </Button>

          <Button
            size="sm"
            className="h-8 gap-1.5 text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 shadow-xs"
            onClick={onSwitchToKanban}
          >
            <Plus className="h-3.5 w-3.5" />
            <span>New Task</span>
          </Button>
        </div>
      </div>

      {/* 1. High-Impact KPI Stat Cards */}
      <StatCards />

      {/* 2. Visual Burndown & Team Capacity Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7">
          <BurndownChart />
        </div>
        <div className="lg:col-span-5">
          <WorkloadDistribution />
        </div>
      </div>

      {/* 3. Real-Time Activity Stream & Core Engine Health */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Core Infrastructure & Engines Status */}
        <div className="lg:col-span-7 flex flex-col rounded-xl border border-border/70 bg-card/60 p-5 backdrop-blur-xl shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-border/50">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Cpu className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-foreground tracking-tight">
                  Core Platform Services &amp; Subsystem Health
                </h3>
                <p className="text-[11px] text-muted-foreground">
                  Engine isolation, PostgreSQL tenancy, and API layer
                </p>
              </div>
            </div>

            <span className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-medium">
              100% Operational
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 flex-1">
            <div className="p-3.5 rounded-lg bg-secondary/30 border border-border/50 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <Database className="h-4 w-4 text-primary" />
                <span className="text-[10px] font-mono text-emerald-400 font-semibold">Active</span>
              </div>
              <div className="mt-3">
                <h4 className="text-xs font-semibold text-foreground">PostgreSQL Multi-Tenancy</h4>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Schema isolation active (<code className="font-mono text-primary">demo</code> &amp; <code className="font-mono text-primary">public</code>)
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-secondary/30 border border-border/50 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <Server className="h-4 w-4 text-emerald-400" />
                <span className="text-[10px] font-mono text-emerald-400 font-semibold">Port 8000</span>
              </div>
              <div className="mt-3">
                <h4 className="text-xs font-semibold text-foreground">Django REST Engine</h4>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  DRF ViewSets, drf-spectacular OpenAPI 3.0 spec
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-secondary/30 border border-border/50 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <Layers className="h-4 w-4 text-indigo-400" />
                <span className="text-[10px] font-mono text-emerald-400 font-semibold">Turbopack</span>
              </div>
              <div className="mt-3">
                <h4 className="text-xs font-semibold text-foreground">Next.js 16 WebOS</h4>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  React 19, shadcn/ui suite, Universal NUDL theme
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Activity Feed */}
        <div className="lg:col-span-5">
          <ActivityFeed />
        </div>
      </div>
    </div>
  )
}

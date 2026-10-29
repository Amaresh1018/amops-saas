"use client"

import React from "react"
import {
  TrendingUp,
  CheckCircle2,
  ArrowUpRight,
  ShieldCheck,
  Zap,
} from "lucide-react"

export function StatCards() {
  const cards = [
    {
      title: "Sprint 1 Velocity",
      value: "42",
      unit: "pts",
      trend: {
        value: "+18.4%",
        isPositive: true,
        label: "vs last sprint",
      },
      icon: TrendingUp,
      accentColor: "from-primary/20 to-primary/5 text-primary",
      borderColor: "border-primary/25",
      subtext: "Target: 48 story points (87.5% on-track)",
      progress: 87.5,
    },
    {
      title: "Sprint Completion",
      value: "68%",
      unit: "",
      trend: {
        value: "+12%",
        isPositive: true,
        label: "past 48 hrs",
      },
      icon: CheckCircle2,
      accentColor: "from-emerald-500/20 to-emerald-500/5 text-emerald-400",
      borderColor: "border-emerald-500/25",
      subtext: "14 Done · 5 In Review · 3 In Progress",
      progress: 68,
    },
    {
      title: "Active Team Capacity",
      value: "84%",
      unit: "util",
      trend: {
        value: "Optimal",
        isPositive: true,
        label: "load balanced",
      },
      icon: Zap,
      accentColor: "from-indigo-500/20 to-indigo-500/5 text-indigo-400",
      borderColor: "border-indigo-500/25",
      subtext: "32/38 dev-hours committed this week",
      progress: 84,
    },
    {
      title: "Critical Blockers",
      value: "0",
      unit: "open",
      trend: {
        value: "-2",
        isPositive: true,
        label: "resolved today",
      },
      icon: ShieldCheck,
      accentColor: "from-emerald-500/20 to-emerald-500/5 text-emerald-400",
      borderColor: "border-emerald-500/20",
      subtext: "Zero CI pipeline or staging failures",
      progress: 100,
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon
        return (
          <div
            key={idx}
            className={`group relative overflow-hidden rounded-xl border ${card.borderColor} bg-card/60 p-4.5 backdrop-blur-xl shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/40`}
          >
            {/* Ambient Radial Hover Flare */}
            <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-primary/10 blur-2xl transition-all duration-500 group-hover:bg-primary/20 group-hover:scale-125" />

            <div className="relative flex flex-col justify-between h-full space-y-3.5">
              {/* Header: Title + Icon Badge */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground tracking-wide">
                  {card.title}
                </span>
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${card.accentColor} shadow-xs`}
                >
                  <Icon className="h-4 w-4" />
                </div>
              </div>

              {/* Metric Value & Trend Badge */}
              <div className="flex items-baseline justify-between">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-bold tracking-tight text-foreground font-sans">
                    {card.value}
                  </span>
                  {card.unit && (
                    <span className="text-xs font-mono font-medium text-muted-foreground">
                      {card.unit}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  <ArrowUpRight className="h-3 w-3" />
                  <span>{card.trend.value}</span>
                </div>
              </div>

              {/* Progress Bar & Subtext */}
              <div className="space-y-1.5 pt-1">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary/80">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-indigo-500 transition-all duration-500"
                    style={{ width: `${card.progress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-muted-foreground/80">
                  <span className="truncate">{card.subtext}</span>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

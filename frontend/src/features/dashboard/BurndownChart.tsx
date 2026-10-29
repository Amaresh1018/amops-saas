"use client"

import React, { useState } from "react"
import { TrendingDown } from "lucide-react"

interface DataPoint {
  day: string
  date: string
  ideal: number
  actual: number
  completedToday?: number
}

const BURNDOWN_DATA: DataPoint[] = [
  { day: "Day 1", date: "Oct 02", ideal: 48, actual: 48, completedToday: 0 },
  { day: "Day 3", date: "Oct 04", ideal: 42, actual: 44, completedToday: 4 },
  { day: "Day 5", date: "Oct 06", ideal: 36, actual: 35, completedToday: 9 },
  { day: "Day 7", date: "Oct 08", ideal: 30, actual: 27, completedToday: 8 },
  { day: "Day 9", date: "Oct 10", ideal: 24, actual: 21, completedToday: 6 },
  { day: "Day 11", date: "Oct 12", ideal: 18, actual: 15, completedToday: 6 },
  { day: "Day 14", date: "Oct 15", ideal: 0, actual: 15, completedToday: 0 },
]

export function BurndownChart() {
  const [activePoint, setActivePoint] = useState<DataPoint | null>(BURNDOWN_DATA[5])

  // Coordinate mapping for SVG viewbox (Width 500, Height 200, padding 30)
  const width = 500
  const height = 180
  const padX = 35
  const padY = 25
  const maxPts = 48

  const pointsCount = BURNDOWN_DATA.length

  const getX = (idx: number) => {
    return padX + (idx / (pointsCount - 1)) * (width - 2 * padX)
  }

  const getY = (val: number) => {
    return height - padY - (val / maxPts) * (height - 2 * padY)
  }

  // Generate SVG path for actual points up to current day (Day 11, index 5)
  const actualSlice = BURNDOWN_DATA.slice(0, 6)
  const actualPath = actualSlice
    .map((pt, idx) => `${idx === 0 ? "M" : "L"} ${getX(idx)} ${getY(pt.actual)}`)
    .join(" ")

  const actualArea = `${actualPath} L ${getX(5)} ${height - padY} L ${getX(0)} ${height - padY} Z`

  // Ideal path (Day 1 to Day 14)
  const idealPath = `M ${getX(0)} ${getY(BURNDOWN_DATA[0].ideal)} L ${getX(pointsCount - 1)} ${getY(BURNDOWN_DATA[pointsCount - 1].ideal)}`

  return (
    <div className="flex flex-col h-full rounded-xl border border-border/70 bg-card/60 p-5 backdrop-blur-xl shadow-xs">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border/50">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <TrendingDown className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-xs font-semibold text-foreground tracking-tight">
              Sprint 1 Burndown Velocity
            </h3>
            <p className="text-[11px] text-muted-foreground">
              Oct 02 &ndash; Oct 15 &bull; 48 Story Points Total
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <span className="h-2 w-3 rounded-xs border-b-2 border-dashed border-muted-foreground/60" />
            <span className="text-[11px]">Ideal Guideline</span>
          </div>
          <div className="flex items-center gap-1.5 text-primary font-medium">
            <span className="h-2 w-3 rounded-xs bg-primary" />
            <span className="text-[11px]">Actual Burn</span>
          </div>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative flex-1 pt-4 pb-2">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-44 overflow-visible"
        >
          <defs>
            <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.28" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Horizontal Grid lines */}
          {[0, 12, 24, 36, 48].map((val) => (
            <g key={val}>
              <line
                x1={padX}
                y1={getY(val)}
                x2={width - padX}
                y2={getY(val)}
                stroke="currentColor"
                strokeOpacity="0.08"
                strokeWidth="1"
              />
              <text
                x={padX - 8}
                y={getY(val) + 3}
                textAnchor="end"
                className="text-[9px] fill-muted-foreground/60 font-mono"
              >
                {val}p
              </text>
            </g>
          ))}

          {/* Ideal Guideline Path (Dashed) */}
          <path
            d={idealPath}
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.3"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          {/* Actual Gradient Fill Area */}
          <path d={actualArea} fill="url(#actualGradient)" />

          {/* Actual Trajectory Line */}
          <path
            d={actualPath}
            fill="none"
            stroke="var(--primary)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Interactive Data Nodes */}
          {actualSlice.map((pt, idx) => {
            const cx = getX(idx)
            const cy = getY(pt.actual)
            const isHovered = activePoint?.day === pt.day

            return (
              <g
                key={pt.day}
                className="cursor-pointer group"
                onClick={() => setActivePoint(pt)}
                onMouseEnter={() => setActivePoint(pt)}
              >
                {/* Outer Glow Halo */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={isHovered ? 8 : 5}
                  className={`transition-all duration-200 ${
                    isHovered
                      ? "fill-primary/20 stroke-primary stroke-2"
                      : "fill-background stroke-primary stroke-2 group-hover:scale-125"
                  }`}
                />
                <circle
                  cx={cx}
                  cy={cy}
                  r={isHovered ? 3.5 : 2.5}
                  className="fill-primary"
                />

                {/* X Axis Label */}
                <text
                  x={cx}
                  y={height - 6}
                  textAnchor="middle"
                  className={`text-[9px] font-mono transition-colors ${
                    isHovered
                      ? "fill-primary font-bold"
                      : "fill-muted-foreground/60"
                  }`}
                >
                  {pt.date}
                </text>
              </g>
            )
          })}
        </svg>

        {/* Selected Point Insight Banner */}
        {activePoint && (
          <div className="mt-3 flex items-center justify-between rounded-lg bg-secondary/40 border border-border/50 px-3 py-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground">
                {activePoint.day} ({activePoint.date}):
              </span>
              <span className="text-primary font-mono font-medium">
                {activePoint.actual} pts remaining
              </span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground text-[11px]">
              <span>Ideal: {activePoint.ideal} pts</span>
              <span className="text-emerald-500 font-medium">
                {activePoint.actual < activePoint.ideal
                  ? `+${activePoint.ideal - activePoint.actual} pts ahead of schedule`
                  : "On target"}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

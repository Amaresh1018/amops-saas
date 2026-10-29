export interface MetricCardData {
  title: string
  value: string | number
  unit?: string
  trend?: {
    value: string
    isPositive: boolean
    label: string
  }
  progress?: {
    current: number
    total: number
    label: string
  }
  iconName: string
  badgeText?: string
  badgeVariant?: "default" | "success" | "warning" | "destructive" | "accent"
}

export interface BurndownDataPoint {
  day: string
  idealPoints: number
  actualPoints: number
  date: string
}

export interface TeamMemberWorkload {
  id: string
  name: string
  role: string
  avatar: string
  initials: string
  assignedTasks: number
  storyPoints: number
  capacityPoints: number
  capacityPercentage: number
  status: "optimal" | "approaching_limit" | "overallocated"
}

export interface ActivityEvent {
  id: string
  type: "status_change" | "pr_merge" | "task_created" | "milestone" | "comment"
  actor: {
    name: string
    avatar?: string
    initials: string
  }
  action: string
  target: {
    identifier: string
    title: string
  }
  timestamp: string
  meta?: string
}

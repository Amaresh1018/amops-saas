"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { KanbanBoard } from "@/features/kanban/KanbanBoard";
import { DashboardOverview } from "@/features/dashboard/DashboardOverview";
import { LandingPage } from "@/features/landing/LandingPage";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Terminal,
  Sparkles,
  Kanban,
  FileText,
  MessageSquare,
  ArrowLeft,
  ExternalLink,
  LayoutDashboard,
  ChevronRight,
  PanelLeftClose,
  PanelLeft,
  ChevronDown,
  Globe,
} from "lucide-react";

function subscribeToPopState(callback: () => void) {
  window.addEventListener("popstate", callback);
  return () => window.removeEventListener("popstate", callback);
}

function getClientWorkspacePreference(): boolean {
  if (typeof window === "undefined") return false;
  const params = new URLSearchParams(window.location.search);
  return params.get("view") === "app" || params.get("view") === "workspace";
}

export default function AmopsHome() {
  const isWorkspaceUrl = React.useSyncExternalStore(
    subscribeToPopState,
    getClientWorkspacePreference,
    () => false
  );
  const viewMode = isWorkspaceUrl ? "workspace" : "landing";

  const [activeTab, setActiveTab] = useState<"kanban" | "overview">("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLaunchApp = () => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("view", "app");
      window.history.pushState({}, "", url.toString());
      window.dispatchEvent(new PopStateEvent("popstate"));
      window.scrollTo(0, 0);
    }
  };

  const handleReturnToLanding = () => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("view");
      window.history.pushState({}, "", url.toString());
      window.dispatchEvent(new PopStateEvent("popstate"));
      window.scrollTo(0, 0);
    }
  };

  // If viewMode is landing, render the public-facing product marketing site
  if (viewMode === "landing") {
    return <LandingPage onEnterApp={handleLaunchApp} />;
  }

  // Otherwise, render the active DevOS Workspace
  return (
    <div className="min-h-screen bg-background text-foreground flex overflow-hidden selection:bg-primary/20 selection:text-primary">
      {/* Sidebar Rail (Linear / Raycast Style) */}
      <aside
        className={`flex flex-col border-r border-border bg-card/60 backdrop-blur-xl transition-all duration-300 z-30 shrink-0 ${
          isSidebarOpen ? "w-60" : "w-16"
        }`}
      >
        {/* Workspace Brand / Tenant Header */}
        <div
          className={`h-13 border-b border-border/60 flex items-center ${
            isSidebarOpen ? "justify-between px-3" : "justify-center px-2"
          }`}
        >
          {isSidebarOpen ? (
            <>
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-indigo-600 text-white font-bold flex items-center justify-center text-xs shadow-xs shrink-0">
                  N
                </div>
                <div className="flex items-center gap-1.5 overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
                  <span className="font-semibold text-xs tracking-tight text-foreground truncate">
                    Acme DevOS
                  </span>
                  <ChevronDown className="h-3 w-3 text-muted-foreground shrink-0 opacity-60" />
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(false)}
                className="h-7 w-7 text-muted-foreground hover:text-foreground hidden sm:flex shrink-0"
                title="Collapse sidebar"
              >
                <PanelLeftClose className="h-3.5 w-3.5" />
              </Button>
            </>
          ) : (
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-indigo-600 text-white font-bold flex items-center justify-center text-xs shadow-xs hover:ring-2 hover:ring-primary/40 transition-all group relative cursor-pointer"
              title="Expand sidebar"
            >
              <span className="group-hover:hidden">a</span>
              <PanelLeft className="h-4 w-4 hidden group-hover:block" />
            </button>
          )}
        </div>

        {/* Navigation Engines */}
        <div className="flex-1 py-3 px-2 flex flex-col gap-0.5 overflow-y-auto">
          {/* Quick Return to Landing / Marketing Page */}
          <button
            onClick={handleReturnToLanding}
            className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all mb-2 border border-border/50 ${
              !isSidebarOpen ? "justify-center" : ""
            }`}
            title="Return to Product Landing Page"
          >
            <Globe className="h-3.5 w-3.5 shrink-0 text-primary" />
            {isSidebarOpen && <span className="truncate">Product Overview</span>}
          </button>

          {isSidebarOpen && (
            <span className="text-[10px] font-mono font-medium uppercase tracking-wider text-muted-foreground/60 px-2 py-1">
              Engines
            </span>
          )}

          <button
            onClick={() => setActiveTab("overview")}
            className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              !isSidebarOpen ? "justify-center" : ""
            }`}
            style={{
              backgroundColor: activeTab === "overview" ? "var(--accent)" : undefined,
            }}
            title="Dashboard"
          >
            <LayoutDashboard className={`h-3.5 w-3.5 shrink-0 ${activeTab === "overview" ? "text-primary" : ""}`} />
            {isSidebarOpen && <span className="truncate font-semibold">Dashboard</span>}
          </button>

          <button
            onClick={() => setActiveTab("kanban")}
            className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              !isSidebarOpen ? "justify-center" : ""
            }`}
            style={{
              backgroundColor: activeTab === "kanban" ? "var(--accent)" : undefined,
            }}
            title="Kanban Board"
          >
            <Kanban className={`h-3.5 w-3.5 shrink-0 ${activeTab === "kanban" ? "text-primary" : ""}`} />
            {isSidebarOpen && <span className="truncate font-semibold">Kanban Board</span>}
          </button>

          <Separator className="my-2 bg-border/40" />

          {isSidebarOpen && (
            <span className="text-[10px] font-mono font-medium uppercase tracking-wider text-muted-foreground/60 px-2 py-1">
              Roadmap
            </span>
          )}

          {[
            { icon: FileText, label: "Wiki & Docs", badge: "Ph 2" },
            { icon: MessageSquare, label: "Realtime Chat", badge: "Ph 3" },
            { icon: Sparkles, label: "AI Assistants", badge: "Ph 5" },
            { icon: Terminal, label: "CI / Git Pipelines", badge: "Ph 6" },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`flex items-center ${
                isSidebarOpen ? "justify-between px-2.5" : "justify-center px-1"
              } py-1.5 rounded-lg text-xs text-muted-foreground/50 hover:text-muted-foreground hover:bg-accent/20 cursor-not-allowed group transition-colors`}
              title={`${item.label} (${item.badge})`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <item.icon className="h-3.5 w-3.5 shrink-0 opacity-50" />
                {isSidebarOpen && <span className="truncate">{item.label}</span>}
              </div>
              {isSidebarOpen && (
                <span className="font-mono text-[9px] px-1 py-0.2 rounded bg-muted/60 text-muted-foreground/70 shrink-0">
                  {item.badge}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Sidebar Footer Status */}
        <div className={`p-3 border-t border-border/60 flex items-center ${isSidebarOpen ? "justify-between" : "justify-center"}`}>
          <div className="flex items-center gap-2 overflow-hidden">
            <span
              className="w-2 h-2 rounded-full shrink-0 bg-primary"
              title="Product preview — sample data"
            />
            {isSidebarOpen && (
              <span className="text-[11px] font-mono text-muted-foreground truncate">
                Sample data
              </span>
            )}
          </div>

          {isSidebarOpen && (
            <a
              href="http://127.0.0.1:8000/api/docs/swagger/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground p-1 rounded hover:bg-accent transition-colors"
              title="Open Swagger API"
            >
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>
      </aside>

      {/* Main Workspace Frame */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Header Bar */}
        <header className="h-13 border-b border-border/70 bg-card/25 backdrop-blur-xl px-6 flex items-center justify-between shrink-0 z-20">
          {/* Breadcrumb Path */}
          <div className="flex items-center gap-1.5 text-xs">
            {!isSidebarOpen && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(true)}
                className="h-7 w-7 text-muted-foreground hover:text-foreground mr-1 shrink-0"
                title="Expand sidebar"
              >
                <PanelLeft className="h-4 w-4" />
              </Button>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={handleReturnToLanding}
              className="h-7 px-2 mr-2 text-xs text-muted-foreground hover:text-foreground gap-1 border border-border/50"
              title="Return to Product Landing Page"
            >
              <ArrowLeft className="h-3 w-3 text-primary" />
              <span className="hidden sm:inline">Landing</span>
            </Button>

            <span className="text-muted-foreground font-medium">Acme Corp</span>
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/40" />
            <span className="text-muted-foreground font-medium">Projects</span>
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/40" />
            <span className="font-semibold text-foreground">
              {activeTab === "kanban" ? "Sprint 1 Board" : "Executive Dashboard"}
            </span>
          </div>

          {/* Right Action Tools & Theme Mode Toggle */}
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" size="sm" className="h-7 px-2 gap-1.5 text-xs text-muted-foreground hover:text-foreground">
              <a href="http://127.0.0.1:8000/api/docs/swagger/" target="_blank" rel="noopener noreferrer">
                <span>Swagger</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </Button>

            <Separator orientation="vertical" className="h-3.5 bg-border/60" />

            {/* Theme Mode Toggle */}
            <ThemeToggle />

            {/* User Avatar */}
            <Avatar className="h-6.5 w-6.5 shrink-0 ring-1 ring-border/60">
              <AvatarFallback className="bg-secondary text-foreground font-bold text-[10px]">
                AD
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* View Surface Canvas */}
        <main className="flex-1 overflow-hidden flex flex-col min-w-0">
          <div className="border-b border-border bg-secondary px-4 py-2 text-xs text-muted-foreground" role="note">Product preview · Sample data · Changes are not saved to a server</div>
          {activeTab === "kanban" ? (
            <div className="flex-1 overflow-hidden flex flex-col">
              <KanbanBoard />
            </div>
          ) : (
            <DashboardOverview onSwitchToKanban={() => setActiveTab("kanban")} />
          )}
        </main>
      </div>
    </div>
  );
}

import { useMemo, useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  ChevronDown,
  CircleHelp,
  Command,
  GitBranch,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Settings2,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { navigationSections, pageNavigation } from "@/lib/codemind-navigation";
import { cn } from "@/lib/utils";

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" aria-label="CodeMind X command center" className="flex min-w-0 items-center gap-3">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-md border border-brand/30 bg-brand/10 text-brand">
        <Command className="size-[18px]" strokeWidth={1.8} />
      </span>
      {!compact && (
        <span className="min-w-0">
          <span className="block truncate text-[15px] font-semibold leading-5 text-foreground">
            CodeMind <span className="text-brand">X</span>
          </span>
          <span className="mt-0.5 block text-[10px] font-medium uppercase leading-3 text-muted-foreground">
            Software intelligence
          </span>
        </span>
      )}
    </Link>
  );
}

function SidebarNavigation({
  currentPath,
  collapsed,
  onNavigate,
}: {
  currentPath: string;
  collapsed: boolean;
  onNavigate?: () => void;
}) {
  return (
    <nav aria-label="Workspace navigation" className="flex-1 space-y-5 overflow-y-auto px-3 py-5">
      {navigationSections.map((section) => (
        <div key={section.label} className="space-y-1">
          {!collapsed && (
            <h2 className="px-3 pb-1 text-[10px] font-semibold uppercase leading-4 text-muted-foreground">
              {section.label}
            </h2>
          )}
          {section.items.map((item) => {
            const Icon = item.icon;
            const active = currentPath === item.to;
            return (
              <Tooltip key={item.id}>
                <TooltipTrigger asChild>
                  <Link
                    to={item.to}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    aria-label={collapsed ? item.label : undefined}
                    className={cn(
                      "group flex min-h-10 items-center gap-3 rounded-md px-3 text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      active
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent/70 hover:text-sidebar-foreground",
                      collapsed && "justify-center px-0",
                    )}
                  >
                    <Icon
                      className={cn(
                        "size-[17px] shrink-0",
                        active ? "text-sidebar-primary" : "text-muted-foreground group-hover:text-foreground",
                      )}
                      strokeWidth={1.8}
                    />
                    {!collapsed && <span className="truncate">{item.label}</span>}
                    {active && !collapsed && (
                      <span className="ml-auto size-1.5 rounded-full bg-brand" aria-hidden="true" />
                    )}
                  </Link>
                </TooltipTrigger>
                {collapsed && <TooltipContent side="right">{item.label}</TooltipContent>}
              </Tooltip>
            );
          })}
        </div>
      ))}
    </nav>
  );
}

function SidebarPanel({
  collapsed,
  currentPath,
  onNavigate,
}: {
  collapsed: boolean;
  currentPath: string;
  onNavigate?: () => void;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col bg-sidebar">
      <div className={cn("flex h-[72px] shrink-0 items-center border-b border-sidebar-border px-4", collapsed && "justify-center px-0")}>
        <Brand compact={collapsed} />
      </div>
      <SidebarNavigation currentPath={currentPath} collapsed={collapsed} onNavigate={onNavigate} />
      {!collapsed && (
        <div className="border-t border-sidebar-border px-4 py-4">
          <div className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-sm border border-border bg-panel text-muted-foreground">
              <GitBranch className="size-4" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-xs font-medium text-foreground">No repository</span>
              <span className="mt-0.5 block text-[11px] text-muted-foreground">Connect to begin</span>
            </span>
            <span className="size-2 rounded-full bg-warning/80" aria-label="Disconnected" />
          </div>
        </div>
      )}
    </div>
  );
}

function PageSearchDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return pageNavigation;
    return pageNavigation.filter((item) => item.label.toLowerCase().includes(normalizedQuery));
  }, [query]);

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        onOpenChange(nextOpen);
        if (!nextOpen) setQuery("");
      }}
    >
      <DialogContent className="top-[20%] max-w-xl translate-y-0 border-border bg-panel p-0 shadow-2xl">
        <DialogHeader className="sr-only">
          <DialogTitle>Search CodeMind X</DialogTitle>
          <DialogDescription>Find a workspace page.</DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-3 border-b border-border px-4 pr-12">
          <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          <Input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search pages..."
            aria-label="Search workspace pages"
            className="h-12 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
          />
          <kbd className="hidden shrink-0 rounded-sm border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline">
            ESC
          </kbd>
        </div>
        <div className="max-h-[min(26rem,60vh)] overflow-y-auto p-2">
          <p className="px-2 pb-2 pt-1 text-[10px] font-semibold uppercase text-muted-foreground">
            Workspace pages
          </p>
          {results.length > 0 ? (
            results.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.id}
                  to={item.to}
                  onClick={() => onOpenChange(false)}
                  className="flex min-h-10 items-center gap-3 rounded-sm px-2.5 text-sm text-foreground/85 hover:bg-accent hover:text-foreground focus-visible:bg-accent focus-visible:outline-none"
                >
                  <Icon className="size-4 text-muted-foreground" />
                  <span>{item.label}</span>
                  <span className="ml-auto text-[11px] text-muted-foreground">Open</span>
                </Link>
              );
            })
          ) : (
            <p className="px-2.5 py-8 text-center text-sm text-muted-foreground">
              No pages match “{query}”.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function TopBar({ onSearch }: { onSearch: () => void }) {
  const [helpOpen, setHelpOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 flex h-[68px] items-center justify-between gap-3 border-b border-border bg-background/95 px-4 backdrop-blur-sm sm:px-6 lg:px-8">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="h-9 max-w-[12rem] justify-start gap-2 border-border bg-panel px-2.5 sm:max-w-[15rem]">
            <GitBranch className="size-4 shrink-0 text-muted-foreground" />
            <span className="truncate text-xs font-medium sm:text-sm">No repository selected</span>
            <ChevronDown className="ml-auto size-3.5 shrink-0 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-64">
          <DropdownMenuLabel>Current repository</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem disabled>No repository is connected</DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/settings" className="cursor-pointer">
              <Settings2 className="size-4" />
              Review connection status
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex shrink-0 items-center gap-1 sm:gap-2">
        <Button
          variant="outline"
          size="sm"
          aria-label="Search workspace pages"
          onClick={onSearch}
          className="h-9 w-9 border-border bg-panel px-0 sm:w-[12rem] sm:justify-between sm:px-2.5"
        >
          <span className="flex items-center gap-2 text-muted-foreground">
            <Search className="size-4" />
            <span className="hidden text-xs font-normal sm:inline">Search pages...</span>
          </span>
          <kbd className="hidden rounded-sm border border-border px-1 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline">
            ⌘ K
          </kbd>
        </Button>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Notifications" className="size-9 text-muted-foreground">
              <Bell className="size-[17px]" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-72 border-border bg-panel p-4">
            <p className="text-sm font-semibold text-foreground">Notifications</p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              There are no notifications. Repository activity will appear here after a connection is configured.
            </p>
          </PopoverContent>
        </Popover>

        <Button
          variant="ghost"
          size="icon"
          aria-label="Help and support"
          onClick={() => setHelpOpen(true)}
          className="hidden size-9 text-muted-foreground sm:inline-flex"
        >
          <CircleHelp className="size-[17px]" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Workspace menu" className="size-9">
              <span className="flex size-7 items-center justify-center rounded-sm border border-border bg-panel text-xs font-semibold text-brand">
                C
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Workspace preview</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/settings" className="cursor-pointer">
                <Settings2 className="size-4" />
                Settings
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Dialog open={helpOpen} onOpenChange={setHelpOpen}>
        <DialogContent className="border-border bg-panel">
          <DialogHeader>
            <DialogTitle>CodeMind X help</DialogTitle>
            <DialogDescription>
              Review the connection status in Settings. GitHub, AI services, and repository analysis are not connected in this preview.
            </DialogDescription>
          </DialogHeader>
          <Button asChild variant="outline" className="w-fit">
            <Link to="/settings" onClick={() => setHelpOpen(false)}>
              Open settings
            </Link>
          </Button>
        </DialogContent>
      </Dialog>
    </header>
  );
}

export function WorkspaceShell({ children }: { children: ReactNode }) {
  const currentPath = useRouterState({ select: (state) => state.location.pathname });
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <TooltipProvider delayDuration={400}>
      <div className="min-h-screen bg-background">
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-30 hidden border-r border-sidebar-border transition-[width] duration-200 md:block",
            collapsed ? "w-[var(--workspace-sidebar-collapsed)]" : "w-[var(--workspace-sidebar-expanded)]",
          )}
        >
          <SidebarPanel collapsed={collapsed} currentPath={currentPath} />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCollapsed((value) => !value)}
                aria-label={collapsed ? "Expand navigation" : "Collapse navigation"}
                className="absolute -right-3 top-[82px] size-6 rounded-full border border-border bg-panel text-muted-foreground shadow-sm hover:text-foreground"
              >
                {collapsed ? <PanelLeftOpen className="size-3.5" /> : <PanelLeftClose className="size-3.5" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">{collapsed ? "Expand navigation" : "Collapse navigation"}</TooltipContent>
          </Tooltip>
        </aside>

        <div
          className={cn(
            "min-h-screen transition-[margin] duration-200",
            collapsed ? "md:ml-[var(--workspace-sidebar-collapsed)]" : "md:ml-[var(--workspace-sidebar-expanded)]",
          )}
        >
          <div className="sticky top-0 z-20 flex h-[68px] items-center gap-2 border-b border-border bg-background/95 px-3 backdrop-blur-sm md:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open navigation" className="size-9">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[min(18rem,85vw)] border-sidebar-border bg-sidebar p-0">
                <SheetTitle className="sr-only">CodeMind X navigation</SheetTitle>
                <SidebarPanel
                  collapsed={false}
                  currentPath={currentPath}
                  onNavigate={() => setMobileOpen(false)}
                />
              </SheetContent>
            </Sheet>
            <Brand />
            <Button
              variant="ghost"
              size="icon"
              aria-label="Search workspace pages"
              onClick={() => setSearchOpen(true)}
              className="ml-auto size-9"
            >
              <Search className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Close mobile navigation"
              className="hidden"
              onClick={() => setMobileOpen(false)}
            >
              <X className="size-4" />
            </Button>
          </div>
          <div className="hidden md:block">
            <TopBar onSearch={() => setSearchOpen(true)} />
          </div>
          <main className="min-w-0">{children}</main>
        </div>
        <PageSearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
      </div>
    </TooltipProvider>
  );
}
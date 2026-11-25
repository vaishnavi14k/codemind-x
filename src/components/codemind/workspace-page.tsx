import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Blocks,
  Bot,
  Braces,
  CheckCircle2,
  ChevronDown,
  CircleDashed,
  Clock3,
  Code2,
  Database,
  FileCode2,
  FileText,
  GitBranch,
  GitCommitHorizontal,
  GitPullRequest,
  KeyRound,
  Layers3,
  LockKeyhole,
  Network,
  Search,
  Send,
  Settings2,
  ShieldAlert,
  ShieldCheck,
  TestTube2,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  getPageNavigation,
  pageMetadata,
  type PageId,
} from "@/lib/codemind-navigation";
import type { ChatMessageDraft } from "@/lib/chat-contract";
import { cn } from "@/lib/utils";

function PageHeading({
  page,
  trailing,
  description,
}: {
  page: PageId;
  trailing?: ReactNode;
  description?: string;
}) {
  const item = getPageNavigation(page);
  const Icon = item.icon;

  return (
    <div className="mb-7 flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <p className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase text-muted-foreground">
          <span className="text-brand">CODEMIND X</span>
          <span aria-hidden="true">/</span>
          <span>{item.label}</span>
        </p>
        <h1 className="flex items-center gap-3 text-[26px] font-semibold leading-tight text-foreground sm:text-[30px]">
          <Icon className="hidden size-6 shrink-0 text-brand sm:block" strokeWidth={1.7} />
          {item.label}
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
          {description ?? pageMetadata[page].description}
        </p>
      </div>
      {trailing && <div className="flex shrink-0 items-center gap-2">{trailing}</div>}
    </div>
  );
}

function ConnectLink({ label = "Review connection status" }: { label?: string }) {
  return (
    <Button asChild variant="outline" size="sm" className="h-9 border-border bg-panel">
      <Link to="/settings">
        {label}
        <ArrowUpRight className="size-3.5" />
      </Link>
    </Button>
  );
}

function DisabledAction({
  label,
  reason,
  icon: Icon,
  size = "sm",
}: {
  label: string;
  reason: string;
  icon?: LucideIcon;
  size?: "sm" | "default";
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="inline-flex" tabIndex={0}>
          <Button variant="outline" size={size} disabled className="border-border bg-panel">
            {Icon && <Icon className="size-4" />}
            {label}
          </Button>
        </span>
      </TooltipTrigger>
      <TooltipContent className="max-w-64">{reason}</TooltipContent>
    </Tooltip>
  );
}

function SectionTitle({
  title,
  detail,
  trailing,
}: {
  title: string;
  detail?: string;
  trailing?: ReactNode;
}) {
  return (
    <div className="flex min-h-11 items-start justify-between gap-4 border-b border-border px-4 py-3.5">
      <div className="min-w-0">
        <h2 className="text-[13px] font-semibold text-foreground">{title}</h2>
        {detail && <p className="mt-1 text-xs leading-5 text-muted-foreground">{detail}</p>}
      </div>
      {trailing && <div className="shrink-0">{trailing}</div>}
    </div>
  );
}

function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  compact = false,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
  compact?: boolean;
}) {
  return (
    <div className={cn("flex flex-col items-center px-5 text-center", compact ? "py-8" : "py-12 sm:py-16")}>
      <span className="mb-4 flex size-11 items-center justify-center rounded-md border border-brand/20 bg-brand/10 text-brand">
        <Icon className="size-5" strokeWidth={1.7} />
      </span>
      <h3 className="max-w-xl text-sm font-semibold text-foreground">{title}</h3>
      <p className="mt-2 max-w-md text-xs leading-5 text-muted-foreground">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return <section className={cn("min-w-0 overflow-hidden rounded-md border border-border bg-panel", className)}>{children}</section>;
}

function DataState({
  icon: Icon,
  title,
  value = "—",
}: {
  icon: LucideIcon;
  title: string;
  value?: string;
}) {
  return (
    <div className="flex min-h-[128px] flex-col justify-between rounded-md border border-border bg-panel p-4">
      <div className="flex items-start justify-between gap-3">
        <span className="text-xs font-medium text-muted-foreground">{title}</span>
        <Icon className="size-4 text-muted-foreground/80" strokeWidth={1.7} />
      </div>
      <div>
        <span className="font-mono text-2xl font-medium text-foreground/75">{value}</span>
        <p className="mt-1 text-[11px] text-muted-foreground">Waiting for repository data</p>
      </div>
    </div>
  );
}

function CommandCenterPage() {
  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 pb-10 pt-7 sm:px-6 lg:px-8">
      <PageHeading page="command-center" description="Your repository intelligence, in one place." />

      <section className="relative mb-5 overflow-hidden rounded-md border border-brand/25 bg-panel">
        <div className="panel-grid pointer-events-none absolute inset-0 opacity-35" aria-hidden="true" />
        <div className="relative flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex items-start gap-4">
            <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-md border border-brand/25 bg-brand/10 text-brand">
              <GitBranch className="size-5" />
            </span>
            <div className="max-w-2xl">
              <p className="text-[10px] font-semibold uppercase text-brand">Workspace setup</p>
              <h2 className="mt-1 text-base font-semibold text-foreground sm:text-lg">No repository connected</h2>
              <p className="mt-1.5 text-xs leading-5 text-muted-foreground sm:text-sm">
                Connect GitHub and choose a repository before CodeMind can report on code, security, or engineering activity.
              </p>
            </div>
          </div>
          <ConnectLink label="View setup status" />
        </div>
      </section>

      <div className="mb-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <DataState icon={ShieldCheck} title="Security overview" />
        <DataState icon={Layers3} title="Architecture" />
        <DataState icon={Bot} title="Agent activity" />
        <DataState icon={GitPullRequest} title="Change impact" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.8fr)]">
        <Panel>
          <SectionTitle title="Latest findings" detail="Security and quality findings from your most recent scans." />
          <EmptyState
            compact
            icon={ShieldAlert}
            title="Findings will appear after the first repository scan"
            description="No scan results are available in this workspace yet."
            action={<ConnectLink label="Open repository setup" />}
          />
        </Panel>
        <Panel>
          <SectionTitle title="Recent activity" detail="A record of repository and analysis events." />
          <EmptyState
            compact
            icon={Clock3}
            title="No activity to show"
            description="Repository events and completed analyses will be listed here when a source is connected."
          />
        </Panel>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Panel>
          <SectionTitle title="Architecture summary" detail="Module relationships and dependencies." />
          <div className="flex items-center justify-between gap-4 px-4 py-4">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-sm border border-border bg-panel-raised text-blue-accent">
                <Network className="size-4" />
              </span>
              <div>
                <p className="text-xs font-medium text-foreground">Dependency map unavailable</p>
                <p className="mt-1 text-[11px] text-muted-foreground">Waiting for a connected repository</p>
              </div>
            </div>
            <Button asChild variant="ghost" size="sm" className="shrink-0 text-muted-foreground">
              <Link to="/dependencies">
                Explore <ArrowRight className="size-3.5" />
              </Link>
            </Button>
          </div>
        </Panel>
        <Panel>
          <SectionTitle title="Agent activity" detail="Current and recent analysis runs." />
          <div className="flex items-center justify-between gap-4 px-4 py-4">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-sm border border-border bg-panel-raised text-brand">
                <Workflow className="size-4" />
              </span>
              <div>
                <p className="text-xs font-medium text-foreground">No agent runs recorded</p>
                <p className="mt-1 text-[11px] text-muted-foreground">Agent execution is not configured</p>
              </div>
            </div>
            <Button asChild variant="ghost" size="sm" className="shrink-0 text-muted-foreground">
              <Link to="/agents">
                Open agents <ArrowRight className="size-3.5" />
              </Link>
            </Button>
          </div>
        </Panel>
      </div>
    </div>
  );
}

function RepositoriesPage() {
  const reason = "Connect a GitHub repository before choosing a branch.";

  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 pb-10 pt-7 sm:px-6 lg:px-8">
      <PageHeading
        page="repositories"
        trailing={<ConnectLink label="GitHub setup status" />}
      />
      <Panel>
        <SectionTitle
          title="Connected repositories"
          detail="Repository and branch access for this workspace."
          trailing={<Badge variant="outline" className="border-border text-muted-foreground">Not connected</Badge>}
        />
        <div className="flex flex-col gap-3 border-b border-border px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input disabled aria-label="Filter repositories" placeholder="Filter repositories" className="pl-9" />
          </div>
          <div className="flex items-center gap-2">
            <DisabledAction label="Select branch" reason={reason} icon={GitBranch} />
            <DisabledAction label="Scan repository" reason={reason} icon={Activity} />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px] border-collapse text-left">
            <thead>
              <tr className="border-b border-border text-[10px] font-semibold uppercase text-muted-foreground">
                <th className="px-4 py-3">Repository</th>
                <th className="px-4 py-3">Default branch</th>
                <th className="px-4 py-3">Latest scan</th>
                <th className="px-4 py-3">Connection</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={4} className="p-0">
                  <EmptyState
                    compact
                    icon={GitBranch}
                    title="No repositories connected"
                    description="Repository details, branches, and scans will appear here after GitHub is configured."
                    action={<ConnectLink label="Review GitHub setup" />}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Panel>
      <p className="mt-3 text-[11px] leading-5 text-muted-foreground">
        GitHub access is not configured in this preview. No repository information has been loaded.
      </p>
    </div>
  );
}

function CodeChatPage() {
  const [draft, setDraft] = useState<ChatMessageDraft>({ role: "user", content: "" });
  const suggestions = [
    { label: "Explain a code pattern", prompt: "Explain this code pattern and its trade-offs." },
    { label: "Trace a bug", prompt: "Help me trace a bug across related modules." },
    { label: "Review a change", prompt: "Review this proposed change for risks and missing tests." },
  ];

  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 pb-8 pt-6 sm:px-6 lg:px-8">
      <PageHeading
        page="code-chat"
        description="One ongoing conversation for repository-aware questions."
        trailing={
          <Badge variant="outline" className="border-warning/30 bg-warning/10 text-warning">
            <CircleDashed className="mr-1.5 size-3.5" />
            AI not configured
          </Badge>
        }
      />

      <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_18rem]">
        <Panel className="flex min-h-[34rem] min-w-0 flex-col">
          <div className="flex min-h-[68px] items-center gap-3 border-b border-border px-4 py-3 sm:px-5">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-sm border border-brand/20 bg-brand/10 text-brand">
              <Braces className="size-4" />
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="truncate text-sm font-semibold text-foreground">Code conversation</h2>
              <p className="mt-1 truncate text-[11px] text-muted-foreground">
                Single thread · account history after database setup
              </p>
            </div>
            <Badge variant="outline" className="hidden shrink-0 border-border text-muted-foreground sm:inline-flex">
              One conversation
            </Badge>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center px-4 py-8 text-center sm:px-8">
            <span className="mb-4 flex size-12 items-center justify-center rounded-md border border-brand/20 bg-brand/10 text-brand">
              <Code2 className="size-5" strokeWidth={1.7} />
            </span>
            <p className="text-[10px] font-semibold uppercase text-brand">Conversation ready</p>
            <h2 className="mt-2 text-lg font-semibold text-foreground">No messages yet</h2>
            <p className="mt-2 max-w-lg text-xs leading-5 text-muted-foreground">
              Connect an AI service and a repository to start. No answers or code citations are generated in this preview.
            </p>

            <div className="mt-6 grid w-full max-w-2xl gap-2 sm:grid-cols-3">
              {suggestions.map((suggestion, index) => {
                const Icon = index === 0 ? FileCode2 : index === 1 ? Search : GitPullRequest;
                return (
                  <Button
                    key={suggestion.label}
                    type="button"
                    variant="outline"
                    onClick={() => setDraft({ role: "user", content: suggestion.prompt })}
                    className="h-auto min-h-[64px] justify-start gap-2.5 whitespace-normal border-border bg-background px-3 py-2.5 text-left text-xs leading-5 hover:border-brand/35 hover:bg-accent"
                  >
                    <Icon className="size-4 shrink-0 text-muted-foreground" />
                    <span>{suggestion.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>

          <div className="border-t border-border p-3 sm:p-4">
            <div className="rounded-sm border border-input bg-background p-2 focus-within:ring-2 focus-within:ring-ring">
              <Textarea
                aria-label="Message draft"
                value={draft.content}
                onChange={(event) => setDraft({ ...draft, content: event.target.value })}
                placeholder="Ask a question about your code..."
                className="max-h-40 min-h-[76px] resize-y border-0 bg-transparent px-2 py-1 text-sm shadow-none focus-visible:ring-0"
              />
              <div className="flex flex-wrap items-center justify-between gap-3 px-2 pb-1 pt-2">
                <p className="text-[10px] leading-4 text-muted-foreground">
                  Draft only · messages are not sent or saved here
                </p>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span tabIndex={0}>
                      <Button type="button" size="sm" disabled className="h-8">
                        <Send className="size-3.5" />
                        Send
                      </Button>
                    </span>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-64">
                    Connect an AI service and database before sending or saving messages.
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
        </Panel>

        <aside className="space-y-4">
          <Panel>
            <SectionTitle title="Conversation context" detail="Sources available to this thread." />
            <div className="divide-y divide-border px-4">
              {[
                { label: "Repository", value: "Not connected", icon: GitBranch },
                { label: "AI service", value: "Not configured", icon: Braces },
                { label: "History", value: "Database pending", icon: Database },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex min-h-12 items-center gap-3 py-2.5">
                    <Icon className="size-4 shrink-0 text-muted-foreground" />
                    <span className="min-w-0 flex-1 text-xs text-foreground">{item.label}</span>
                    <span className="text-right text-[10px] text-muted-foreground">{item.value}</span>
                  </div>
                );
              })}
            </div>
          </Panel>

          <Panel>
            <SectionTitle title="Saved profile" detail="Account details for private history." />
            <div className="flex items-start gap-3 p-4">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-panel-raised text-muted-foreground">
                <LockKeyhole className="size-4" />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-medium text-foreground">Not signed in</p>
                <p className="mt-1.5 text-[11px] leading-5 text-muted-foreground">
                  Display name, avatar, and preferences are ready to save when account storage is connected.
                </p>
              </div>
            </div>
          </Panel>
        </aside>
      </div>
    </div>
  );
}

function AgentControlPage() {
  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 pb-10 pt-7 sm:px-6 lg:px-8">
      <PageHeading
        page="agent-control"
        trailing={<DisabledAction label="Start analysis" reason="Connect a repository and configure agents before starting analysis." icon={Workflow} />}
      />
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.75fr)]">
        <Panel>
          <SectionTitle title="Execution overview" detail="Task graph and current agent status." />
          <div className="panel-grid flex min-h-[22rem] items-center justify-center">
            <EmptyState
              icon={Workflow}
              title="No agent workflows configured"
              description="Execution graphs will appear after a repository is connected and an analysis is started."
            />
          </div>
        </Panel>
        <div className="space-y-4">
          <Panel>
            <SectionTitle title="Agent roster" detail="Available analysis roles." />
            <div className="divide-y divide-border">
              {[
                { name: "Repository mapper", icon: Network },
                { name: "Security reviewer", icon: ShieldCheck },
                { name: "Test planner", icon: TestTube2 },
              ].map((agent) => {
                const Icon = agent.icon;
                return (
                  <div key={agent.name} className="flex items-center gap-3 px-4 py-3">
                    <span className="flex size-8 items-center justify-center rounded-sm border border-border bg-panel-raised text-muted-foreground">
                      <Icon className="size-4" />
                    </span>
                    <span className="min-w-0 flex-1 truncate text-xs font-medium text-foreground">{agent.name}</span>
                    <span className="text-[10px] text-muted-foreground">Not configured</span>
                  </div>
                );
              })}
            </div>
          </Panel>
          <Panel>
            <SectionTitle title="Execution history" detail="Completed and failed runs." />
            <EmptyState compact icon={Clock3} title="No executions recorded" description="There are no agent runs in this workspace." />
          </Panel>
        </div>
      </div>
      <Panel className="mt-4">
        <SectionTitle title="Findings and evidence" detail="Agent findings with supporting files and confidence." />
        <EmptyState compact icon={FileText} title="No agent findings available" description="Findings and evidence appear when an analysis has completed." />
      </Panel>
    </div>
  );
}

function DependencyExplorerPage() {
  const unavailable = "Connect and scan a repository before filtering dependencies.";
  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 pb-10 pt-7 sm:px-6 lg:px-8">
      <PageHeading
        page="dependency-explorer"
        trailing={
          <>
            <DisabledAction label="Filter" reason={unavailable} icon={Search} />
            <DisabledAction label="Export map" reason={unavailable} icon={ArrowUpRight} />
          </>
        }
      />
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_18rem]">
        <Panel>
          <SectionTitle title="Dependency map" detail="Module and package relationships." />
          <div className="panel-grid relative flex min-h-[25rem] items-center justify-center sm:min-h-[34rem]">
            <EmptyState
              icon={Network}
              title="No dependency map yet"
              description="Connect a repository to build an interactive map of its modules and dependencies."
              action={<ConnectLink label="Review repository setup" />}
            />
          </div>
        </Panel>
        <Panel>
          <SectionTitle title="Selection details" detail="Select a node to inspect its relationships." />
          <EmptyState compact icon={CircleDashed} title="No node selected" description="Dependency details will appear here after a map is available." />
          <div className="border-t border-border px-4 py-3">
            <p className="text-[10px] font-semibold uppercase text-muted-foreground">Map legend</p>
            <div className="mt-3 space-y-2.5">
              {[
                { label: "Application module", color: "bg-brand" },
                { label: "External package", color: "bg-blue-accent" },
                { label: "Entry point", color: "bg-success" },
              ].map((entry) => (
                <div key={entry.label} className="flex items-center gap-2.5 text-xs text-muted-foreground">
                  <span className={cn("size-2 rounded-full", entry.color)} />
                  {entry.label}
                </div>
              ))}
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}

function SecurityPage() {
  const unavailable = "A repository scan is required before security filters can be used.";
  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 pb-10 pt-7 sm:px-6 lg:px-8">
      <PageHeading
        page="security-intelligence"
        trailing={<DisabledAction label="Export findings" reason={unavailable} icon={ArrowUpRight} />}
      />
      <Panel>
        <SectionTitle
          title="Security findings"
          detail="Vulnerabilities, affected files, and remediation guidance."
          trailing={<Badge variant="outline" className="border-border text-muted-foreground">No scan data</Badge>}
        />
        <div className="flex flex-wrap items-center gap-2 border-b border-border px-4 py-3">
          {[
            { label: "All severities", icon: ShieldAlert },
            { label: "Affected files", icon: FileCode2 },
            { label: "Status", icon: ChevronDown },
          ].map((filter) => (
            <DisabledAction key={filter.label} label={filter.label} reason={unavailable} icon={filter.icon} />
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] border-collapse text-left">
            <thead>
              <tr className="border-b border-border text-[10px] font-semibold uppercase text-muted-foreground">
                <th className="px-4 py-3">Severity</th>
                <th className="px-4 py-3">Finding</th>
                <th className="px-4 py-3">Affected file</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={4} className="p-0">
                  <EmptyState
                    compact
                    icon={ShieldCheck}
                    title="No security findings to display"
                    description="Findings will only appear after a real repository scan has completed."
                    action={<ConnectLink label="Review repository setup" />}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Panel>
      <p className="mt-3 text-[11px] text-muted-foreground">No security scan has been run. This view contains no repository findings.</p>
    </div>
  );
}

function ChangeImpactPage() {
  const [changeText, setChangeText] = useState("");
  const hasInput = changeText.trim().length > 0;

  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 pb-10 pt-7 sm:px-6 lg:px-8">
      <PageHeading
        page="change-impact"
        trailing={
          <DisabledAction
            label="Analyze change"
            reason="Connect a repository before analyzing affected modules and tests."
            icon={Activity}
          />
        }
      />
      <div className="grid gap-4 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <Panel>
          <SectionTitle title="Proposed change" detail="Paste a unified diff or describe the change you are considering." />
          <div className="space-y-3 p-4">
            <label htmlFor="change-input" className="text-xs font-medium text-foreground">Code change or description</label>
            <Textarea
              id="change-input"
              value={changeText}
              onChange={(event) => setChangeText(event.target.value)}
              placeholder="Paste a diff or describe the proposed change..."
              className="min-h-56 resize-y border-border bg-background font-mono text-xs leading-5 placeholder:font-sans"
            />
            <div className="flex flex-col gap-3 border-t border-border pt-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-xs text-[11px] leading-5 text-muted-foreground">
                {hasInput ? "Draft stays in this page and is not submitted." : "Your input stays in this page and is not submitted."}
              </p>
              <DisabledAction label="Analyze impact" reason="Connect a repository before analyzing changes." icon={Activity} />
            </div>
          </div>
        </Panel>
        <Panel>
          <SectionTitle title="Impact analysis" detail="Affected modules, dependency paths, and recommended tests." />
          <div className="flex min-h-[22rem] items-center justify-center">
            <EmptyState
              icon={Network}
              title="No impact analysis available"
              description="Impact results require a connected repository and a completed analysis."
            />
          </div>
        </Panel>
      </div>
    </div>
  );
}

function TestArchitectPage() {
  const [view, setView] = useState("Existing tests");
  const sections = ["Existing tests", "Coverage gaps", "Test proposals"];
  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 pb-10 pt-7 sm:px-6 lg:px-8">
      <PageHeading
        page="test-architect"
        trailing={<DisabledAction label="Generate proposal" reason="Connect a repository before creating test proposals." icon={TestTube2} />}
      />
      <div className="mb-4 flex gap-1 overflow-x-auto border-b border-border" role="tablist" aria-label="Test views">
        {sections.map((section) => (
          <Button
            key={section}
            variant="ghost"
            role="tab"
            aria-selected={view === section}
            onClick={() => setView(section)}
            className={cn(
              "relative h-10 shrink-0 rounded-none px-3 text-xs text-muted-foreground hover:text-foreground",
              view === section && "text-foreground after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:bg-brand",
            )}
          >
            {section}
          </Button>
        ))}
      </div>
      <Panel>
        <SectionTitle
          title={view}
          detail={
            view === "Existing tests"
              ? "Test suites and files in the connected repository."
              : view === "Coverage gaps"
                ? "Functions and modules that need additional test coverage."
                : "Reviewable test suggestions based on repository code."
          }
        />
        <EmptyState
          icon={TestTube2}
          title={view === "Existing tests" ? "No test files loaded" : view === "Coverage gaps" ? "No coverage data available" : "No test proposals available"}
          description="Connect and scan a repository to inspect its tests and coverage."
          action={<ConnectLink label="Review repository setup" />}
        />
      </Panel>
    </div>
  );
}

function GitIntelligencePage() {
  const [view, setView] = useState("Commits");
  const views = ["Commits", "Pull requests", "Branches"];
  const viewIcon = view === "Commits" ? GitCommitHorizontal : view === "Pull requests" ? GitPullRequest : GitBranch;
  const ViewIcon = viewIcon;
  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 pb-10 pt-7 sm:px-6 lg:px-8">
      <PageHeading page="git-intelligence" description="Repository commits, pull requests, branches, and changed files." />
      <div className="mb-4 flex gap-1 overflow-x-auto border-b border-border" role="tablist" aria-label="Git intelligence views">
        {views.map((item) => (
          <Button
            key={item}
            variant="ghost"
            role="tab"
            aria-selected={view === item}
            onClick={() => setView(item)}
            className={cn(
              "relative h-10 shrink-0 rounded-none px-3 text-xs text-muted-foreground hover:text-foreground",
              view === item && "text-foreground after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:bg-brand",
            )}
          >
            {item}
          </Button>
        ))}
      </div>
      <Panel>
        <SectionTitle
          title={view}
          detail={view === "Commits" ? "Recent commit history and changed-file summaries." : view === "Pull requests" ? "Review status and changes across pull requests." : "Available branches in the connected repository."}
          trailing={<DisabledAction label="Filter" reason="Connect a GitHub repository before filtering activity." icon={Search} />}
        />
        <div className="grid grid-cols-[minmax(8rem,0.7fr)_minmax(12rem,1.3fr)_minmax(8rem,0.8fr)] border-b border-border px-4 py-3 text-[10px] font-semibold uppercase text-muted-foreground">
          <span>{view === "Commits" ? "Commit" : view === "Pull requests" ? "Pull request" : "Branch"}</span>
          <span>Summary</span>
          <span>Updated</span>
        </div>
        <EmptyState icon={ViewIcon} title={`No ${view.toLowerCase()} to display`} description="Git activity will appear here after a repository is connected." action={<ConnectLink label="Review GitHub setup" />} />
      </Panel>
    </div>
  );
}

function ReportsPage() {
  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 pb-10 pt-7 sm:px-6 lg:px-8">
      <PageHeading
        page="engineering-reports"
        trailing={<DisabledAction label="Export report" reason="There are no completed reports to export." icon={ArrowUpRight} />}
      />
      <Panel>
        <SectionTitle
          title="Report history"
          detail="Completed security, architecture, and engineering analyses."
          trailing={<DisabledAction label="Filter reports" reason="Report filters are available after a report exists." icon={Search} />}
        />
        <div className="grid grid-cols-[minmax(10rem,1fr)_minmax(8rem,0.7fr)_minmax(7rem,0.6fr)] border-b border-border px-4 py-3 text-[10px] font-semibold uppercase text-muted-foreground">
          <span>Report</span>
          <span>Generated</span>
          <span>Format</span>
        </div>
        <EmptyState
          icon={FileText}
          title="No engineering reports yet"
          description="Completed repository analyses can be reviewed and exported from this page."
          action={<ConnectLink label="Review repository setup" />}
        />
      </Panel>
    </div>
  );
}

function SettingsSection({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="grid gap-5 border-b border-border py-6 first:pt-0 last:border-b-0 sm:grid-cols-[minmax(12rem,0.7fr)_minmax(0,1.3fr)]">
      <div>
        <div className="flex items-center gap-2.5">
          <Icon className="size-4 text-brand" />
          <h2 className="text-sm font-semibold text-foreground">{title}</h2>
        </div>
        <p className="mt-1.5 max-w-xs text-xs leading-5 text-muted-foreground">{description}</p>
      </div>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

function ConnectionRow({
  icon: Icon,
  name,
  detail,
  status,
  actionReason,
}: {
  icon: LucideIcon;
  name: string;
  detail: string;
  status: string;
  actionReason: string;
}) {
  return (
    <div className="flex flex-col gap-3 border-b border-border py-4 first:pt-0 last:border-b-0 last:pb-0 sm:flex-row sm:items-center">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-sm border border-border bg-panel-raised text-muted-foreground">
        <Icon className="size-4" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-xs font-semibold text-foreground">{name}</p>
          <Badge variant="outline" className="border-warning/30 bg-warning/10 text-warning">{status}</Badge>
        </div>
        <p className="mt-1 text-[11px] leading-5 text-muted-foreground">{detail}</p>
      </div>
      <DisabledAction label="Connect" reason={actionReason} icon={KeyRound} />
    </div>
  );
}

function SettingsPage() {
  const [emailUpdates, setEmailUpdates] = useState(false);
  const [weeklyDigest, setWeeklyDigest] = useState(false);

  return (
    <div className="mx-auto w-full max-w-[1180px] px-4 pb-10 pt-7 sm:px-6 lg:px-8">
      <PageHeading page="settings" description="Workspace access, connected services, and local preferences." />
      <Panel className="px-4 sm:px-6">
        <SettingsSection
          icon={LockKeyhole}
          title="Profile"
          description="Account identity for this CodeMind X workspace."
        >
          <div className="flex flex-col gap-3 rounded-sm border border-border bg-background p-4 sm:flex-row sm:items-center">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-panel text-sm font-semibold text-muted-foreground">—</span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-foreground">No account signed in</p>
              <p className="mt-1 text-[11px] leading-5 text-muted-foreground">Sign-in is required before chat history can be saved to an individual account.</p>
            </div>
            <Badge variant="outline" className="w-fit border-border text-muted-foreground">Not configured</Badge>
          </div>
        </SettingsSection>

        <SettingsSection
          icon={Blocks}
          title="Connections"
          description="Services that provide repository context and code analysis."
        >
          <ConnectionRow
            icon={GitBranch}
            name="GitHub"
            detail="Repository access, branches, commits, pull requests, and source files."
            status="Not connected"
            actionReason="GitHub connection has not been implemented in this preview."
          />
          <ConnectionRow
            icon={Braces}
            name="AI code analysis"
            detail="Code chat, scan explanations, and repository-aware recommendations."
            status="Not configured"
            actionReason="An AI service is not configured in this preview."
          />
        </SettingsSection>

        <SettingsSection
          icon={Settings2}
          title="Preferences"
          description="These switches update this page only and are not saved."
        >
          <div className="divide-y divide-border rounded-sm border border-border bg-background px-4">
            <label htmlFor="email-updates" className="flex min-h-14 items-center justify-between gap-4 py-3">
              <span>
                <span className="block text-xs font-medium text-foreground">Email notifications</span>
                <span className="mt-1 block text-[11px] text-muted-foreground">Repository and security updates</span>
              </span>
              <Switch id="email-updates" checked={emailUpdates} onCheckedChange={setEmailUpdates} aria-label="Email notifications" />
            </label>
            <label htmlFor="weekly-digest" className="flex min-h-14 items-center justify-between gap-4 py-3">
              <span>
                <span className="block text-xs font-medium text-foreground">Weekly digest</span>
                <span className="mt-1 block text-[11px] text-muted-foreground">A summary of completed analysis</span>
              </span>
              <Switch id="weekly-digest" checked={weeklyDigest} onCheckedChange={setWeeklyDigest} aria-label="Weekly digest" />
            </label>
          </div>
        </SettingsSection>

        <SettingsSection
          icon={Database}
          title="Workspace status"
          description="Current availability of repository intelligence features."
        >
          <div className="divide-y divide-border rounded-sm border border-border bg-background px-4">
            {[
              { label: "Workspace mode", value: "Preview" },
              { label: "Repository indexing", value: "Unavailable" },
              { label: "Chat history", value: "Database setup pending" },
            ].map((row) => (
              <div key={row.label} className="flex min-h-12 items-center justify-between gap-3 py-3">
                <span className="text-xs text-muted-foreground">{row.label}</span>
                <span className="text-xs font-medium text-foreground">{row.value}</span>
              </div>
            ))}
          </div>
        </SettingsSection>
      </Panel>
    </div>
  );
}

export function WorkspacePage({ page }: { page: PageId }) {
  switch (page) {
    case "command-center":
      return <CommandCenterPage />;
    case "repositories":
      return <RepositoriesPage />;
    case "code-chat":
      return <CodeChatPage />;
    case "agent-control":
      return <AgentControlPage />;
    case "dependency-explorer":
      return <DependencyExplorerPage />;
    case "security-intelligence":
      return <SecurityPage />;
    case "change-impact":
      return <ChangeImpactPage />;
    case "test-architect":
      return <TestArchitectPage />;
    case "git-intelligence":
      return <GitIntelligencePage />;
    case "engineering-reports":
      return <ReportsPage />;
    case "settings":
      return <SettingsPage />;
  }
}
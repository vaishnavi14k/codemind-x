import {
  Activity,
  BarChart3,
  Blocks,
  Bot,
  Braces,
  FileCode2,
  GitBranch,
  GitCommitHorizontal,
  GitPullRequest,
  LayoutDashboard,
  Network,
  Settings2,
  ShieldAlert,
  TestTube2,
  type LucideIcon,
} from "lucide-react";

export type PageId =
  | "command-center"
  | "repositories"
  | "code-chat"
  | "agent-control"
  | "dependency-explorer"
  | "security-intelligence"
  | "change-impact"
  | "test-architect"
  | "git-intelligence"
  | "engineering-reports"
  | "settings";

export type PagePath =
  | "/"
  | "/repositories"
  | "/ai-code-chat"
  | "/agents"
  | "/dependencies"
  | "/security"
  | "/change-impact"
  | "/test-architect"
  | "/git-intelligence"
  | "/reports"
  | "/settings";

export type PageNavigationItem = {
  id: PageId;
  label: string;
  to: PagePath;
  icon: LucideIcon;
};

export const pageNavigation: PageNavigationItem[] = [
  { id: "command-center", label: "Command Center", to: "/", icon: LayoutDashboard },
  { id: "repositories", label: "Repositories", to: "/repositories", icon: GitBranch },
  { id: "code-chat", label: "AI Code Chat", to: "/ai-code-chat", icon: Braces },
  { id: "agent-control", label: "Agent Control Center", to: "/agents", icon: Bot },
  {
    id: "dependency-explorer",
    label: "Dependency Explorer",
    to: "/dependencies",
    icon: Network,
  },
  {
    id: "security-intelligence",
    label: "Security Intelligence",
    to: "/security",
    icon: ShieldAlert,
  },
  { id: "change-impact", label: "Change Impact", to: "/change-impact", icon: Activity },
  { id: "test-architect", label: "Test Architect", to: "/test-architect", icon: TestTube2 },
  { id: "git-intelligence", label: "Git Intelligence", to: "/git-intelligence", icon: GitCommitHorizontal },
  {
    id: "engineering-reports",
    label: "Engineering Reports",
    to: "/reports",
    icon: BarChart3,
  },
  { id: "settings", label: "Settings", to: "/settings", icon: Settings2 },
];

export const navigationSections = [
  { label: "Workspace", items: pageNavigation.slice(0, 3) },
  { label: "Analysis", items: pageNavigation.slice(3, 8) },
  { label: "Insights", items: pageNavigation.slice(8, 10) },
  { label: "Workspace setup", items: pageNavigation.slice(10) },
] satisfies { label: string; items: PageNavigationItem[] }[];

export const pageMetadata: Record<PageId, { title: string; description: string }> = {
  "command-center": {
    title: "Command Center",
    description: "A repository-aware overview of analysis, security, architecture, and activity.",
  },
  repositories: {
    title: "Repositories",
    description: "Manage GitHub repository access, branches, and analysis setup.",
  },
  "code-chat": {
    title: "AI Code Chat",
    description: "Ask questions about connected source code with file-level context.",
  },
  "agent-control": {
    title: "Agent Control Center",
    description: "Review agent configuration, execution status, evidence, and findings.",
  },
  "dependency-explorer": {
    title: "Dependency Explorer",
    description: "Explore repository modules and their dependency relationships.",
  },
  "security-intelligence": {
    title: "Security Intelligence",
    description: "Review repository security findings, affected files, and remediation.",
  },
  "change-impact": {
    title: "Change Impact",
    description: "Trace proposed code changes to affected modules and recommended tests.",
  },
  "test-architect": {
    title: "Test Architect",
    description: "Review existing tests, uncovered functions, and proposed test coverage.",
  },
  "git-intelligence": {
    title: "Git Intelligence",
    description: "Review repository commits, pull requests, branches, and changed files.",
  },
  "engineering-reports": {
    title: "Engineering Reports",
    description: "Browse repository analysis reports and export completed results.",
  },
  settings: {
    title: "Settings",
    description: "Review workspace profile, GitHub and AI connection status, and preferences.",
  },
};

export function createPageHead(page: PageId) {
  const metadata = pageMetadata[page];
  const title = `CodeMind X | ${metadata.title}`;

  return {
    meta: [
      { title },
      { name: "description", content: metadata.description },
      { property: "og:title", content: title },
      { property: "og:description", content: metadata.description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  };
}

export const getPageNavigation = (page: PageId) =>
  pageNavigation.find((item) => item.id === page) ?? pageNavigation[0];

export const workspaceTools = [
  { label: "Repository map", icon: Blocks },
  { label: "Source context", icon: FileCode2 },
  { label: "Pull request review", icon: GitPullRequest },
];
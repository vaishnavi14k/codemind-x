import { createFileRoute } from "@tanstack/react-router";
import { WorkspaceRoute } from "@/components/codemind/workspace-route";
import { createPageHead } from "@/lib/codemind-navigation";

export const Route = createFileRoute("/git-intelligence")({
  head: () => createPageHead("git-intelligence"),
  component: GitIntelligenceRoute,
});

function GitIntelligenceRoute() {
  return <WorkspaceRoute page="git-intelligence" />;
}
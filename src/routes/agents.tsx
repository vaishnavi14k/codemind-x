import { createFileRoute } from "@tanstack/react-router";
import { WorkspaceRoute } from "@/components/codemind/workspace-route";
import { createPageHead } from "@/lib/codemind-navigation";

export const Route = createFileRoute("/agents")({
  head: () => createPageHead("agent-control"),
  component: AgentsRoute,
});

function AgentsRoute() {
  return <WorkspaceRoute page="agent-control" />;
}
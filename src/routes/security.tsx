import { createFileRoute } from "@tanstack/react-router";
import { WorkspaceRoute } from "@/components/codemind/workspace-route";
import { createPageHead } from "@/lib/codemind-navigation";

export const Route = createFileRoute("/security")({
  head: () => createPageHead("security-intelligence"),
  component: SecurityRoute,
});

function SecurityRoute() {
  return <WorkspaceRoute page="security-intelligence" />;
}
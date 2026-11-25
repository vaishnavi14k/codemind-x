import { createFileRoute } from "@tanstack/react-router";
import { WorkspaceRoute } from "@/components/codemind/workspace-route";
import { createPageHead } from "@/lib/codemind-navigation";

export const Route = createFileRoute("/")({
  head: () => createPageHead("command-center"),
  component: CommandCenterRoute,
});

function CommandCenterRoute() {
  return <WorkspaceRoute page="command-center" />;
}

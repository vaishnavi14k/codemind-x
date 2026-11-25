import { createFileRoute } from "@tanstack/react-router";
import { WorkspaceRoute } from "@/components/codemind/workspace-route";
import { createPageHead } from "@/lib/codemind-navigation";

export const Route = createFileRoute("/repositories")({
  head: () => createPageHead("repositories"),
  component: RepositoriesRoute,
});

function RepositoriesRoute() {
  return <WorkspaceRoute page="repositories" />;
}
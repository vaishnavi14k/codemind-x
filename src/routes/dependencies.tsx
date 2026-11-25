import { createFileRoute } from "@tanstack/react-router";
import { WorkspaceRoute } from "@/components/codemind/workspace-route";
import { createPageHead } from "@/lib/codemind-navigation";

export const Route = createFileRoute("/dependencies")({
  head: () => createPageHead("dependency-explorer"),
  component: DependenciesRoute,
});

function DependenciesRoute() {
  return <WorkspaceRoute page="dependency-explorer" />;
}
import { createFileRoute } from "@tanstack/react-router";
import { WorkspaceRoute } from "@/components/codemind/workspace-route";
import { createPageHead } from "@/lib/codemind-navigation";

export const Route = createFileRoute("/change-impact")({
  head: () => createPageHead("change-impact"),
  component: ChangeImpactRoute,
});

function ChangeImpactRoute() {
  return <WorkspaceRoute page="change-impact" />;
}
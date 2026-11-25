import { createFileRoute } from "@tanstack/react-router";
import { WorkspaceRoute } from "@/components/codemind/workspace-route";
import { createPageHead } from "@/lib/codemind-navigation";

export const Route = createFileRoute("/reports")({
  head: () => createPageHead("engineering-reports"),
  component: ReportsRoute,
});

function ReportsRoute() {
  return <WorkspaceRoute page="engineering-reports" />;
}
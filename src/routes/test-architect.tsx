import { createFileRoute } from "@tanstack/react-router";
import { WorkspaceRoute } from "@/components/codemind/workspace-route";
import { createPageHead } from "@/lib/codemind-navigation";

export const Route = createFileRoute("/test-architect")({
  head: () => createPageHead("test-architect"),
  component: TestArchitectRoute,
});

function TestArchitectRoute() {
  return <WorkspaceRoute page="test-architect" />;
}
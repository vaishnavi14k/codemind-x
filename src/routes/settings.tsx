import { createFileRoute } from "@tanstack/react-router";
import { WorkspaceRoute } from "@/components/codemind/workspace-route";
import { createPageHead } from "@/lib/codemind-navigation";

export const Route = createFileRoute("/settings")({
  head: () => createPageHead("settings"),
  component: SettingsRoute,
});

function SettingsRoute() {
  return <WorkspaceRoute page="settings" />;
}
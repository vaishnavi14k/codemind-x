import { createFileRoute } from "@tanstack/react-router";
import { WorkspaceRoute } from "@/components/codemind/workspace-route";
import { createPageHead } from "@/lib/codemind-navigation";

export const Route = createFileRoute("/ai-code-chat")({
  head: () => createPageHead("code-chat"),
  component: AiCodeChatRoute,
});

function AiCodeChatRoute() {
  return <WorkspaceRoute page="code-chat" />;
}
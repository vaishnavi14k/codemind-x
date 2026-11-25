import { WorkspacePage } from "@/components/codemind/workspace-page";
import { WorkspaceShell } from "@/components/codemind/workspace-shell";
import type { PageId } from "@/lib/codemind-navigation";

export function WorkspaceRoute({ page }: { page: PageId }) {
  return (
    <WorkspaceShell>
      <WorkspacePage page={page} />
    </WorkspaceShell>
  );
}
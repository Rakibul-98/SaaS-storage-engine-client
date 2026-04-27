import { useMemo } from "react";
import { Folder } from "../../../redux/features/folders/folder.types";

export default function useBreadcrumbTrail(
  folders: Folder[],
  targetId: string | null,
): { id: string; name: string }[] {
  return useMemo(() => {
    if (!targetId || folders.length === 0) return [];

    // Build a lookup map id → folder
    const map = new Map<string, Folder>();
    for (const folder of folders) {
      map.set(folder.id, folder);
    }

    // Walk up the parent chain from targetId to root
    const trail: { id: string; name: string }[] = [];
    let current: Folder | undefined = map.get(targetId);

    while (current) {
      trail.unshift({ id: current.id, name: current.name });
      current = current.parentId ? map.get(current.parentId) : undefined;
    }

    return trail;
  }, [folders, targetId]);
}

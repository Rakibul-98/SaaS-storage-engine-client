/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { ChevronRight, ChevronDown, Folder, FolderOpen } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { FolderTree as FolderTreeType } from "../../../redux/features/folders/folder.types";

interface FolderTreeProps {
  folders: FolderTreeType[];
  level?: number;
  isCollapsed?: boolean;
  /** Set of folder IDs that should be expanded (path to active folder) */
  expandedIds?: Set<string>;
}

function collectAncestorIds(
  folders: FolderTreeType[],
  targetId: string,
  ancestors: Set<string> = new Set()
): boolean {
  for (const folder of folders) {
    if (folder.id === targetId) return true;
    if (folder.children?.length) {
      const found = collectAncestorIds(folder.children, targetId, ancestors);
      if (found) {
        ancestors.add(folder.id);
        return true;
      }
    }
  }
  return false;
}

export default function FolderTree({
  folders,
  level = 0,
  isCollapsed = false,
  expandedIds,
}: FolderTreeProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeFolderId = searchParams.get("folderId");

  // Compute which folders should be auto-expanded (ancestors of active folder)
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>(() => {
    if (!activeFolderId) return {};
    const ancestors = new Set<string>();
    collectAncestorIds(folders, activeFolderId, ancestors);
    // Also open the active folder itself if it has children
    ancestors.add(activeFolderId);
    const initial: Record<string, boolean> = {};
    ancestors.forEach((id) => { initial[id] = true; });
    return initial;
  });

  // Re-compute when activeFolderId changes (e.g. sidebar click on a different folder)
  useEffect(() => {
    if (!activeFolderId) return;
    const ancestors = new Set<string>();
    collectAncestorIds(folders, activeFolderId, ancestors);
    ancestors.add(activeFolderId);
    setOpenFolders((prev) => {
      const next = { ...prev };
      ancestors.forEach((id) => { next[id] = true; });
      return next;
    });
  }, [activeFolderId, folders]);

  const toggleFolder = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenFolders((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleFolderClick = (folderId: string) => {
    router.push(`/dashboard/my-drive?folderId=${folderId}`);
  };

  // ── Collapsed sidebar — icon-only ─────────────────────────────────────────
  if (isCollapsed) {
    return (
      <div className="flex flex-col items-center gap-1 py-2">
        {folders.map((folder) => {
          const isActive = folder.id === activeFolderId;
          return (
            <button
              key={folder.id}
              onClick={() => handleFolderClick(folder.id)}
              className={cn(
                "p-2 rounded-md transition-colors relative group",
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-accent hover:text-accent-foreground"
              )}
              title={folder.name}
            >
              <Folder className="h-4 w-4" />
              {folder.children?.length > 0 && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    );
  }

  // ── Expanded sidebar ──────────────────────────────────────────────────────
  return (
    <div className="space-y-0.5">
      {folders.map((folder) => {
        const hasChildren = folder.children?.length > 0;
        const isOpen = openFolders[folder.id] ?? false;
        const isActive = folder.id === activeFolderId;

        return (
          <div key={folder.id}>
            <div
              onClick={() => handleFolderClick(folder.id)}
              className={cn(
                "flex items-center gap-1 py-1.5 rounded-md cursor-pointer transition-colors group select-none",
                isActive
                  ? "bg-accent text-accent-foreground font-medium"
                  : "hover:bg-accent hover:text-accent-foreground"
              )}
              style={{ paddingLeft: `${level * 12 + 8}px` }}
            >
              {/* Expand/collapse chevron */}
              {hasChildren ? (
                <button
                  onClick={(e) => toggleFolder(folder.id, e)}
                  className="p-0.5 hover:bg-accent-foreground/10 rounded-sm shrink-0"
                >
                  {isOpen ? (
                    <ChevronDown className="h-3 w-3" />
                  ) : (
                    <ChevronRight className="h-3 w-3" />
                  )}
                </button>
              ) : (
                <span className="w-4 shrink-0" />
              )}

              {/* Folder icon — open variant when active or expanded */}
              {isActive || isOpen ? (
                <FolderOpen
                  className={cn(
                    "h-4 w-4 shrink-0",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                />
              ) : (
                <Folder
                  className={cn(
                    "h-4 w-4 shrink-0",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                />
              )}

              {/* Name */}
              <span className="text-sm truncate flex-1" title={folder.name}>
                {folder.name}
              </span>

              {/* Child count badge */}
              {hasChildren && (
                <span className="text-xs text-muted-foreground px-1 shrink-0">
                  {folder.children.length}
                </span>
              )}
            </div>

            {/* Recursive children */}
            {isOpen && hasChildren && (
              <FolderTree
                folders={folder.children}
                level={level + 1}
                isCollapsed={false}
                expandedIds={expandedIds}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

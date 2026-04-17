"use client";

import { ChevronRight, ChevronDown, Folder } from "lucide-react";
import { useReducer, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { FolderTree as FolderTreeType } from "../../../redux/features/folders/folder.types";

interface FolderTreeProps {
  folders: FolderTreeType[];
  level?: number;
  isCollapsed?: boolean;
  expandedIds?: Set<string>;
}

type FolderState = Record<string, boolean>;

type FolderAction =
  | { type: 'TOGGLE'; id: string }
  | { type: 'EXPAND_MULTIPLE'; ids: string[] };

function folderReducer(state: FolderState, action: FolderAction): FolderState {
  switch (action.type) {
    case 'TOGGLE':
      return { ...state, [action.id]: !state[action.id] };
    case 'EXPAND_MULTIPLE':
      const newState = { ...state };
      action.ids.forEach(id => { newState[id] = true; });
      return newState;
    default:
      return state;
  }
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
  expandedIds: propExpandedIds,
}: FolderTreeProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeFolderId = searchParams.get("folderId");

  const getAncestorIds = useCallback(() => {
    if (!activeFolderId) return [];
    const ancestors = new Set<string>();
    collectAncestorIds(folders, activeFolderId, ancestors);
    ancestors.add(activeFolderId);
    return Array.from(ancestors);
  }, [activeFolderId, folders]);

  const [openFolders, dispatch] = useReducer(folderReducer, {}, () => {
    const ancestors = getAncestorIds();
    const initial: FolderState = {};
    ancestors.forEach(id => { initial[id] = true; });
    return initial;
  });

  useEffect(() => {
    const ancestors = getAncestorIds();
    if (ancestors.length > 0) {
      dispatch({ type: 'EXPAND_MULTIPLE', ids: ancestors });
    }
  }, [getAncestorIds]);

  const toggleFolder = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({ type: 'TOGGLE', id });
  };

  const handleFolderClick = (folderId: string) => {
    router.push(`/dashboard/my-drive?folderId=${folderId}`);
  };

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
              {folder.children.length > 0 && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-muted rounded-full" />
              )}
            </button>
          )
        })}
      </div>
    );
  }

  return (
    <div className="space-y-0.5">
      {folders.map((folder) => {
        const hasChildren = folder.children?.length > 0;
        const isOpen = openFolders[folder.id];
        const isActive = folder.id === activeFolderId;

        return (
          <div key={folder.id}>
            <div
              onClick={() => handleFolderClick(folder.id)}
              className={cn(
                "flex items-center gap-1 py-1.5 rounded-md cursor-pointer transition-colors group",
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-accent hover:text-accent-foreground",
              )}
              style={{ paddingLeft: `${level * 12 + 8}px` }}
            >
              {hasChildren ? (
                <button
                  onClick={(e) => toggleFolder(folder.id, e)}
                  className="p-0.5 hover:bg-accent-foreground/10 rounded-sm"
                >
                  {isOpen ? (
                    <ChevronDown className="h-3 w-3" />
                  ) : (
                    <ChevronRight className="h-3 w-3" />
                  )}
                </button>
              ) : (
                <span className="w-4" />
              )}

              <Folder
                className={cn(
                  "h-4 w-4 shrink-0",
                  isActive ? "text-primary" : "text-muted-foreground",
                )}
              />

              <span className="text-sm truncate flex-1" title={folder.name}>
                {folder.name}
              </span>

              {hasChildren && (
                <span className="text-xs text-muted-foreground px-1">
                  {folder.children.length}
                </span>
              )}
            </div>

            {isOpen && hasChildren && (
              <FolderTree
                folders={folder.children}
                level={level + 1}
                isCollapsed={isCollapsed}
                expandedIds={propExpandedIds}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
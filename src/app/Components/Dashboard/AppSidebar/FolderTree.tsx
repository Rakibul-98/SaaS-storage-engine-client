// components/FolderTree.tsx
"use client";

import { ChevronRight, ChevronDown, Folder } from "lucide-react";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface FolderNode {
  id: string;
  name: string;
  children: FolderNode[];
}

interface FolderTreeProps {
  folders: FolderNode[];
  level?: number;
  isCollapsed?: boolean;
}

export default function FolderTree({
  folders,
  level = 0,
  isCollapsed = false,
}: FolderTreeProps) {
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({});
  const router = useRouter();
  const pathname = usePathname();

  const toggleFolder = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenFolders((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleFolderClick = (folderId: string) => {
    router.push(`/dashboard/folder/${folderId}`);
  };

  // If collapsed, show only icons
  if (isCollapsed) {
    return (
      <div className="flex flex-col items-center gap-1 py-2">
        {folders.map((folder) => (
          <button
            key={folder.id}
            onClick={() => handleFolderClick(folder.id)}
            className={cn(
              "p-2 rounded-md transition-colors relative group",
              pathname.includes(folder.id)
                ? "bg-accent text-accent-foreground"
                : "hover:bg-accent hover:text-accent-foreground",
            )}
            title={folder.name}
          >
            <Folder className="h-4 w-4" />
            {folder.children.length > 0 && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
            )}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-0.5">
      {folders.map((folder) => {
        const hasChildren = folder.children.length > 0;
        const isOpen = openFolders[folder.id];
        const isActive = pathname.includes(folder.id);

        return (
          <div key={folder.id}>
            <div
              className={cn(
                "flex items-center gap-1 py-1.5 rounded-md cursor-pointer transition-colors group",
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-accent hover:text-accent-foreground",
              )}
              style={{ paddingLeft: `${level * 12 + 8}px` }}
              onClick={() => handleFolderClick(folder.id)}
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

              <span className="text-sm truncate flex-1">{folder.name}</span>

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
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

"use client";

import { ChevronRight, ChevronDown, Folder } from "lucide-react";
import { useState } from "react";

interface FolderNode {
  id: string;
  name: string;
  children: FolderNode[];
}

export default function FolderTree({
  folders,
  level = 0,
}: {
  folders: FolderNode[];
  level?: number;
}) {
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({});

  const toggleFolder = (id: string) => {
    setOpenFolders((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <>
      {folders.map((folder) => (
        <div key={folder.id}>
          <div
            className="flex items-center gap-2 py-1 cursor-pointer hover:bg-muted rounded px-2"
            style={{ paddingLeft: `${level * 12}px` }}
          >
            {folder.children.length > 0 && (
              <span onClick={() => toggleFolder(folder.id)}>
                {openFolders[folder.id] ? (
                  <ChevronDown size={14} />
                ) : (
                  <ChevronRight size={14} />
                )}
              </span>
            )}

            <Folder size={14} />

            <span className="text-sm">{folder.name}</span>
          </div>

          {openFolders[folder.id] && folder.children.length > 0 && (
            <FolderTree folders={folder.children} level={level + 1} />
          )}
        </div>
      ))}
    </>
  );
}

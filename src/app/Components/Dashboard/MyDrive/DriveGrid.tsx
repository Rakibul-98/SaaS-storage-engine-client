/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import DriveItem from "./DriveItem";

interface DriveGridProps {
  folders: any[];
  files: any[];
  onFolderDoubleClick: (folder: any) => void;
}

export default function DriveGrid({
  folders,
  files,
  onFolderDoubleClick,
}: DriveGridProps) {
  return (
    <div className="flex flex-wrap gap-5">
      {folders.map((folder) => (
        <DriveItem
          key={folder.id}
          item={folder}
          type="folder"
          onDoubleClick={() => onFolderDoubleClick(folder)}
        />
      ))}

      {files.map((file) => (
        <DriveItem key={file.id} item={file} type="file" />
      ))}
    </div>
  );
}

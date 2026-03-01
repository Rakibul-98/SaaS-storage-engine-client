/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Folder, File, MoreVertical } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import UpdateFolderModal from "./Folder/UpdateFolderModal";
import DeleteFolderConfirmation from "./Folder/DeleteFolderConfirmation";
import FileActions from "./File/FileActions";

interface DriveItemProps {
  item: any;
  type: "folder" | "file";
  onDoubleClick?: () => void;
}

export default function DriveItem({
  item,
  type,
  onDoubleClick,
}: DriveItemProps) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // DOWNLOAD (file only)
  const handleDownload = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/files/${item.id}/download`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      const blob = await response.blob();
      const contentType =
        response.headers.get("content-type") || "application/octet-stream";

      const fileBlob = new Blob([blob], { type: contentType });
      const url = window.URL.createObjectURL(fileBlob);

      const a = document.createElement("a");
      a.href = url;
      a.download = item.name;
      a.click();

      window.URL.revokeObjectURL(url);
      setDropdownOpen(false); // Close dropdown after download
    } catch {
      console.error("Download failed");
    }
  };

  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
    setDropdownOpen(false); // Close dropdown when delete is clicked
  };

  return (
    <>
      <div
        onDoubleClick={type === "folder" ? onDoubleClick : undefined}
        className="border rounded-lg p-4 w-48 flex flex-col items-center gap-3 relative hover:shadow-md transition-shadow"
      >
        <div className="absolute top-2 right-2">
          <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <button className="p-1 rounded hover:bg-gray-100">
                <MoreVertical size={18} />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              {type === "folder" ? (
                <>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <UpdateFolderModal
                      folder={item}
                      onClose={() => setDropdownOpen(false)}
                    />
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    className="text-red-500 cursor-pointer"
                    onSelect={(e) => e.preventDefault()}
                    onClick={handleDeleteClick}
                  >
                    Delete
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem
                    onSelect={(e) => e.preventDefault()}
                    onClick={handleDownload}
                  >
                    Download
                  </DropdownMenuItem>

                  <FileActions file={item} />
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {type === "folder" ? (
          <Folder size={100} className="text-blue-500" />
        ) : (
          <File size={100} className="text-gray-500" />
        )}

        <span className="font-medium text-center w-full">{item.name}</span>
      </div>

      {type === "folder" && (
        <DeleteFolderConfirmation
          open={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          folder={item}
        />
      )}
    </>
  );
}

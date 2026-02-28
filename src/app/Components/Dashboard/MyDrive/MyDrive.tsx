/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Folder, MoreVertical } from "lucide-react";
import { useGetFoldersQuery } from "../../../redux/features/folders/folderApi";

import CreateFolderModal from "./Folder/CreateFolderModal";
import UpdateFolderModal from "./Folder/UpdateFolderModal";
import DeleteFolderConfirmation from "./Folder/DeleteFolderConfirmation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

export default function MyDrive() {
  const { data, isLoading } = useGetFoldersQuery();

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [folderToDelete, setFolderToDelete] = useState<any>(null);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const handleDeleteClick = (folder: any) => {
    setFolderToDelete(folder);
    setDeleteModalOpen(true);
    setOpenDropdownId(null);
  };

  const handleDeleteClose = () => {
    setDeleteModalOpen(false);
    setFolderToDelete(null);
  };

  const handleUpdateComplete = () => {
    setOpenDropdownId(null);
  };

  if (isLoading) return <div>Loading...</div>;

  const folders = data?.data || [];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Drive</h1>
        <CreateFolderModal folders={folders} />
      </div>

      <div className="flex flex-wrap gap-5">
        {folders.map((folder: any) => (
          <div
            key={folder.id}
            className="border rounded-lg p-4 w-48 flex flex-col items-center gap-3 relative hover:shadow-md transition-shadow"
          >
            <div className="absolute top-2 right-2">
              <DropdownMenu
                open={openDropdownId === folder.id}
                onOpenChange={(isOpen) => {
                  setOpenDropdownId(isOpen ? folder.id : null);
                }}
              >
                <DropdownMenuTrigger asChild>
                  <button className="p-1 rounded hover:bg-gray-100">
                    <MoreVertical size={18} />
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    asChild
                    onSelect={(e) => e.preventDefault()}
                  >
                    <UpdateFolderModal
                      onUpdateComplete={handleUpdateComplete}
                      folder={folder}
                    />
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    className="text-red-500 cursor-pointer"
                    onClick={() => handleDeleteClick(folder)}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <Folder size={100} className="text-blue-500" />

            <span className="font-medium text-center w-full">
              {folder.name}
            </span>
          </div>
        ))}
      </div>

      <DeleteFolderConfirmation
        open={deleteModalOpen}
        onClose={handleDeleteClose}
        folder={folderToDelete}
      />
    </div>
  );
}

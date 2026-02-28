/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useUpdateFolderMutation } from "../../../../redux/features/folders/folderApi";
import { toast } from "sonner";

interface UpdateFolderModalProps {
  folder: any;
  onUpdateComplete?: () => void;
}

export default function UpdateFolderModal({
  folder,
  onUpdateComplete,
}: UpdateFolderModalProps) {
  const [name, setName] = useState(folder.name);
  const [open, setOpen] = useState(false);
  const [updateFolder, { isLoading }] = useUpdateFolderMutation();

  const handleUpdate = async () => {
    try {
      await updateFolder({
        id: folder.id,
        name,
      }).unwrap();

      toast.success("Folder updated successfully!");
      setOpen(false);
      if (onUpdateComplete) {
        onUpdateComplete();
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update folder");
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setName(folder.name);
    }
    setOpen(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <p className="cursor-pointer px-2 py-1 hover:bg-gray-100 rounded">
          Edit
        </p>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename Folder</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <input
            className="border p-2 w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <div className="flex justify-end">
            <Button disabled={isLoading} onClick={handleUpdate}>
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

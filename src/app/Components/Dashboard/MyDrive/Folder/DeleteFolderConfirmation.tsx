/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "../../../../../components/ui/dialog";
import { Button } from "../../../../../components/ui/button";
import { useDeleteFolderMutation } from "../../../../redux/features/folders/folderApi";
import { toast } from "sonner";

interface DeleteFolderConfirmationProps {
  open: boolean;
  onClose: () => void;
  folder: any;
}

export default function DeleteFolderConfirmation({
  open,
  onClose,
  folder,
}: DeleteFolderConfirmationProps) {
  const [deleteFolder, { isLoading: isDeleting }] = useDeleteFolderMutation();

  const handleDeleteConfirm = async () => {
    if (!folder) return;

    try {
      await deleteFolder(folder.id).unwrap();
      toast.success("Folder deleted successfully!");
      onClose();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete folder");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-105">
        <DialogHeader>
          <DialogDescription className="flex items-center gap-2 text-red-600">
            Are you sure you want to delete this folder?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} disabled={isDeleting}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDeleteConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

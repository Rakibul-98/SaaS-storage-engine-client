/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDeleteFileMutation } from "../../../../redux/features/files/fileApi";
import { toast } from "sonner";

export default function DeleteFileDialog({ file }: any) {
  const [open, setOpen] = useState(false);
  const [deleteFile, { isLoading }] = useDeleteFileMutation();

  const handleDelete = async () => {
    try {
      await deleteFile(file.id).unwrap();
      toast.success("File deleted");
      setOpen(false);
    } catch (err: any) {
      toast.error(err?.data?.message || "Delete failed");
    }
  };

  return (
    <>
      <p
        onClick={() => setOpen(true)}
        className="cursor-pointer text-red-500 px-2 py-1 hover:bg-gray-100 rounded"
      >
        Delete
      </p>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete File</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this file?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

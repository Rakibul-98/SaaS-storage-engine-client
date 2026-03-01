/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useGetFoldersQuery } from "../../../../redux/features/folders/folderApi";
import { useUpdateFileMutation } from "../../../../redux/features/files/fileApi";
import { toast } from "sonner";

interface MoveFileDialogProps {
  file: any;
  onClose: () => void;
}

export default function MoveFileDialog({ file, onClose }: MoveFileDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  const { data } = useGetFoldersQuery();
  const [updateFile, { isLoading }] = useUpdateFileMutation();

  const handleMove = async () => {
    if (!selectedFolder) return;

    try {
      await updateFile({
        id: file.id,
        folderId: selectedFolder,
      }).unwrap();

      toast.success("File moved");
      setOpen(false);
      onClose();
    } catch (err: any) {
      toast.error(err?.data?.message || "Move failed");
    }
  };

  return (
    <>
      <p
        onClick={() => setOpen(true)}
        className="cursor-pointer px-2 py-1 hover:bg-gray-100 rounded"
      >
        Move
      </p>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Move File</DialogTitle>
          </DialogHeader>

          <Select onValueChange={(value) => setSelectedFolder(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Folder" />
            </SelectTrigger>

            <SelectContent>
              {data?.data?.map((folder: any) => (
                <SelectItem key={folder.id} value={folder.id}>
                  {folder.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <DialogFooter>
            <Button onClick={handleMove} disabled={isLoading}>
              {isLoading ? "Moving..." : "Move"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUpdateFolderMutation } from "../../../../redux/features/folders/folderApi";
import { toast } from "sonner";

interface FormValues {
  name: string;
}

interface UpdateFolderModalProps {
  folder: any;
  onClose?: () => void;
}

export default function UpdateFolderModal({
  folder,
  onClose,
}: UpdateFolderModalProps) {
  const [open, setOpen] = useState(false);
  const [updateFolder, { isLoading }] = useUpdateFolderMutation();

  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: { name: folder?.name || "" },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await updateFolder({
        id: folder.id,
        name: data.name,
      }).unwrap();

      toast.success("Folder renamed successfully");
      setOpen(false);
      if (onClose) onClose();
    } catch (err: any) {
      toast.error(err?.data?.message || "Rename failed");
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen && onClose) {
      onClose();
    }
  };

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="w-full cursor-pointer py-1 hover:bg-gray-100 rounded"
      >
        Rename
      </div>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename Folder</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              {...register("name", { required: "Name is required" })}
              placeholder="Folder name"
              autoFocus
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

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
import { useUpdateFileMutation } from "../../../../redux/features/files/fileApi";
import { toast } from "sonner";

interface FormValues {
  name: string;
}

interface RenameFileDialogProps {
  file: any;
  onClose: () => void;
}

export default function RenameFileDialog({
  file,
  onClose,
}: RenameFileDialogProps) {
  const [open, setOpen] = useState(false);
  const [updateFile, { isLoading }] = useUpdateFileMutation();

  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: { name: file.name },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await updateFile({
        id: file.id,
        name: data.name,
      }).unwrap();

      toast.success("File renamed");
      setOpen(false);
      onClose();
      reset({ name: data.name });
    } catch (err: any) {
      toast.error(err?.data?.message || "Rename failed");
    }
  };

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="cursor-pointer px-2 py-1 hover:bg-gray-100 rounded"
      >
        Rename
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename File</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input {...register("name", { required: true })} />

            <DialogFooter>
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

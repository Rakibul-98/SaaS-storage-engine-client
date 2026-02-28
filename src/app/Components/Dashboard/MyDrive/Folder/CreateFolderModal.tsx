/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../../components/ui/dialog";
import { Input } from "../../../../../components/ui/input";
import { Label } from "../../../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../components/ui/select";

import { useCreateFolderMutation } from "../../../../redux/features/folders/folderApi";
import { toast } from "sonner";

const createFolderSchema = z.object({
  name: z
    .string()
    .min(1, "Folder name is required")
    .max(100, "Folder name is too long"),
  parentId: z.string().nullable(),
});

type CreateFolderFormValues = z.infer<typeof createFolderSchema>;

interface CreateFolderModalProps {
  folders: any[];
  parentId?: string | null;
}

export default function CreateFolderModal({
  folders,
  parentId,
}: CreateFolderModalProps) {
  const [open, setOpen] = useState(false);
  const [createFolder, { isLoading }] = useCreateFolderMutation();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isDirty, isValid },
  } = useForm<CreateFolderFormValues>({
    resolver: zodResolver(createFolderSchema),
    defaultValues: {
      name: "",
      parentId: null,
    },
  });

  const onSubmit = async (values: CreateFolderFormValues) => {
    try {
      await createFolder({
        name: values.name.trim(),
        parentId: parentId ?? values.parentId,
      }).unwrap();

      toast.success("Folder created successfully!");

      reset();

      setOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create folder");
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      reset();
    }
    setOpen(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>Create Folder</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Folder</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Folder Name</Label>
            <Input
              id="name"
              placeholder="Enter folder name"
              {...register("name")}
              disabled={isLoading}
              autoFocus
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2 w-full">
            <Label htmlFor="parentId">Parent Folder (Optional)</Label>
            <Controller
              name="parentId"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={(value) =>
                    field.onChange(value === "root" ? null : value)
                  }
                  value={field.value === null ? "root" : field.value}
                  disabled={isLoading}
                >
                  <SelectTrigger className="w-full" id="parentId">
                    <SelectValue placeholder="Select a parent folder" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="root">Root Directory</SelectItem>
                    {folders.map((folder: any) => (
                      <SelectItem key={folder.id} value={folder.id}>
                        {folder.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.parentId && (
              <p className="text-sm text-red-500">{errors.parentId.message}</p>
            )}
          </div>

          {errors.root && (
            <p className="text-sm text-red-500">{errors.root.message}</p>
          )}

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || !isDirty || !isValid}>
              {isLoading ? <>Creating...</> : "Create Folder"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

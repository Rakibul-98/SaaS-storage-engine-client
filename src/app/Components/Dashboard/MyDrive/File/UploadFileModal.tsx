/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useCallback, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../components/ui/select";
import { Label } from "../../../../../components/ui/label";
import { Input } from "../../../../../components/ui/input";

import {
  FileIcon,
  X,
  Upload,
  FileText,
  Image as ImageIcon,
} from "lucide-react";
import { useUploadFileMutation } from "../../../../redux/features/files/fileApi";

const uploadFileSchema = z.object({
  folderId: z.string().nullable(),
  file: z
    .any()
    .refine((file) => file instanceof File, "Please select a file")
    .refine(
      (file) => file?.size <= 10 * 1024 * 1024,
      "File size must be less than 10MB",
    ),
});

type UploadFileFormValues = z.infer<typeof uploadFileSchema>;

interface UploadFileModalProps {
  folders: any[];
  parentId?: string | null;
}

export default function UploadFileModal({
  folders,
  parentId,
}: UploadFileModalProps) {
  const [open, setOpen] = useState(false);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [uploadFile, { isLoading }] = useUploadFileMutation();

  const {
    handleSubmit,
    reset,
    control,
    setValue,
    watch,
    formState: { errors, isDirty, isValid },
  } = useForm<UploadFileFormValues>({
    resolver: zodResolver(uploadFileSchema),
    defaultValues: {
      folderId: parentId || null,
      file: undefined,
    },
  });

  const selectedFile = watch("file");

  useEffect(() => {
    if (open) {
      setValue("folderId", parentId || null);
    }
  }, [open, parentId, setValue]);

  useEffect(() => {
    if (selectedFile instanceof File) {
      if (selectedFile.type.startsWith("image/")) {
        const previewUrl = URL.createObjectURL(selectedFile);
        setFilePreview(previewUrl);

        return () => {
          if (filePreview) {
            URL.revokeObjectURL(filePreview);
          }
        };
      } else {
        setFilePreview(null);
      }
    } else {
      setFilePreview(null);
    }
  }, [selectedFile]);

  const onSubmit = async (values: UploadFileFormValues) => {
    try {
      await uploadFile({
        file: values.file,
        folderId: values.folderId || "",
      }).unwrap();

      toast.success("File uploaded successfully!");
      handleClose();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to upload file");
    }
  };

  const handleClose = useCallback(() => {
    reset();
    setFilePreview(null);
    setOpen(false);
  }, [reset]);

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      handleClose();
    } else {
      setValue("folderId", parentId || null);
    }
    setOpen(newOpen);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("file", file, { shouldValidate: true, shouldDirty: true });
    }
  };

  const clearSelectedFile = () => {
    setValue("file", undefined, { shouldValidate: true });
    setFilePreview(null);
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) {
      return <ImageIcon className="h-8 w-8 text-blue-500" />;
    } else if (file.type.startsWith("text/")) {
      return <FileText className="h-8 w-8 text-gray-500" />;
    } else {
      return <FileIcon className="h-8 w-8 text-gray-500" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const currentFolderName = parentId
    ? folders.find((f) => f.id === parentId)?.name
    : "Root Directory";

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Upload /> Upload File
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload File</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="folderId">Upload to Folder</Label>
            <Controller
              name="folderId"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={(value) =>
                    field.onChange(value === "root" ? null : value)
                  }
                  value={field.value === null ? "root" : field.value}
                  disabled={true}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select folder" />
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
            <p className="text-sm text-muted-foreground">
              Uploading to: {currentFolderName}
            </p>
          </div>

          <div className="space-y-2">
            <Label>Select File</Label>

            {!selectedFile ? (
              <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary transition-colors">
                <Input
                  type="file"
                  className="hidden"
                  id="file-upload"
                  onChange={handleFileChange}
                  disabled={isLoading}
                />
                <Label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center gap-2"
                >
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    Click to select or drag and drop
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Maximum file size: 10MB
                  </span>
                </Label>
              </div>
            ) : (
              <div className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {/* File Preview */}
                    {filePreview ? (
                      <div className="relative h-12 w-12 rounded overflow-hidden">
                        <Image
                          src={filePreview}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      getFileIcon(selectedFile)
                    )}

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {selectedFile.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(selectedFile.size)}
                      </p>
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={clearSelectedFile}
                    disabled={isLoading}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {errors.file && (
              <p className="text-sm text-red-500">
                {errors.file.message as string}
              </p>
            )}
          </div>

          {errors.folderId && (
            <p className="text-sm text-red-500">{errors.folderId.message}</p>
          )}

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || !isDirty || !isValid}>
              {isLoading ? (
                <>Uploading...</>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload File
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

/* eslint-disable react-hooks/incompatible-library */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
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
import { Label } from "../../../../../components/ui/label";
import { Input } from "../../../../../components/ui/input";

import { FileIcon, X, Upload } from "lucide-react";
import { useUploadFileMutation } from "../../../../redux/features/files/fileApi";
import { useGetMySubscriptionQuery } from "../../../../redux/features/userSubscription/userSubscriptionApi";

const createFileSchema = (maxFileSizeMB: number) => {
  const maxSizeBytes = maxFileSizeMB * 1024 * 1024;

  return z.object({
    file: z
      .any()
      .refine((file) => file instanceof File, "Please select a file")
      .refine(
        (file) => file?.size <= maxSizeBytes,
        `File size must be less than ${maxFileSizeMB}MB`,
      ),
  });
};

type UploadFileFormValues = z.infer<ReturnType<typeof createFileSchema>>;

interface UploadFileModalProps {
  folders: any[];
  parentId?: string | null;
}

export default function UploadFileModal({ parentId }: UploadFileModalProps) {
  const [open, setOpen] = useState(false);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [uploadFile, { isLoading }] = useUploadFileMutation();
  const { data: subData } = useGetMySubscriptionQuery();

  const currentPackage = subData?.data?.package;
  const maxFileSizeMB = currentPackage?.maxFileSizeMB || 10;

  const schema = createFileSchema(maxFileSizeMB);

  const {
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isDirty, isValid },
  } = useForm<UploadFileFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      file: undefined,
    },
  });

  const selectedFile = watch("file");

  useEffect(() => {
    if (
      selectedFile instanceof File &&
      selectedFile.type.startsWith("image/")
    ) {
      const previewUrl = URL.createObjectURL(selectedFile);
      setFilePreview(previewUrl);

      return () => URL.revokeObjectURL(previewUrl);
    }
    setFilePreview(null);
  }, [selectedFile]);

  const onSubmit = async (values: UploadFileFormValues) => {
    try {
      await uploadFile({
        file: values.file,
        folderId: parentId || "",
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

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Upload className="h-4 w-4 mr-2" /> Upload File
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload File</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                    Maximum file size: {maxFileSizeMB}MB
                  </span>
                </Label>
              </div>
            ) : (
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
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
                      <FileIcon className="h-8 w-8 text-muted-foreground" />
                    )}

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {selectedFile.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(selectedFile.size)} / {maxFileSizeMB}MB
                        max
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

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !isDirty || !isValid}
              className="min-w-25"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Uploading...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Upload File
                </span>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

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
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "../../../../../components/ui/dialog";
import { Label } from "../../../../../components/ui/label";
import { Input } from "../../../../../components/ui/input";
import { Progress } from "../../../../../components/ui/progress";
import { Badge } from "../../../../../components/ui/badge";
import { FileIcon, X, Upload, Sparkles } from "lucide-react";
import { useUploadFileMutation } from "../../../../redux/features/files/fileApi";
import { useGetMySubscriptionQuery } from "../../../../redux/features/userSubscription/userSubscriptionApi";

const ALLOWED_MIME_TYPES = [
  "image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml",
  "video/mp4", "video/quicktime", "audio/mpeg", "audio/wav", "audio/ogg",
  "application/pdf", "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/plain", "text/csv",
];

const createFileSchema = (maxFileSizeMB: number) =>
  z.object({
    file: z
      .any()
      .refine((f) => f instanceof File, "Please select a file")
      .refine((f) => f?.size <= maxFileSizeMB * 1024 * 1024, `File must be < ${maxFileSizeMB}MB`)
      .refine((f) => ALLOWED_MIME_TYPES.includes(f?.type), "File type not allowed"),
  });

type FormValues = z.infer<ReturnType<typeof createFileSchema>>;

interface Props { folders: any[]; parentId?: string | null; }

export default function UploadFileModal({ parentId }: Props) {
  const [open, setOpen] = useState(false);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [uploadFile, { isLoading }] = useUploadFileMutation();
  const { data: subData } = useGetMySubscriptionQuery();

  const pkg = subData?.data?.package;
  const maxFileSizeMB = pkg?.maxFileSizeMB || 10;
  const schema = createFileSchema(maxFileSizeMB);

  const { handleSubmit, reset, setValue, watch, formState: { errors, isDirty, isValid } } =
    useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { file: undefined } });

  const selectedFile = watch("file");

  useEffect(() => {
    if (selectedFile instanceof File && selectedFile.type.startsWith("image/")) {
      const url = URL.createObjectURL(selectedFile);
      setFilePreview(url);
      return () => URL.revokeObjectURL(url);
    }
    setFilePreview(null);
  }, [selectedFile]);

  // Fake upload progress for UX while waiting for Cloudinary
  useEffect(() => {
    if (!isLoading) { setProgress(0); return; }
    setProgress(10);
    const intervals = [
      setTimeout(() => setProgress(30), 600),
      setTimeout(() => setProgress(55), 1400),
      setTimeout(() => setProgress(75), 2400),
      setTimeout(() => setProgress(90), 3800),
    ];
    return () => intervals.forEach(clearTimeout);
  }, [isLoading]);

  const onSubmit = async (values: FormValues) => {
    try {
      await uploadFile({ file: values.file, folderId: parentId || "" }).unwrap();
      setProgress(100);
      toast.success("File uploaded & AI tags generated!", { icon: "✨" });
      setTimeout(() => handleClose(), 400);
    } catch (error: any) {
      toast.error(error?.data?.message || "Upload failed");
      setProgress(0);
    }
  };

  const handleClose = useCallback(() => {
    reset(); setFilePreview(null); setProgress(0); setOpen(false);
  }, [reset]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setValue("file", file, { shouldValidate: true, shouldDirty: true });
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) handleClose(); setOpen(o); }}>
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
          {/* Subscription info */}
          {pkg && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 rounded-lg px-3 py-2">
              <Sparkles className="h-3 w-3 text-purple-400" />
              AI will auto-tag this file after upload · Max {maxFileSizeMB}MB · {pkg.name} plan
            </div>
          )}

          <div className="space-y-2">
            <Label>Select File</Label>

            {!selectedFile ? (
              <div className="border-2 border-dashed rounded-xl p-8 text-center hover:border-primary/60 transition-colors cursor-pointer"
                onClick={() => document.getElementById("file-upload")?.click()}>
                <Input type="file" className="hidden" id="file-upload" onChange={handleFileChange} disabled={isLoading} />
                <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm font-medium">Click or drag & drop</p>
                <p className="text-xs text-muted-foreground mt-1">Images, PDFs, Docs, Audio, Video up to {maxFileSizeMB}MB</p>
              </div>
            ) : (
              <div className="border rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {filePreview ? (
                      <div className="relative h-12 w-12 rounded-lg overflow-hidden">
                        <Image src={filePreview} alt="Preview" fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="h-12 w-12 bg-muted rounded-lg flex items-center justify-center">
                        <FileIcon className="h-6 w-6 text-muted-foreground" />
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium truncate max-w-52">{selectedFile.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Badge variant="outline" className="text-[10px] h-4">
                          {selectedFile.type.split("/")[1]?.toUpperCase() || "FILE"}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{formatSize(selectedFile.size)}</span>
                      </div>
                    </div>
                  </div>
                  <Button type="button" variant="ghost" size="icon" className="h-8 w-8 shrink-0"
                    onClick={() => { setValue("file", undefined, { shouldValidate: true }); setFilePreview(null); }}
                    disabled={isLoading}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Upload progress */}
                {isLoading && (
                  <div className="space-y-1.5">
                    <Progress value={progress} className="h-1.5" />
                    <p className="text-xs text-muted-foreground text-center">
                      {progress < 90 ? "Uploading to Cloudinary..." : "Processing & generating AI tags..."}
                    </p>
                  </div>
                )}
              </div>
            )}

            {errors.file && (
              <p className="text-sm text-red-500">{errors.file.message as string}</p>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={handleClose} disabled={isLoading}>Cancel</Button>
            <Button type="submit" disabled={isLoading || !isDirty || !isValid} className="min-w-28">
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Uploading...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Upload className="h-4 w-4" /> Upload
                </span>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

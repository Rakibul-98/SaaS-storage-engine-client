/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../../../components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import {
  useGetTrashFilesQuery,
  usePermanentDeleteFileMutation,
  useRestoreFileMutation,
} from "../../../redux/features/files/fileApi";
import { FileText, FileImage, FileVideo, FileAudio, File } from "lucide-react";
import { toast } from "sonner";
import TrashSkeleton from "./TrashSkeleton";
import Image from "next/image";
import { Badge } from "../../../../components/ui/badge";

const TYPE_ICON: Record<string, React.ElementType> = {
  IMAGE: FileImage, VIDEO: FileVideo, AUDIO: FileAudio, PDF: FileText, DOCUMENT: FileText, OTHER: File,
};

export default function Trash() {
  const { data, isLoading } = useGetTrashFilesQuery();
  const [restoreFile, { isLoading: restoreLoading }] = useRestoreFileMutation();
  const [permanentDeleteFile, { isLoading: permanentDeleteLoading }] =
    usePermanentDeleteFileMutation();

  const [deleteId, setDeleteId] = useState<string | null>(null);

  const files = data?.data || [];

  const handleRestore = async (fileId: string) => {
    try {
      await restoreFile(fileId).unwrap();
      toast.success("File restored successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to restore file");
    }
  };

  const handlePermanentDelete = async () => {
    if (!deleteId) return;

    try {
      await permanentDeleteFile(deleteId).unwrap();
      toast.success("File permanently deleted");
      setDeleteId(null);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete file");
      setDeleteId(null);
    }
  };

  const FileThumb = ({ file }: { file: any }) => {
    const Icon = TYPE_ICON[file.type] ?? File;
    if (file.thumbnailUrl) {
      return (
        <div className="relative h-9 w-9 rounded-lg overflow-hidden">
          <Image src={file.thumbnailUrl} alt={file.name} fill className="object-cover" sizes="36px" />
        </div>
      );
    }
    return (
      <div className="p-1.5 bg-muted rounded-lg">
        <Icon className="h-5 w-5 text-muted-foreground" />
      </div>
    );
  };

  if (isLoading) return <TrashSkeleton />;

  return (
    <div className="p-0 md:p-6 space-y-4 md:space-y-6">
      <h2 className="text-2xl font-bold px-4 md:px-0">Trash</h2>

      <div className="block md:hidden space-y-3 px-4">
        {files.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-muted-foreground gap-2">
            <div className="text-5xl">🗑️</div>
            <p className="font-medium">Trash is empty</p>
          </div>
        ) : (
          files.map((file: any) => (
            <Card key={file.id} className="p-4 space-y-3">
              <div className="flex items-start gap-3">
                <FileThumb file={file} />

                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{file.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Badge variant="outline" className="text-[10px] h-4">{file.type}</Badge>
                    <span className="text-xs text-muted-foreground">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                Deleted {new Date(file.updatedAt).toLocaleDateString()} · {file.folder?.name || "Root"}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button size="sm" variant="outline" onClick={() => handleRestore(file.id)} disabled={restoreLoading}>
                  {restoreLoading ? "Restoring..." : "Restore"}
                </Button>
                <Button size="sm" variant="destructive" onClick={() => setDeleteId(file.id)} disabled={permanentDeleteLoading}>
                  Delete
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>

      <div className="hidden md:block rounded-md border overflow-hidden">
        <Table>
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead>File</TableHead>
              <TableHead>Folder</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Deleted At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {files.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-6 text-muted-foreground"
                >
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-4xl">🗑️</span>
                    <p>Trash is empty</p>
                  </div>
                </TableCell>
              </TableRow>
            )}

            {files.map((file: any) => (
              <TableRow key={file.id}>
                <TableCell className="p-3">
                  <div className="p-1 bg-muted rounded-md w-fit">
                    <File className="h-4 w-4" />
                  </div>
                </TableCell>
                <TableCell className="font-medium max-w-50 truncate">
                  {file.name}
                </TableCell>
                <TableCell className="max-w-37.5 truncate">
                  {file.folder?.name || "Root"}
                </TableCell>
                <TableCell>{file.type}</TableCell>
                <TableCell className="whitespace-nowrap">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {new Date(file.updatedAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right whitespace-nowrap">
                  <div className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleRestore(file.id)}
                      disabled={restoreLoading}
                    >
                      {restoreLoading ? "Restoring" : "Restore"}
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => setDeleteId(file.id)}
                      disabled={permanentDeleteLoading}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Alert Dialog - same for both views */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Permanently delete file?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The file will be removed forever.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col gap-2 sm:flex-row">
            <AlertDialogCancel className="w-full sm:w-auto">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handlePermanentDelete}
              disabled={permanentDeleteLoading}
              className="w-full sm:w-auto"
            >
              {permanentDeleteLoading ? "Deleting..." : "Confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

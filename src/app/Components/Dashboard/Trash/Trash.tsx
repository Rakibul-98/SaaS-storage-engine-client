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
import { useState } from "react";
import {
  useGetTrashFilesQuery,
  usePermanentDeleteFileMutation,
  useRestoreFileMutation,
} from "../../../redux/features/files/fileApi";
import { File } from "lucide-react";
import { toast } from "sonner";
import TrashSkeleton from "./TrashSkeleton";

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

  if (isLoading) return <TrashSkeleton />;

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Trash</h2>

      <div className="rounded-md border">
        <Table className="text-xs">
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead></TableHead>
              <TableHead>File</TableHead>
              <TableHead>Folder</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Deleted At</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {files.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6">
                  No files in the trash...
                </TableCell>
              </TableRow>
            )}

            {files.map((file: any) => (
              <TableRow key={file.id}>
                <TableCell className="p-3 w-12 border-r">
                  <File />
                </TableCell>
                <TableCell>{file.name}</TableCell>
                <TableCell>{file.folder?.name || "Root"}</TableCell>
                <TableCell>{file.type}</TableCell>
                <TableCell>
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </TableCell>
                <TableCell>
                  {new Date(file.updatedAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right space-x-2">
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Permanently delete file?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The file will be removed forever.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handlePermanentDelete}
              disabled={permanentDeleteLoading}
            >
              {permanentDeleteLoading ? "Deleting" : "Confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

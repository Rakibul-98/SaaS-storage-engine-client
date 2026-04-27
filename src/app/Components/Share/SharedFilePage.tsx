/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetSharedFileQuery } from "../../redux/features/files/fileApi";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  FileText, FileImage, FileVideo, FileAudio, File,
  Download, AlertCircle, Eye, Clock
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { downloadFile } from "../../../lib/utils";

const TYPE_ICON: Record<string, React.ElementType> = {
  IMAGE: FileImage, VIDEO: FileVideo, AUDIO: FileAudio, PDF: FileText, DOCUMENT: FileText, OTHER: File,
};

export default function SharedFilePage({ token }: { token: string }) {
  const { data, isLoading, isError, error } = useGetSharedFileQuery(token, {
    skip: !token,
  });


  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-48 w-full rounded-xl" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError || !data?.data?.file) {
    const msg = (error as any)?.data?.message ?? "This link is invalid, expired, or has reached its view limit.";
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-10 space-y-4">
            <div className="flex justify-center">
              <div className="p-4 bg-red-100 rounded-full">
                <AlertCircle className="h-10 w-10 text-red-500" />
              </div>
            </div>
            <h2 className="text-xl font-semibold">Link Unavailable</h2>
            <p className="text-muted-foreground text-sm">{msg}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { file, viewCount } = data.data;
  const Icon = TYPE_ICON[file.type] ?? File;

  const handleDownload = async () => {
    await downloadFile(file.path, file.name);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-lg">
        <CardContent className=" space-y-5">
          {/* Header */}
          <div className="text-center space-y-1">
            <h2 className="text-lg font-semibold">Shared File</h2>
            <p className="text-sm text-muted-foreground">Someone shared a file with you</p>
          </div>

          {/* Preview */}
          <div className="rounded-xl overflow-hidden flex items-center justify-center h-52">
            {file.thumbnailUrl ? (
              <div className="relative w-full h-full">
                <Image src={file.thumbnailUrl} alt={file.name} fill className="object-contain" />
              </div>
            ) : (
              <Icon className="h-20 w-20 text-muted-foreground" />
            )}
          </div>

          {/* File info */}
          <div className="space-y-2">
            <p className="font-semibold truncate text-center">{file.name}</p>
            <div className="flex justify-center gap-2 flex-wrap">
              <Badge variant="secondary">{file.type}</Badge>
              <Badge variant="outline">{(file.size / (1024 * 1024)).toFixed(2)} MB</Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Eye className="h-3 w-3" /> {viewCount} view{viewCount !== 1 ? "s" : ""}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="h-3 w-3" /> {new Date(file.createdAt).toLocaleDateString()}
              </Badge>
            </div>
          </div>

          {/* AI Summary */}
          {file.aiSummary && (
            <div className="bg-muted/60 rounded-lg p-3 text-sm text-muted-foreground">
              <p className="font-medium text-foreground mb-1 flex items-center gap-1">
                ✨ AI Summary
              </p>
              {file.aiSummary}
            </div>
          )}

          {/* Tags */}
          {file.aiTags?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 justify-center">
              {file.aiTags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
              ))}
            </div>
          )}

          {/* Download button */}
          <Button className="w-full gap-2" onClick={handleDownload} size="lg">
            <Download className="h-4 w-4" /> Download File
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            Powered by{" "}
            <Link href="/" className="text-primary hover:underline font-medium">SaaS Storage Engine</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

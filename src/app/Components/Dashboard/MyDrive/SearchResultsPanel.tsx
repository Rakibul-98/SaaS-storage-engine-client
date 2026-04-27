"use client";

import { FileItem } from "../../../redux/features/files/file.type";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { FileText, FileImage, FileVideo, FileAudio, File, X, Sparkles } from "lucide-react";
import Image from "next/image";

const TYPE_ICON: Record<string, React.ElementType> = {
  IMAGE: FileImage, VIDEO: FileVideo, AUDIO: FileAudio, PDF: FileText, DOCUMENT: FileText, OTHER: File,
};

interface Props {
  results: FileItem[];
  isLoading: boolean;
  query: string;
  onClear: () => void;
}

export default function SearchResultsPanel({ results, isLoading, query, onClear }: Props) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => <Skeleton key={i} className="h-20 w-full rounded-xl" />)}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {results.length} result{results.length !== 1 ? "s" : ""} for <span className="font-medium text-foreground">&quot;{query}&quot;</span>
        </p>
        <Button variant="ghost" size="sm" onClick={onClear} className="gap-1 h-7">
          <X className="h-3 w-3" /> Clear
        </Button>
      </div>

      {results.length === 0 ? (
        <div className="flex flex-col items-center py-16 text-muted-foreground gap-2">
          <div className="text-4xl">🔍</div>
          <p className="font-medium">No files found</p>
          <p className="text-sm">Try different keywords or check your spelling</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {results.map((file) => {
            const Icon = TYPE_ICON[file.type] ?? File;
            return (
              <Card key={file.id} className="hover:shadow-sm transition">
                <CardContent className="p-4 flex items-start gap-4">
                  {/* Thumbnail or icon */}
                  <div className="w-14 h-14 rounded-lg bg-muted overflow-hidden shrink-0 flex items-center justify-center">
                    {file.thumbnailUrl ? (
                      <div className="relative w-full h-full">
                        <Image src={file.thumbnailUrl} alt={file.name} fill className="object-cover" sizes="56px" />
                      </div>
                    ) : (
                      <Icon className="h-7 w-7 text-muted-foreground" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <p className="font-medium truncate">{file.name}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Badge variant="outline" className="text-[10px] h-4">{file.type}</Badge>
                      <span>{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
                      <span>{new Date(file.createdAt).toLocaleDateString()}</span>
                    </div>

                    {/* AI Summary */}
                    {file.aiSummary && (
                      <p className="text-xs text-muted-foreground flex items-start gap-1 leading-relaxed">
                        <Sparkles className="h-3 w-3 shrink-0 mt-0.5 text-purple-400" />
                        {file.aiSummary}
                      </p>
                    )}

                    {/* AI Tags */}
                    {file.aiTags?.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {file.aiTags.slice(0, 5).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-[10px] h-4 px-1.5">{tag}</Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Folder, MoreVertical, FileText, FileImage, FileVideo, FileAudio, File } from "lucide-react";
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import UpdateFolderModal from "./Folder/UpdateFolderModal";
import DeleteFolderConfirmation from "./Folder/DeleteFolderConfirmation";
import FileActions from "./File/FileActions";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../../../components/ui/tooltip";
import ShareLinkModal from "./File/ShareLinkModal";
import { Badge } from "../../../../components/ui/badge";
import Image from "next/image";
import { FileItem } from "../../../redux/features/files/file.type";
import { fetchAndDownloadFile } from "../../../../lib/utils";

const FILE_TYPE_ICON: Record<string, React.ElementType> = {
  IMAGE: FileImage,
  VIDEO: FileVideo,
  AUDIO: FileAudio,
  PDF: FileText,
  DOCUMENT: FileText,
  OTHER: File,
};

interface DriveItemProps {
  item: any;
  type: "folder" | "file";
  onDoubleClick?: () => void;
}

export default function DriveItem({
  item,
  type,
  onDoubleClick,
}: DriveItemProps) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const handleDownload = async () => {
    await fetchAndDownloadFile(
      process.env.NEXT_PUBLIC_API_BASE_URL!,
      item.id,
      closeDropdown
    );
  };

  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
    closeDropdown();
  };

  const TypeIcon = type === "file" ? (FILE_TYPE_ICON[item.type] ?? File) : Folder;

  return (
    <>
      <TooltipProvider delayDuration={600}>
        <div
          onDoubleClick={type === "folder" ? onDoubleClick : undefined}
          className="border rounded-lg p-4 w-32 md:w-48 flex flex-col items-center gap-3 relative shadow hover:shadow-md transition-shadow"
        >
          <div className="absolute top-2 right-2">
            <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <button className="p-1 rounded cursor-pointer">
                  <MoreVertical size={15} />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="bg-muted" align="end">
                {type === "folder" ? (
                  <>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      <UpdateFolderModal folder={item} onClose={closeDropdown} />
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="text-red-500 cursor-pointer"
                      onSelect={(e) => e.preventDefault()}
                      onClick={handleDeleteClick}
                    >
                      Delete
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem onClick={handleDownload}>Download</DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={(e) => e.preventDefault()}
                      onClick={() => { setShareModalOpen(true); closeDropdown(); }}
                    >
                      Share Link
                    </DropdownMenuItem>

                    <FileActions file={item} onClose={closeDropdown} />
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="w-[80%] h-20 flex items-center justify-center rounded-lg overflow-hidden">
            {type === "file" && (item as FileItem).thumbnailUrl ? (
              <div className="relative w-full h-full">
                <Image
                  src={(item as FileItem).thumbnailUrl!}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
            ) : (
              <TypeIcon
                size={80}
                className={type === "folder" ? "text-blue-500" : "text-muted-foreground"}
              />
            )}
          </div>

          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-sm font-medium text-center w-full line-clamp-2 leading-tight" title={item.name}>
                {item.name}
              </span>
            </TooltipTrigger>
            <TooltipContent side="bottom"><p>{item.name}</p></TooltipContent>
          </Tooltip>

          {type === "file" && (item as FileItem).aiTags?.length > 0 && (
            <div className="flex flex-wrap justify-center gap-1 w-full">
              {(item as FileItem).aiTags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0 h-4">
                  {tag}
                </Badge>
              ))}
              {(item as FileItem).aiTags.length > 2 && (
                <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4">
                  +{(item as FileItem).aiTags.length - 2}
                </Badge>
              )}
            </div>
          )}

          {type === "file" && (
            <span className="text-[10px] text-muted-foreground">
              {(item.size / (1024 * 1024)).toFixed(1)} MB
            </span>
          )}
        </div>
      </TooltipProvider>

      {type === "folder" && (
        <DeleteFolderConfirmation
          open={deleteModalOpen}
          onClose={() => {
            setDeleteModalOpen(false);
            closeDropdown();
          }}
          folder={item}
        />
      )}
      {type === "file" && (
        <ShareLinkModal
          open={shareModalOpen}
          onClose={() => setShareModalOpen(false)}
          file={item}
        />
      )}
    </>
  );
}

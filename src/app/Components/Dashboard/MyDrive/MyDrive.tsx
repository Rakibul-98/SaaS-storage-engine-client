/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import {
  useGetFoldersQuery,
  useGetSingleFolderQuery,
} from "../../../redux/features/folders/folderApi";

import CreateFolderModal from "./Folder/CreateFolderModal";
import DriveGrid from "./DriveGrid";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import UploadFileModal from "./File/UploadFileModal";
import MyDriveSkeleton from "./MyDriveSkeleton";

export default function MyDrive() {
  const [folderStack, setFolderStack] = useState<
    { id: string; name: string }[]
  >([]);

  const currentFolderId =
    folderStack.length > 0 ? folderStack[folderStack.length - 1].id : null;

  const { data: rootData, isLoading: rootLoading } = useGetFoldersQuery(
    undefined,
    {
      skip: !!currentFolderId,
    },
  );

  const { data: singleFolderData, isLoading: singleLoading } =
    useGetSingleFolderQuery(currentFolderId as string, {
      skip: !currentFolderId,
    });

  const isLoading = rootLoading || singleLoading;

  const folders = currentFolderId
    ? singleFolderData?.data?.children || []
    : (rootData?.data || []).filter((f: any) => !f.parentId);

  const files = currentFolderId ? singleFolderData?.data?.files || [] : [];

  if (isLoading) return <MyDriveSkeleton />;

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row gap-5 justify-between">
        <h1 className="text-2xl font-bold">Find your folders and Files</h1>

        <div className="flex gap-5">
          {currentFolderId && (
            <UploadFileModal
              folders={rootData?.data || []}
              parentId={currentFolderId}
            />
          )}
          <CreateFolderModal
            folders={rootData?.data || []}
            parentId={currentFolderId}
          />
        </div>
      </div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              onClick={() => setFolderStack([])}
              className={
                folderStack.length === 0
                  ? "font-semibold text-foreground"
                  : "cursor-pointer"
              }
            >
              My Drive
            </BreadcrumbLink>
          </BreadcrumbItem>

          {folderStack.map((folder, index) => {
            const isLast = index === folderStack.length - 1;

            return (
              <React.Fragment key={folder.id}>
                <BreadcrumbSeparator />

                <BreadcrumbItem>
                  {isLast ? (
                    <span className="font-semibold text-foreground">
                      {folder.name}
                    </span>
                  ) : (
                    <BreadcrumbLink
                      onClick={() =>
                        setFolderStack(folderStack.slice(0, index + 1))
                      }
                      className="cursor-pointer"
                    >
                      {folder.name}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
      <DriveGrid
        folders={folders}
        files={files}
        onFolderDoubleClick={(folder) =>
          setFolderStack((prev) => [
            ...prev,
            { id: folder.id, name: folder.name },
          ])
        }
      />
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useCallback, useState } from "react";
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
import { Button } from "../../../../components/ui/button";
import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import useBreadcrumbTrail from "./useBreadcrumbTrail";
import { Input } from "../../../../components/ui/input";
import SearchResultsPanel from "./SearchResultsPanel";
import { useSearchFilesQuery } from "../../../redux/features/files/fileApi";

export default function MyDrive() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearch, setActiveSearch] = useState("");

  const currentFolderId = searchParams.get("folderId") || null;

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

  const { data: searchResults, isFetching: searchLoading } = useSearchFilesQuery(
    { q: activeSearch },
    { skip: !activeSearch }
  );

  const { data: treeData } = useGetFoldersQuery();

  const breadcrumbTrail = useBreadcrumbTrail(
    treeData?.data ?? [],
    currentFolderId
  );

  const isLoading = rootLoading || singleLoading;
  const isSearching = !!activeSearch;

  const folders = currentFolderId
    ? singleFolderData?.data?.children || []
    : (rootData?.data || []).filter((f: any) => !f.parentId);

  const files = currentFolderId ? singleFolderData?.data?.files || [] : [];

  const navigateToFolder = useCallback(
    (folderId: string | null) => {
      if (folderId) {
        router.push(`/dashboard/my-drive?folderId=${folderId}`);
      } else {
        router.push("/dashboard/my-drive");
      }
    },
    [router]
  );

  const handleSearch = useCallback(() => {
    if (searchQuery.trim()) setActiveSearch(searchQuery.trim());
  }, [searchQuery]);

  const clearSearch = () => {
    setSearchQuery("");
    setActiveSearch("");
  };

  if (isLoading) return <MyDriveSkeleton />;

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row gap-5 justify-between">
        <h1 className="text-2xl font-bold">My Drive</h1>

        <div className="flex gap-2">
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

      <div className="flex gap-2">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search files by name, tags, or content..."
            className="px-10 outline-none focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <Button onClick={handleSearch} variant="secondary" disabled={!searchQuery.trim()}>
          Search
        </Button>
      </div>


      {isSearching ? (
        <SearchResultsPanel
          results={searchResults?.data || []}
          isLoading={searchLoading}
          query={activeSearch}
          onClear={clearSearch}
        />
      ) : (
        <>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  onClick={() => navigateToFolder(null)}
                  className={
                    !currentFolderId
                      ? "font-semibold text-foreground"
                      : "cursor-pointer hover:text-foreground"
                  }
                >
                  My Drive
                </BreadcrumbLink>
              </BreadcrumbItem>

              {breadcrumbTrail.map((folder, index) => {
                const isLast = index === breadcrumbTrail.length - 1;

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
                            navigateToFolder(folder.id)}
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

          {folders.length === 0 && files.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground gap-3">
              <div className="text-5xl">📁</div>
              <p className="font-medium text-lg">
                {currentFolderId ? "This folder is empty" : "No folders yet"}
              </p>
              <p className="text-sm">
                {currentFolderId
                  ? "Upload a file to get started"
                  : "Create a folder to start organising your files"}
              </p>
            </div>
          )}

          <DriveGrid
            folders={folders}
            files={files}
            onFolderDoubleClick={(folder) =>
              navigateToFolder(folder.id)}
          />
        </>
      )}
    </div>
  );
}

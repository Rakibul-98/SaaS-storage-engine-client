/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Folder {
  id: string;
  name: string;
  userId: string;
  parentId: string | null;
  depthLevel: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FolderTree extends Folder {
  children: FolderTree[];
}

export interface FolderWithChildren extends Folder {
  children: Folder[];
  files: any[];
}

export interface CreateFolderPayload {
  name: string;
  parentId?: string | null;
}

export interface UpdateFolderPayload {
  id: string;
  name: string;
}

export interface GetFoldersResponse {
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: Folder[];
}

export interface GetFolderTreeResponse {
  success: boolean;
  message: string;
  data: FolderTree[];
}

export interface GetSingleFolderResponse {
  success: boolean;
  message: string;
  data: FolderWithChildren;
}

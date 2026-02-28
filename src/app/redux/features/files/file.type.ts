export interface FileItem {
  id: string;
  name: string;
  userId: string;
  folderId: string;
  size: number;
  type: string;
  path: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UploadFilePayload {
  file: File;
  folderId: string;
}

export interface UpdateFilePayload {
  id: string;
  name?: string;
  folderId?: string;
}

export interface FilesResponse {
  success: boolean;
  message: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
  data: FileItem[];
}

export interface SingleFileResponse {
  success: boolean;
  message: string;
  data: FileItem;
}

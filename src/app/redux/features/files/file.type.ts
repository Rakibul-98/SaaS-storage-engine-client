export interface FileItem {
  id: string;
  name: string;
  userId: string;
  folderId: string;
  size: number;
  type: "IMAGE" | "VIDEO" | "AUDIO" | "PDF" | "DOCUMENT" | "OTHER";
  mimeType: string | null;
  path: string;
  cloudinaryId: string | null;
  thumbnailUrl: string | null;
  aiTags: string[];
  aiSummary: string | null;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  shareLinks?: ShareLink[];
}

export interface ShareLink {
  id: string;
  token: string;
  fileId: string;
  expiresAt: string | null;
  maxViews: number | null;
  viewCount: number;
  isActive: boolean;
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  fileId: string | null;
  action:
    | "UPLOAD"
    | "DELETE"
    | "RESTORE"
    | "PERMANENT_DELETE"
    | "RENAME"
    | "MOVE"
    | "SHARE"
    | "DOWNLOAD";
  metadata: Record<string, unknown> | null;
  createdAt: string;
  file?: { name: string; type: string; thumbnailUrl: string | null } | null;
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

export interface CreateShareLinkPayload {
  id: string;
  expiresInHours?: number;
  maxViews?: number;
}

export interface FilesResponse {
  success: boolean;
  message: string;
  meta?: { page: number; limit: number; total: number };
  data: FileItem[];
}

export interface SingleFileResponse {
  success: boolean;
  message: string;
  data: FileItem;
}

export interface ShareLinkResponse {
  success: boolean;
  message: string;
  data: ShareLink;
}

export interface ActivityLogResponse {
  success: boolean;
  message: string;
  meta?: { page: number; limit: number; total: number };
  data: ActivityLog[];
}

export interface SearchFilesParams {
  q: string;
  page?: number;
  limit?: number;
}

export interface SharedFileResponse {
  success: boolean;
  message: string;
  data: { file: FileItem; viewCount: number };
}

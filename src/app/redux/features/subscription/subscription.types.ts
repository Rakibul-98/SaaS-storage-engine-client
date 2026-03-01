export type AllowedFileType = "IMAGE" | "PDF" | "AUDIO" | "VIDEO";

export interface CreateSubscriptionPackagePayload {
  name: string;
  maxFolders: number;
  maxLevels: number;
  allowedFileType: AllowedFileType[];
  maxFileSizeMB: number;
  fileLimit: number;
  filesPerFolder: number;
}

export interface SubscriptionPackage {
  id: string;
  name: string;
  maxFolders: number;
  maxLevels: number;
  allowedFileType: AllowedFileType[];
  maxFileSizeMB: number;
  fileLimit: number;
  filesPerFolder: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSubscriptionPackageResponse {
  success: boolean;
  message: string;
  data: SubscriptionPackage;
}

export interface GetAllPackagesResponse {
  success: boolean;
  message: string;
  data: SubscriptionPackage[];
}

export interface GetSinglePackageResponse {
  success: boolean;
  message: string;
  data: SubscriptionPackage;
}

export interface UpdateSubscriptionPackagePayload {
  id: string;
  name?: string;
  maxFolders?: number;
  maxLevels?: number;
  allowedFileType?: AllowedFileType[];
  maxFileSizeMB?: number;
  fileLimit?: number;
  filesPerFolder?: number;
}

export interface UpdateSubscriptionPackageResponse {
  success: boolean;
  message: string;
  data: SubscriptionPackage;
}

export interface DeleteSubscriptionPackageResponse {
  success: boolean;
  message: string;
  data: null;
}

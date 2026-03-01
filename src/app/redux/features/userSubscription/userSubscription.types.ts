export interface CreateSubscriptionPayload {
  subscriptionPackageId: string;
}

export interface CreateSubscriptionResponse {
  success: boolean;
  message: string;
  data: {
    count: number;
  };
}

export interface Package {
  id: string;
  name: string;
  maxFolders: number;
  maxLevels: number;
  allowedFileType: string[];
  maxFileSizeMB: number;
  fileLimit: number;
  filesPerFolder: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MySubscriptionResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    userId: string;
    packageId: string;
    startDate: string;
    endDate: string;
    isActive: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    package: Package;
  };
}

export interface SubscriptionHistoryItem {
  id: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  package: {
    id: string;
    name: string;
  };
}

export interface SubscriptionHistoryResponse {
  success: boolean;
  message: string;
  data: SubscriptionHistoryItem[];
}

export interface DashboardStatistics {
  totalFiles: number;
  totalFolders: number;
  totalStorageUsedMB: number;
  fileLimit: number;
  folderLimit: number;
  storageLimitMB: number;
  filesRemaining: number;
  foldersRemaining: number;
}

export interface DashboardStatisticsResponse {
  success: boolean;
  message: string;
  data: DashboardStatistics;
}

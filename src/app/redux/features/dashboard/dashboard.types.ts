export interface FilesByType {
  type: string;
  count: number;
}

export interface ActivityLogItem {
  id: string;
  action: string;
  createdAt: string;
  file?: { name: string; type: string; thumbnailUrl: string | null } | null;
}

export interface DashboardStatistics {
  subscription: { packageName: string; isActive: boolean };
  files: {
    total: number;
    limit: number;
    remaining: number;
    byType: FilesByType[];
  };
  folders: { total: number; limit: number; remaining: number };
  storage: {
    usedBytes: number;
    usedMB: number;
    limitMB: number;
    usedPercent: number;
  };
  recentActivity: ActivityLogItem[];
}

export interface DashboardStatisticsResponse {
  success: boolean;
  message: string;
  data: DashboardStatistics;
}

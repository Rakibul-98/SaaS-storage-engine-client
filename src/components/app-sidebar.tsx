"use client";

import {
  Home,
  HardDrive,
  Trash,
  PackageCheck,
  ReceiptText,
  FolderTree as FolderTreeIcon,
  Shield,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { useGetFolderTreeQuery } from "../app/redux/features/folders/folderApi";
import { logout } from "../app/redux/features/auth/authSlice";
import { useAppSelector } from "../app/redux/hooks";
import { toast } from "sonner";
import FolderTree from "../app/Components/Dashboard/AppSidebar/FolderTree";
import { baseApi } from "../app/redux/api/baseApi";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAppSelector((state) => state.auth);
  const { data, isLoading } = useGetFolderTreeQuery();
  const dispatch = useDispatch();
  const router = useRouter();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const handleLogout = () => {
    dispatch(logout());
    dispatch(baseApi.util.resetApiState());
    toast.success("Logged out successfully");
    router.push("/login");
  };

  // Base navigation items for all users
  const baseNavigationItems = [
    {
      title: "Dashboard",
      icon: Home,
      url: "/",
    },
    {
      title: "My Drive",
      icon: HardDrive,
      url: "/dashboard/my-drive",
    },
    {
      title: "Trashed",
      icon: Trash,
      url: "/dashboard/trash",
    },
    {
      title: "Subscriptions",
      icon: ReceiptText,
      url: "/dashboard/subscriptions",
    },
  ];

  // Admin only navigation items
  const adminNavigationItems = [
    {
      title: "Manage Subscription",
      icon: PackageCheck,
      url: "/admin/manage-subscription",
    },
  ];

  // Combine items based on user role
  const navigationItems = [
    ...baseNavigationItems,
    ...(user?.role === "ADMIN" ? adminNavigationItems : []),
  ];

  // Create a separate admin section if needed
  const hasAdminAccess = user?.role === "ADMIN";

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-2">
          <FolderTreeIcon className="h-6 w-6 text-primary" />
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="font-semibold text-lg">FileManager</span>
              {user && (
                <span className="text-xs text-muted-foreground">
                  {user.role === "ADMIN" ? "Administrator" : user.email}
                </span>
              )}
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarMenu>
            {navigationItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={isCollapsed ? item.title : undefined}
                >
                  <a href={item.url}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {hasAdminAccess && !isCollapsed && (
          <SidebarGroup>
            <SidebarGroupLabel className="flex items-center gap-1">
              <Shield className="h-3 w-3" />
              Administration
            </SidebarGroupLabel>
            <SidebarMenu>
              {adminNavigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        )}

        <SidebarGroup>
          <SidebarGroupLabel>All Folders</SidebarGroupLabel>
          <div className="px-2">
            {isLoading ? (
              <div className="space-y-2 py-2">
                <div className="h-4 w-full bg-muted animate-pulse rounded" />
                <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
                <div className="h-4 w-1/2 bg-muted animate-pulse rounded" />
              </div>
            ) : (
              data?.data && (
                <FolderTree folders={data.data} isCollapsed={isCollapsed} />
              )
            )}
          </div>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              className="bg-red-500 text-white font-medium w-full flex items-center justify-center hover:bg-red-400 rounded cursor-pointer"
            >
              <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

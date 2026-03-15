"use client";

import {
  Home,
  HardDrive,
  Trash,
  PackageCheck,
  ReceiptText,
  FolderTree as FolderTreeIcon,
  Monitor,
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
import { NavMain } from "./nav-main";
import { useGetFolderTreeQuery } from "../app/redux/features/folders/folderApi";
import { logout } from "../app/redux/features/auth/authSlice";
import { toast } from "sonner";
import FolderTree from "../app/Components/Dashboard/AppSidebar/FolderTree";
import { baseApi } from "../app/redux/api/baseApi";
import { useAppSelector } from "../app/redux/hooks";
import { jwtDecode } from "jwt-decode";

const navigationItems = [
  {
    title: "Home",
    icon: Home,
    url: "/",
  },
  {
    title: "Dashboard",
    icon: Monitor,
    url: "/dashboard",
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
  {
    title: "Manage Subscription",
    icon: PackageCheck,
    url: "/admin/manage-subscription",
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data, isLoading } = useGetFolderTreeQuery();
  const dispatch = useDispatch();
  const router = useRouter();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const { accessToken } = useAppSelector((state) => state.auth);
  const user = jwtDecode<{ name: string; role: string }>(accessToken || "");
  const handleLogout = () => {
    dispatch(logout());
    dispatch(baseApi.util.resetApiState());
    toast.success("Logged out successfully");
    router.push("/");
  };

  const filteredNavigationItems = navigationItems.filter((item) => {
    if (item.title === "Manage Subscription" && user?.role !== "ADMIN") {
      return false;
    }
    return true;
  });

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-2">
          <FolderTreeIcon className="h-6 w-6 text-primary" />
          {!isCollapsed && (
            <span className="font-semibold text-lg">FileManager</span>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={filteredNavigationItems} />

        <SidebarGroup>
          <SidebarGroupLabel>Folder Tree</SidebarGroupLabel>
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
              className="bg-red-500 text-white font-medium w-full flex items-center justify-center hover:bg-red-700 rounded hover:text-white cursor-pointer"
            >
              <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

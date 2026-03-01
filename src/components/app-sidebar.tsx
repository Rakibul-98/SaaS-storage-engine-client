"use client";

import { Home, HardDrive, Trash, PackageCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import Dashboard from "../app/Components/Dashboard/Dashboard/Dashboard";
import { useGetFolderTreeQuery } from "../app/redux/features/folders/folderApi";
import { logout } from "../app/redux/features/auth/authSlice";
import { toast } from "sonner";
import FolderTree from "../app/Components/Dashboard/AppSidebar/FolderTree";

const navItems = {
  projects: [
    {
      name: "Dashboard",
      icon: Home,
      url: "/",
      element: <Dashboard />,
    },
  ],
  navMain: [
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
      icon: PackageCheck,
      url: "/dashboard/subscriptions",
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data } = useGetFolderTreeQuery();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    router.push("/login");
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={navItems.navMain} />
        <div className="px-4">
          <h4 className="text-xs font-semibold mb-2 text-muted-foreground">
            All Folders
          </h4>

          {data?.data && <FolderTree folders={data.data} />}
        </div>
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

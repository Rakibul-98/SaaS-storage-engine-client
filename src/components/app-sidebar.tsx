"use client";

import { Home, HardDrive, Trash } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import Dashboard from "../app/Components/Dashboard/Dashboard/Dashboard";
import { useGetFolderTreeQuery } from "../app/redux/features/folders/folderApi";
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
  ],
};
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data } = useGetFolderTreeQuery();
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
        <h1>hi</h1>
      </SidebarFooter>
    </Sidebar>
  );
}

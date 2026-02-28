"use client";

import { Monitor, TextSelect, Home } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import Dashboard from "../app/Components/Dashboard/Dashboard/Dashboard";

const data = {
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
      title: "Drive",
      url: "/my-drive",
      icon: Monitor,
      isActive: true,
      items: [
        { title: "Documents", url: "/front-office/reservation" },
        {
          title: "Reports",
          url: "#",
          icon: TextSelect,
          items: [
            {
              title: "Trash Report",
              url: "/front-office/report/airport-pickup-drop",
            },
            {
              title: "Bill report",
              url: "/front-office/report/bill-adjustment-report",
            },
          ],
        },
      ],
    },
  ],
};
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>

      <SidebarFooter>
        <h1>hi</h1>
      </SidebarFooter>
    </Sidebar>
  );
}

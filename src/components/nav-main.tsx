/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

function RenderMenuItems(items: any[], isSub = false) {
  if (!items) return null;

  const Container = isSub ? SidebarMenuSub : SidebarMenu;

  return (
    <Container>
      {items.map((item) => {
        const hasChildren = item.items && item.items.length > 0;

        if (isSub) {
          return (
            <SidebarMenuSubItem key={item.title}>
              {hasChildren ? (
                <Collapsible
                  defaultOpen={item.isActive}
                  className="group/collapsible"
                >
                  <CollapsibleTrigger asChild>
                    <SidebarMenuSubButton>
                      {item.icon && <item.icon />}
                      <span className="ml-2">{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuSubButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    {RenderMenuItems(item.items, true)}
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <SidebarMenuSubButton asChild>
                  <Link href={item.url} className="flex items-center w-full">
                    {item.icon && <item.icon />}
                    <span className="ml-2">{item.title}</span>
                  </Link>
                </SidebarMenuSubButton>
              )}
            </SidebarMenuSubItem>
          );
        }

        return (
          <SidebarMenuItem key={item.title}>
            {hasChildren ? (
              <Collapsible
                defaultOpen={item.isActive}
                className="group/collapsible"
              >
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>

                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  {RenderMenuItems(item.items, true)}
                </CollapsibleContent>
              </Collapsible>
            ) : (
              <SidebarMenuButton asChild tooltip={item.title}>
                <Link href={item.url}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>
        );
      })}
    </Container>
  );
}

export function NavMain({ items }: { items: any[] }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Features</SidebarGroupLabel>
      {RenderMenuItems(items)}
    </SidebarGroup>
  );
}

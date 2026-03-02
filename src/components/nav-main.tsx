// components/nav-main.tsx
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
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  title: string;
  url?: string;
  icon?: React.ElementType;
  isActive?: boolean;
  items?: NavItem[];
}

function RenderMenuItems({
  items,
  isSub = false,
  isCollapsed = false,
}: {
  items: NavItem[];
  isSub?: boolean;
  isCollapsed?: boolean;
}) {
  const pathname = usePathname();

  if (!items || items.length === 0) return null;

  const Container = isSub ? SidebarMenuSub : SidebarMenu;

  return (
    <Container>
      {items.map((item) => {
        const hasChildren = item.items && item.items.length > 0;
        const isActive = pathname === item.url || item.isActive;

        if (isSub) {
          return (
            <SidebarMenuSubItem key={item.title}>
              {hasChildren ? (
                <Collapsible
                  defaultOpen={isActive}
                  className="group/collapsible"
                >
                  <CollapsibleTrigger asChild>
                    <SidebarMenuSubButton>
                      {item.icon && <item.icon className="h-4 w-4" />}
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto h-3 w-3 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuSubButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <RenderMenuItems
                      items={item.items || []}
                      isSub={true}
                      isCollapsed={isCollapsed}
                    />
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <SidebarMenuSubButton asChild isActive={isActive}>
                  <Link
                    href={item.url || "#"}
                    className="flex items-center w-full"
                  >
                    {item.icon && <item.icon className="h-4 w-4" />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuSubButton>
              )}
            </SidebarMenuSubItem>
          );
        }

        return (
          <SidebarMenuItem key={item.title}>
            {hasChildren ? (
              <Collapsible defaultOpen={isActive} className="group/collapsible">
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={isCollapsed ? item.title : undefined}
                  >
                    {item.icon && <item.icon className="h-4 w-4" />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto h-3 w-3 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <RenderMenuItems
                    items={item.items || []}
                    isSub={true}
                    isCollapsed={isCollapsed}
                  />
                </CollapsibleContent>
              </Collapsible>
            ) : (
              <SidebarMenuButton
                asChild
                tooltip={isCollapsed ? item.title : undefined}
                isActive={isActive}
              >
                <Link href={item.url || "#"}>
                  {item.icon && <item.icon className="h-4 w-4" />}
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

export function NavMain({ items }: { items: NavItem[] }) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Features</SidebarGroupLabel>
      <RenderMenuItems items={items} isCollapsed={isCollapsed} />
    </SidebarGroup>
  );
}

import {
    ChevronDown,
    ChevronRight,
    GitGraphIcon as Graph,
    Mail,
} from "lucide-react";

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
} from "@/components/ui/sidebar";

interface SidebarMenuItemProps {
  id: string;
  label: string;
}

interface SidebarMenuProps {
  label: string;
  items: SidebarMenuItemProps[];
}

interface SidebarProps {
  menus: {
    menus: SidebarMenuProps[];
  };
}

const CustomSidebar = ({ menus }: SidebarProps) => {
  return (
    <SidebarProvider>
      <Sidebar className="border-r border-gray-200 bg-white">
        <SidebarHeader className="p-4">
          <div className="flex items-center space-x-2">
            <Graph className="h-6 w-6 text-blue-600" />
            <h2 className="text-lg font-bold text-gray-800">
              Graph Algorithm Simulator
            </h2>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Visualize and learn graph algorithms
          </p>
        </SidebarHeader>
        <Separator />
        <SidebarContent>
          {menus.menus.map((menu, index) => (
            <SidebarGroup key={index}>
              <Collapsible>
                <CollapsibleTrigger asChild>
                  <SidebarGroupLabel className="flex items-center justify-between py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-100 cursor-pointer">
                    {menu.label}
                    <ChevronDown className="h-4 w-4" />
                  </SidebarGroupLabel>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {menu.items.map((item) => (
                        <SidebarMenuItem key={item.id}>
                          <SidebarMenuButton asChild>
                            <a
                              href={`#${item.id}`}
                              className="flex items-center py-2 px-4 text-sm text-gray-600 hover:bg-gray-100"
                            >
                              <ChevronRight className="h-4 w-4 mr-2" />
                              {item.label}
                            </a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </Collapsible>
            </SidebarGroup>
          ))}
        </SidebarContent>
        <Separator />
        <SidebarFooter className="p-4">
          <div className="text-sm text-gray-600">
            <p className="font-medium">Nguyen Ngoc Le</p>
            <div className="flex items-center mt-1">
              <Mail className="h-4 w-4 mr-1" />
              <a
                href="mailto:your.email@example.com"
                className="hover:underline"
              >
                Le.NN225353@sis.hust.edu.vn
              </a>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
};

export default CustomSidebar;

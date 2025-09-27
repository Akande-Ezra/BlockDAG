import { useNavigate, useLocation } from "react-router-dom";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/Components/ui/sidebar";

export function NavMain({ items }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => {
            const isActive = location.pathname === item.url;
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  className={`justify-start cursor-pointer transition-colors duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md"
                      : "hover:bg-slate-100"
                  }`}
                  onClick={() => navigate(item.url)}
                >
                  {item.icon && (
                    <item.icon
                      className={`${
                        isActive ? "text-white" : "text-slate-600"
                      }`}
                    />
                  )}
                  <span
                    className={`ml-2 ${
                      isActive ? "font-medium text-white" : "text-slate-700"
                    }`}
                  >
                    {item.title}
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

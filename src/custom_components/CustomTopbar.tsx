import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSidebar } from "@/components/ui/sidebar";
import { getFullName } from "@/helper/auth_helper";
import { useAuthStore } from "@/store/authStore";
import { AlignJustify, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TopBar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const { isMobile, toggleSidebar } = useSidebar();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <nav className="sticky top-0 w-full border-b-2 border-slate-200 bg-white px-4 py-2 shadow-sm">
      <div className="flex items-center justify-between">
        {isMobile ? <AlignJustify onClick={() => toggleSidebar()} /> : null}
        <div className="ml-auto flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center space-x-2 text-gray-700 border-none bg-inherit"
              >
                <User className="h-4 w-4" />
                <span>{getFullName(user)}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}

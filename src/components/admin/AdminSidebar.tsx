import { NavLink, useLocation, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  FileText,
  MessageSquare,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const logo = "/welinkyou-logo.png";

const menuItems = [
  {
    title: "Tableau de bord",
    icon: LayoutDashboard,
    path: "/dashboard/superadmin",
  },
  {
    title: "Professionnels",
    icon: Users,
    path: "/dashboard/superadmin/professionnels",
  },
  {
    title: "Demandes d'inscription",
    icon: UserPlus,
    path: "/dashboard/superadmin/demandes",
  },
  {
    title: "Documents",
    icon: FileText,
    path: "/dashboard/superadmin/documents",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    path: "/dashboard/superadmin/analytics",
  },
  {
    title: "Messages",
    icon: MessageSquare,
    path: "/dashboard/superadmin/contacts",
  },
  {
    title: "Paramètres",
    icon: Settings,
    path: "/dashboard/superadmin/parametres",
  },
];

interface AdminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export const AdminSidebar = ({ collapsed, onToggle }: AdminSidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/connexion", { replace: true });
  };

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed left-0 top-0 h-screen bg-[#0a0a0a] z-50 flex flex-col"
    >
      <div className="p-4 border-b border-white/5">
        <div className="flex flex-col items-center gap-2">
          <Link to="/">
            <img src={logo} alt="WeLinkYou" style={{ width: "180px", height: "auto" }} className="cursor-pointer hover:opacity-80 transition-opacity" />

          </Link>
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-white/80 text-sm font-medium"
              >
                Super Admin
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggle}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full gradient-vibrant text-white hover:brightness-110 shadow-lg"
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </Button>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group relative",
                isActive
                  ? "bg-[#0d3d3d] text-primary"
                  : "text-white hover:bg-white/5"
              )}
            >
              {/* Active indicator bar */}
              {isActive && (
                <motion.div
                  layoutId="adminActiveIndicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 gradient-vibrant rounded-r-full"
                />
              )}
              
              <Icon className={cn(
                "w-5 h-5 flex-shrink-0 transition-colors",
                isActive ? "text-primary" : "text-white"
              )} />
              
              <AnimatePresence mode="wait">
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="text-sm whitespace-nowrap font-bold"
                  >
                    {item.title}
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          );
        })}
      </nav>

      {/* User Profile & Logout */}
      <div className="p-4 border-t border-white/5">
        <div className={cn(
          "flex items-center gap-3",
          collapsed && "justify-center"
        )}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gradient-start/30 to-gradient-end/10 flex items-center justify-center border border-gradient-start/30">
            <span className="text-gradient-end text-sm font-bold">SA</span>
          </div>
          
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex-1 min-w-0"
              >
                <p className="text-gradient-end text-sm font-medium truncate">
                  {user ? `${user.first_name} ${user.last_name}` : "Super Admin"}
                </p>
                <p className="text-white/50 text-xs truncate">Administrateur</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={handleLogout}
          className={cn(
            "flex items-center gap-2 mt-4 text-white/60 hover:text-white cursor-pointer transition-colors w-full",
            collapsed && "justify-center"
          )}
        >
          <LogOut className="w-4 h-4" />
          {!collapsed && <span className="text-sm">Déconnexion</span>}
        </button>
      </div>
    </motion.aside>
  );
};

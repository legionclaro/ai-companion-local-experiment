import { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    LayoutDashboard,
    CheckCircle,
    Briefcase,
    Building2,
    Users,
    LogOut,
    Menu,
    X,
    Shield,
    FileText,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function AdminLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();
    const { user, signOut } = useAuth();

    const navItems = [
        {
            label: "Dashboard",
            path: "/admin",
            icon: LayoutDashboard,
        },
        {
            label: "Verificaciones",
            path: "/admin/verifications",
            icon: CheckCircle,
        },
        {
            label: "Proyectos",
            path: "/admin/projects",
            icon: Briefcase,
        },
        {
            label: "Instituciones",
            path: "/admin/institutions",
            icon: Building2,
        },
        {
            label: "Usuarios",
            path: "/admin/users",
            icon: Users,
        },
        {
            label: "Blog",
            path: "/admin/blog",
            icon: FileText,
        },
    ];

    const getInitials = (email: string) => {
        return email ? email.charAt(0).toUpperCase() : "A";
    };

    return (
        <div className="min-h-screen bg-background flex">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
          fixed lg:static inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
            >
                <div className="h-full flex flex-col">
                    {/* Logo */}
                    <div className="h-16 flex items-center px-6 border-b border-border bg-orange-500/10">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                                <Shield className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-lg font-serif font-semibold text-foreground">
                                Bio<span className="text-orange-500">RD</span> Admin
                            </span>
                        </Link>
                        <button
                            className="ml-auto lg:hidden text-muted-foreground"
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* User Info */}
                    <div className="p-6 border-b border-border">
                        <div className="flex items-center gap-3 mb-2">
                            <Avatar className="h-10 w-10">
                                <AvatarFallback className="bg-orange-500/10 text-orange-500">
                                    {getInitials(user?.email || "")}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">
                                    {user?.email || "Admin"}
                                </p>
                                <p className="text-xs text-muted-foreground">Administrador</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsSidebarOpen(false)}
                                    className={`
                    flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors
                    ${isActive
                                            ? "bg-orange-500/10 text-orange-500"
                                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                        }
                  `}
                                >
                                    <Icon className="w-4 h-4" />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Footer */}
                    <div className="p-4 border-t border-border">
                        <Button
                            variant="ghost"
                            className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => signOut()}
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Cerrar sesión
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Mobile Header */}
                <header className="h-16 lg:hidden border-b border-border flex items-center px-4 bg-card">
                    <button
                        className="text-muted-foreground p-2 -ml-2"
                        onClick={() => setIsSidebarOpen(true)}
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                    <span className="ml-3 font-semibold">Panel Admin</span>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}

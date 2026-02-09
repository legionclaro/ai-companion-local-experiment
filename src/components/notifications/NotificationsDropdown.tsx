import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { mockNotifications } from "@/data/mockNotifications";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

export default function NotificationsDropdown() {
    const unreadCount = mockNotifications.filter(n => !n.read).length;
    const recentNotifications = mockNotifications.slice(0, 5);

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case "application":
                return "📋";
            case "verification":
                return "✅";
            case "message":
                return "💬";
            case "project":
                return "📁";
            case "system":
                return "🔔";
            default:
                return "📌";
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                            {unreadCount}
                        </span>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
                <div className="flex items-center justify-between p-4 border-b">
                    <h3 className="font-semibold">Notificaciones</h3>
                    {unreadCount > 0 && (
                        <Badge variant="secondary">{unreadCount} nuevas</Badge>
                    )}
                </div>
                <div className="max-h-[400px] overflow-y-auto">
                    {recentNotifications.length === 0 ? (
                        <div className="p-8 text-center text-muted-foreground">
                            <Bell className="h-12 w-12 mx-auto mb-2 opacity-20" />
                            <p>No tienes notificaciones</p>
                        </div>
                    ) : (
                        recentNotifications.map((notification) => (
                            <Link
                                key={notification.id}
                                to={notification.link || "#"}
                                className={`block px-4 py-3 hover:bg-muted transition-colors border-b last:border-0 ${!notification.read ? "bg-blue-50/50" : ""
                                    }`}
                            >
                                <div className="flex gap-3">
                                    <div className="text-2xl">{getNotificationIcon(notification.type)}</div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">
                                            {notification.title}
                                        </p>
                                        <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                                            {notification.message}
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {formatDistanceToNow(new Date(notification.createdAt), {
                                                addSuffix: true,
                                                locale: es,
                                            })}
                                        </p>
                                    </div>
                                    {!notification.read && (
                                        <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                                    )}
                                </div>
                            </Link>
                        ))
                    )}
                </div>
                <Link
                    to="/dashboard/notifications"
                    className="block p-3 text-center text-sm text-primary hover:bg-muted border-t"
                >
                    Ver todas las notificaciones
                </Link>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

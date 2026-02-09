import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockNotifications, Notification } from "@/data/mockNotifications";
import { Button } from "@/components/ui/button";
import { CheckCheck, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function Notifications() {
    const [filter, setFilter] = useState<string>("all");

    const filteredNotifications = mockNotifications.filter((n) => {
        if (filter === "all") return true;
        if (filter === "unread") return !n.read;
        return n.type === filter;
    });

    const unreadCount = mockNotifications.filter(n => !n.read).length;

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

    const getTypeLabel = (type: string) => {
        switch (type) {
            case "application":
                return "Aplicación";
            case "verification":
                return "Verificación";
            case "message":
                return "Mensaje";
            case "project":
                return "Proyecto";
            case "system":
                return "Sistema";
            default:
                return type;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-serif mb-2">Notificaciones</h1>
                    <p className="text-muted-foreground">
                        {unreadCount > 0 ? `Tienes ${unreadCount} notificaciones sin leer` : "No tienes notificaciones pendientes"}
                    </p>
                </div>
                {unreadCount > 0 && (
                    <Button
                        variant="outline"
                        onClick={() => alert("Todas las notificaciones marcadas como leídas (Simulado)")}
                    >
                        <CheckCheck className="w-4 h-4 mr-2" />
                        Marcar todas como leídas
                    </Button>
                )}
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Todas las Notificaciones</CardTitle>
                        <div className="flex items-center gap-2">
                            <Filter className="w-4 h-4 text-muted-foreground" />
                            <Select value={filter} onValueChange={setFilter}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todas</SelectItem>
                                    <SelectItem value="unread">No leídas</SelectItem>
                                    <SelectItem value="application">Aplicaciones</SelectItem>
                                    <SelectItem value="verification">Verificaciones</SelectItem>
                                    <SelectItem value="message">Mensajes</SelectItem>
                                    <SelectItem value="project">Proyectos</SelectItem>
                                    <SelectItem value="system">Sistema</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {filteredNotifications.length === 0 ? (
                            <div className="text-center py-12 text-muted-foreground">
                                <p>No hay notificaciones para mostrar</p>
                            </div>
                        ) : (
                            filteredNotifications.map((notification) => (
                                <Link
                                    key={notification.id}
                                    to={notification.link || "#"}
                                    className={`block p-4 rounded-lg border hover:bg-muted transition-colors ${!notification.read ? "bg-blue-50/50 border-blue-200" : ""
                                        }`}
                                >
                                    <div className="flex gap-4">
                                        <div className="text-3xl">{getNotificationIcon(notification.type)}</div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <p className="font-medium">{notification.title}</p>
                                                <Badge variant="outline" className="text-xs">
                                                    {getTypeLabel(notification.type)}
                                                </Badge>
                                                {!notification.read && (
                                                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                                                )}
                                            </div>
                                            <p className="text-sm text-muted-foreground mb-2">
                                                {notification.message}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {formatDistanceToNow(new Date(notification.createdAt), {
                                                    addSuffix: true,
                                                    locale: es,
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

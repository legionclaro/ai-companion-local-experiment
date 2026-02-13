import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Briefcase, Eye, TrendingUp, Bell } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useInstitution } from "@/hooks/useInstitution";
import { useInstitutionStats } from "@/hooks/useInstitutionStats";
import { useNotifications } from "@/hooks/useNotifications";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

export default function InstitutionDashboardOverview() {
    const { user } = useAuth();
    const { data: institution, isLoading: isLoadingInst } = useInstitution(user?.id);
    const { data: stats, isLoading: isLoadingStats } = useInstitutionStats(institution?.id);
    const { data: notifications, isLoading: isLoadingNotifs } = useNotifications();

    const isLoading = isLoadingInst || isLoadingStats || isLoadingNotifs;

    const statCards = [
        {
            title: "Proyectos Activos",
            value: stats?.activeProjects || 0,
            icon: Briefcase,
            color: "text-blue-500",
            description: "Proyectos publicados",
        },
        {
            title: "Aplicaciones Recibidas",
            value: stats?.totalApplications || 0,
            icon: Users,
            color: "text-green-500",
            description: "Total de postulantes",
        },
        {
            title: "Vistas de Proyectos",
            value: stats?.projectViews || 0,
            icon: Eye,
            color: "text-purple-500",
            description: "Interés generado",
        },
    ];

    if (isLoading) {
        return (
            <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <Card key={i}>
                            <CardHeader className="pb-2">
                                <Skeleton className="h-4 w-24" />
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="h-8 w-16 mb-2" />
                                <Skeleton className="h-3 w-32" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Skeleton className="h-[300px] w-full" />
                    <Skeleton className="h-[300px] w-full" />
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-serif mb-2">Panel Institucional</h1>
                <p className="text-muted-foreground">
                    Gestione sus proyectos y revise las aplicaciones de los biólogos{institution ? ` en ${institution.name}` : ""}.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {statCards.map((stat, index) => (
                    <Card key={index}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {stat.title}
                            </CardTitle>
                            <stat.icon className={`h-4 w-4 ${stat.color}`} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                {stat.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Rendimiento de Proyectos</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[200px] flex items-center justify-center text-muted-foreground">
                        <div className="text-center">
                            <TrendingUp className="h-8 w-8 mx-auto mb-2 opacity-50" />
                            <p>Análisis de tráfico pronto disponible</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Actividad Reciente</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {notifications && notifications.length > 0 ? (
                                notifications.slice(0, 5).map((notif: any) => (
                                    <div key={notif.id} className="flex items-center gap-4 border-b last:border-0 pb-4 last:pb-0">
                                        <div className={`p-2 rounded-full ${notif.type === 'application' ? 'bg-green-100' : 'bg-blue-100'}`}>
                                            <Bell className={`h-4 w-4 ${notif.type === 'application' ? 'text-green-600' : 'text-blue-600'}`} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">{notif.title}</p>
                                            <p className="text-xs text-muted-foreground truncate">{notif.message}</p>
                                        </div>
                                        <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                                            {formatDistanceToNow(new Date(notif.created_at), { addSuffix: true, locale: es })}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-muted-foreground">
                                    <p className="text-sm">No hay actividad reciente</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

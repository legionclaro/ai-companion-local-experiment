import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Eye, CheckCircle, Clock, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageTransition from "@/components/layout/PageTransition";
import { useAuth } from "@/contexts/AuthContext";
import { useBiologist } from "@/hooks/useBiologists";
import { useMyApplications } from "@/hooks/useProjectApplications";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardOverview() {
    const { user } = useAuth();
    const { data: profile, isLoading: isProfileLoading } = useBiologist(user?.id || "");
    const { data: applications, isLoading: isAppsLoading } = useMyApplications();

    const isLoading = isProfileLoading || isAppsLoading;

    // Derived stats
    const stats = [
        {
            title: "Aplicaciones Enviadas",
            value: applications?.length || 0,
            icon: FileText,
            color: "text-blue-500",
            change: "Total histórico",
        },
        {
            title: "Vistas del Perfil",
            value: "0", // Simulated/Future feat
            icon: Eye,
            color: "text-purple-500",
            change: "Métrica pronto",
        },
        {
            title: "Proyectos Asignados",
            value: applications?.filter(a => a.status === 'accepted').length || 0,
            icon: CheckCircle,
            color: "text-green-500",
            change: "Confirmados",
        },
    ];

    if (isLoading) {
        return (
            <div className="space-y-8">
                <Skeleton className="h-10 w-64" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Skeleton className="h-32" />
                    <Skeleton className="h-32" />
                    <Skeleton className="h-32" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Skeleton className="h-64" />
                    <Skeleton className="h-64" />
                </div>
            </div>
        );
    }

    return (
        <PageTransition>
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold font-serif mb-2">Panel del Biólogo</h1>
                    <p className="text-muted-foreground">
                        Bienvenido de nuevo, {profile?.name || user?.email}. Aquí está el resumen de tu actividad.
                    </p>
                </div>

                {/* Verification Banner - Only if not verified */}
                {!profile?.verified && (
                    <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                                <UserCheck className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">Verifica tu Perfil Profesional</h3>
                                <p className="text-muted-foreground text-sm">
                                    Obtén la insignia dorada y accede a proyectos exclusivos para expertos certificados.
                                </p>
                            </div>
                        </div>
                        <Button asChild>
                            <a href="/dashboard/verify">Comenzar Verificación</a>
                        </Button>
                    </div>
                )}

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, index) => (
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
                                    {stat.change}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Two Column Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* My Applications */}
                    <Card className="col-span-1">
                        <CardHeader>
                            <CardTitle>Mis Aplicaciones</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {applications && applications.length > 0 ? (
                                    applications.slice(0, 5).map((app: any) => (
                                        <div
                                            key={app.id}
                                            className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                        >
                                            <div className="space-y-1">
                                                <p className="font-medium text-sm">{app.projects?.title}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    Aplicado: {new Date(app.applied_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <div className={`text-xs font-medium px-2 py-1 rounded ${app.status === 'Pendiente' ? 'bg-yellow-100 text-yellow-700' :
                                                app.status === 'Aceptado' ? 'bg-green-100 text-green-700' :
                                                    'bg-red-100 text-red-700'
                                                }`}>
                                                {app.status}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-muted-foreground">
                                        No has aplicado a ningún proyecto aún.
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Activity */}
                    <Card className="col-span-1">
                        <CardHeader>
                            <CardTitle>Actividad Reciente</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {applications && applications.length > 0 ? (
                                    applications.slice(0, 3).map((app: any) => (
                                        <div key={app.id} className="flex gap-4">
                                            <div className="mt-1 bg-muted p-2 rounded-full h-8 w-8 flex items-center justify-center">
                                                <Clock className="h-4 w-4 text-muted-foreground" />
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm font-medium leading-none">
                                                    Aplicación enviada
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    Para el proyecto: {app.projects?.title}
                                                </p>
                                                <p className="text-xs text-muted-foreground pt-1">
                                                    {new Date(app.applied_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-muted-foreground">
                                        No hay actividad reciente.
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </PageTransition>
    );
}

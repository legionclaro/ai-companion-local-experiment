import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Briefcase, Eye, TrendingUp } from "lucide-react";

export default function InstitutionDashboardOverview() {
    // Mock stats
    const stats = [
        {
            title: "Proyectos Activos",
            value: "3",
            icon: Briefcase,
            color: "text-blue-500",
            change: "+1 este mes",
        },
        {
            title: "Aplicaciones Recibidas",
            value: "28",
            icon: Users,
            color: "text-green-500",
            change: "+5 nuevas hoy",
        },
        {
            title: "Vistas de Proyectos",
            value: "450",
            icon: Eye,
            color: "text-purple-500",
            change: "+12% vs mes anterior",
        },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-serif mb-2">Panel Institucional</h1>
                <p className="text-muted-foreground">
                    Gestione sus proyectos y revise las aplicaciones de los biólogos.
                </p>
            </div>

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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Rendimiento de Proyectos</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[200px] flex items-center justify-center text-muted-foreground">
                        <div className="text-center">
                            <TrendingUp className="h-8 w-8 mx-auto mb-2 opacity-50" />
                            <p>Gráfico de visitas vs aplicaciones (Simulado)</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Actividad Reciente</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 border-b pb-4">
                                <div className="bg-green-100 p-2 rounded-full">
                                    <Users className="h-4 w-4 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Nueva aplicación recibida</p>
                                    <p className="text-xs text-muted-foreground">Dra. María Santos aplicó a "Inventario de Flora"</p>
                                </div>
                                <span className="ml-auto text-xs text-muted-foreground">Hace 10 min</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="bg-blue-100 p-2 rounded-full">
                                    <Briefcase className="h-4 w-4 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Proyecto publicado</p>
                                    <p className="text-xs text-muted-foreground">"Monitoreo de Aves" ya es visible</p>
                                </div>
                                <span className="ml-auto text-xs text-muted-foreground">Hace 2 horas</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

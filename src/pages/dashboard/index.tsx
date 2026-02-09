import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { projects } from "@/data/mockData";
import { FileText, Eye, CheckCircle, Clock } from "lucide-react";

export default function DashboardOverview() {
    // Mock stats
    const stats = [
        {
            title: "Aplicaciones Enviadas",
            value: "5",
            icon: FileText,
            color: "text-blue-500",
            change: "+2 este mes",
        },
        {
            title: "Vistas del Perfil",
            value: "134",
            icon: Eye,
            color: "text-purple-500",
            change: "+12% vs mes anterior",
        },
        {
            title: "Proyectos Asignados",
            value: "1",
            icon: CheckCircle,
            color: "text-green-500",
            change: "Activo ahora",
        },
    ];

    const recentActivity = [
        {
            id: 1,
            type: "application_update",
            project: "Inventario de Flora",
            status: "Entrevista Programada",
            date: "Hace 2 horas",
            icon: Clock,
        },
        {
            id: 2,
            type: "new_match",
            project: "Monitoreo de Aves",
            status: "Nuevo proyecto coincide con tu perfil",
            date: "Hace 1 día",
            icon: FileText,
        },
        {
            id: 3,
            type: "profile_view",
            institution: "The Nature Conservancy",
            status: "Vio tu perfil",
            date: "Hace 2 días",
            icon: Eye,
        },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-serif mb-2">Panel del Biólogo</h1>
                <p className="text-muted-foreground">
                    Bienvenido de nuevo. Aquí está el resumen de tu actividad.
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

            {/* Two Column Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recommended Projects */}
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Proyectos Recomendados</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {projects.slice(0, 3).map((project) => (
                                <div
                                    key={project.id}
                                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                >
                                    <div className="space-y-1">
                                        <p className="font-medium text-sm">{project.title}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {project.institution}
                                        </p>
                                    </div>
                                    <div className="text-xs font-medium text-emerald-600 bg-emerald-100 px-2 py-1 rounded">
                                        Match 95%
                                    </div>
                                </div>
                            ))}
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
                            {recentActivity.map((activity) => (
                                <div key={activity.id} className="flex gap-4">
                                    <div className="mt-1 bg-muted p-2 rounded-full h-8 w-8 flex items-center justify-center">
                                        <activity.icon className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium leading-none">
                                            {activity.project || activity.institution}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {activity.status}
                                        </p>
                                        <p className="text-xs text-muted-foreground pt-1">
                                            {activity.date}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

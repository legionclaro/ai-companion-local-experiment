import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, CheckCircle, Briefcase, TrendingUp, AlertTriangle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function AdminDashboard() {
    // Mock statistics
    const stats = [
        {
            title: "Total Usuarios",
            value: "234",
            icon: Users,
            color: "text-blue-500",
            change: "+12 esta semana",
        },
        {
            title: "Verificaciones Pendientes",
            value: "8",
            icon: AlertTriangle,
            color: "text-orange-500",
            change: "Requiere atención",
        },
        {
            title: "Proyectos Activos",
            value: "45",
            icon: Briefcase,
            color: "text-green-500",
            change: "+5 este mes",
        },
        {
            title: "Aplicaciones Totales",
            value: "189",
            icon: CheckCircle,
            color: "text-purple-500",
            change: "+23 esta semana",
        },
    ];

    // Mock chart data
    const chartData = [
        { name: "Ene", usuarios: 45, proyectos: 12 },
        { name: "Feb", usuarios: 68, proyectos: 18 },
        { name: "Mar", usuarios: 89, proyectos: 25 },
        { name: "Abr", usuarios: 112, proyectos: 32 },
        { name: "May", usuarios: 156, proyectos: 38 },
        { name: "Jun", usuarios: 234, proyectos: 45 },
    ];

    const recentActivity = [
        {
            id: 1,
            type: "new_user",
            description: "Nuevo biólogo registrado: Dra. Ana Pérez",
            time: "Hace 5 min",
        },
        {
            id: 2,
            type: "verification",
            description: "Perfil verificado: Dr. Carlos Sánchez",
            time: "Hace 15 min",
        },
        {
            id: 3,
            type: "project",
            description: "Nuevo proyecto publicado: Conservación de Arrecifes",
            time: "Hace 1 hora",
        },
        {
            id: 4,
            type: "application",
            description: "15 nuevas aplicaciones procesadas",
            time: "Hace 2 horas",
        },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-serif mb-2">Panel de Administración</h1>
                <p className="text-muted-foreground">
                    Vista general de la plataforma y actividad reciente.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                {/* Growth Chart */}
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Crecimiento de la Plataforma</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="usuarios" fill="#3b82f6" name="Usuarios" />
                                <Bar dataKey="proyectos" fill="#10b981" name="Proyectos" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Actividad Reciente</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentActivity.map((activity) => (
                                <div key={activity.id} className="flex items-start gap-4 border-b pb-3 last:border-0">
                                    <div className="mt-1 bg-muted p-2 rounded-full">
                                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">{activity.description}</p>
                                        <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
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

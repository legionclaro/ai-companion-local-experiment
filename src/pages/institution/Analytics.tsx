import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from "recharts";
import { Users, Briefcase, TrendingUp, Award, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageTransition from "@/components/layout/PageTransition";

const applicationData = [
    { name: "Ene", apps: 12 },
    { name: "Feb", apps: 19 },
    { name: "Mar", apps: 15 },
    { name: "Abr", apps: 22 },
    { name: "May", apps: 30 },
    { name: "Jun", apps: 25 },
];

const specialtyData = [
    { name: "Botánica", value: 40 },
    { name: "Zoología", value: 30 },
    { name: "Marina", value: 20 },
    { name: "Genética", value: 10 },
];

const COLORS = ["#15803d", "#166534", "#14532d", "#064e3b"];

export default function InstitutionAnalytics() {
    return (
        <PageTransition>
            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold font-serif mb-2">Análisis de Talento</h1>
                        <p className="text-muted-foreground">
                            Métricas de rendimiento y tendencias de aplicaciones institucionales.
                        </p>
                    </div>
                    <Button variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Exportar Reporte
                    </Button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard
                        title="Total Aplicantes"
                        value="128"
                        change="+14%"
                        icon={Users}
                        description="Nuevos este mes"
                    />
                    <StatCard
                        title="Proyectos Activos"
                        value="12"
                        change="+2"
                        icon={Briefcase}
                        description="En curso actualmente"
                    />
                    <StatCard
                        title="Tasa de Aceptación"
                        value="24%"
                        change="+3.2%"
                        icon={TrendingUp}
                        description="Crecimiento trimestral"
                    />
                    <StatCard
                        title="Sello de Calidad"
                        value="A+"
                        change="Top 5%"
                        icon={Award}
                        description="Rating institucional"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Application Trends */}
                    <Card className="shadow-soft border-border/50">
                        <CardHeader>
                            <CardTitle className="font-serif">Tendencia de Aplicaciones</CardTitle>
                            <CardDescription>Número de biólogos aplicando a tus proyectos por mes.</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={applicationData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "hsl(var(--card))",
                                            borderColor: "hsl(var(--border))",
                                            borderRadius: "8px"
                                        }}
                                    />
                                    <Bar dataKey="apps" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Specialty Distribution */}
                    <Card className="shadow-soft border-border/50">
                        <CardHeader>
                            <CardTitle className="font-serif">Especialidades más Demandadas</CardTitle>
                            <CardDescription>Distribución de talento por área de estudio.</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[300px] flex items-center justify-center">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={specialtyData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {specialtyData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="space-y-2 ml-4">
                                {specialtyData.map((item, index) => (
                                    <div key={item.name} className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                                        <span className="text-xs font-medium">{item.name} ({item.value}%)</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </PageTransition>
    );
}

function StatCard({ title, value, change, icon: Icon, description }: any) {
    return (
        <Card className="shadow-soft border-border/40 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-5">
                <Icon className="w-12 h-12" />
            </div>
            <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">
                        {change}
                    </span>
                </div>
                <div className="space-y-1">
                    <p className="text-sm text-muted-foreground font-medium">{title}</p>
                    <h3 className="text-2xl font-bold">{value}</h3>
                    <p className="text-xs text-muted-foreground">{description}</p>
                </div>
            </CardContent>
        </Card>
    );
}

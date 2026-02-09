import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, TrendingUp, Users, FileText, CheckCircle } from "lucide-react";

export default function Reports() {
    const handleExport = (type: string) => {
        alert(`Exportando reporte: ${type}\n(Simulado - sin backend)`);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-serif mb-2">Reportes y Estadísticas</h1>
                    <p className="text-muted-foreground">
                        Analiza el rendimiento de tus proyectos y aplicaciones
                    </p>
                </div>
                <Button onClick={() => handleExport("Reporte General")}>
                    <Download className="w-4 h-4 mr-2" />
                    Exportar Todo
                </Button>
            </div>

            {/* Statistics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-lg bg-blue-100">
                                <FileText className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Total Proyectos</p>
                                <p className="text-2xl font-bold">12</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-lg bg-green-100">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Completados</p>
                                <p className="text-2xl font-bold">8</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-lg bg-purple-100">
                                <Users className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Total Aplicaciones</p>
                                <p className="text-2xl font-bold">47</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-lg bg-orange-100">
                                <TrendingUp className="w-6 h-6 text-orange-600" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Tasa de Éxito</p>
                                <p className="text-2xl font-bold">87%</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Reports Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Reporte de Proyectos</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                            Genera un reporte detallado de todos tus proyectos incluyendo estadísticas de aplicaciones,
                            biólogos contratados, y resultados.
                        </p>
                        <div className="space-y-2">
                            <Button
                                variant="outline"
                                className="w-full justify-start"
                                onClick={() => handleExport("Proyectos Activos")}
                            >
                                <Download className="w-4 h-4 mr-2" />
                                Proyectos Activos
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full justify-start"
                                onClick={() => handleExport("Proyectos Completados")}
                            >
                                <Download className="w-4 h-4 mr-2" />
                                Proyectos Completados
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Reporte de Aplicaciones</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                            Exporta un análisis de las aplicaciones recibidas, tasas de aceptación,
                            y perfiles de los candidatos.
                        </p>
                        <div className="space-y-2">
                            <Button
                                variant="outline"
                                className="w-full justify-start"
                                onClick={() => handleExport("Aplicaciones Pendientes")}
                            >
                                <Download className="w-4 h-4 mr-2" />
                                Aplicaciones Pendientes
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full justify-start"
                                onClick={() => handleExport("Historial de Aplicaciones")}
                            >
                                <Download className="w-4 h-4 mr-2" />
                                Historial Completo
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Estadísticas Mensuales</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                            Visualiza el crecimiento y actividad mensual de tu organización en la plataforma.
                        </p>
                        <Button
                            variant="outline"
                            className="w-full justify-start"
                            onClick={() => handleExport("Estadísticas Mensuales")}
                        >
                            <Download className="w-4 h-4 mr-2" />
                            Exportar Estadísticas
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Reporte de Evaluaciones</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                            Descarga un resumen de las evaluaciones dadas y recibidas por tu institución.
                        </p>
                        <Button
                            variant="outline"
                            className="w-full justify-start"
                            onClick={() => handleExport("Evaluaciones")}
                        >
                            <Download className="w-4 h-4 mr-2" />
                            Exportar Evaluaciones
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

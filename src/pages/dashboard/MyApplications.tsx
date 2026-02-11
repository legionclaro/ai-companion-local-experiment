import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Eye, Clock, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useMyApplications } from "@/hooks/useProjectApplications";
import PageTransition from "@/components/layout/PageTransition";
import { Skeleton } from "@/components/ui/skeleton";

export default function MyApplications() {
    const { data: myApplications, isLoading } = useMyApplications();

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "pending":
                return (
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                        <Clock className="w-3 h-3 mr-1" /> Pendiente
                    </Badge>
                );
            case "accepted":
                return (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        <CheckCircle className="w-3 h-3 mr-1" /> Aceptada
                    </Badge>
                );
            case "rejected":
                return (
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        <XCircle className="w-3 h-3 mr-1" /> Rechazada
                    </Badge>
                );
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    if (isLoading) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-10 w-48" />
                <Card>
                    <CardHeader>
                        <Skeleton className="h-8 w-64" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-64 w-full" />
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <PageTransition>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold font-serif mb-2">Mis Aplicaciones</h1>
                    <p className="text-muted-foreground">
                        Gestiona el estado de tus postulaciones a proyectos.
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Historial de Aplicaciones</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {myApplications && myApplications.length > 0 ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Proyecto</TableHead>
                                        <TableHead>Institución</TableHead>
                                        <TableHead>Fecha Aplicación</TableHead>
                                        <TableHead>Estado</TableHead>
                                        <TableHead className="text-right">Acciones</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {myApplications.map((app: any) => (
                                        <TableRow key={app.id}>
                                            <TableCell className="font-medium">
                                                <Link
                                                    to={`/projects/${app.project_id}`}
                                                    className="hover:underline hover:text-primary transition-colors"
                                                >
                                                    {app.projects?.title}
                                                </Link>
                                            </TableCell>
                                            <TableCell>{app.projects?.institutions?.name}</TableCell>
                                            <TableCell>{new Date(app.applied_at).toLocaleDateString()}</TableCell>
                                            <TableCell>{getStatusBadge(app.status)}</TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="sm" asChild>
                                                    <Link to={`/projects/${app.project_id}`}>
                                                        <Eye className="w-4 h-4 mr-2" />
                                                        Ver Proyecto
                                                    </Link>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-muted-foreground mb-4">No has aplicado a ningún proyecto todavía.</p>
                                <Button asChild>
                                    <Link to="/projects">Explorar Proyectos</Link>
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </PageTransition>
    );
}

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
import { projects } from "@/data/mockData";
import { Eye, Clock, CheckCircle, XCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function MyApplications() {
    // Mock applications based on projects mock data
    const myApplications = [
        {
            id: "app-1",
            project: projects[0], // Inventario de Flora
            status: "pending",
            appliedAt: "2024-02-15",
            lastUpdate: "2024-02-16",
        },
        {
            id: "app-2",
            project: projects[2], // Monitoreo de Aves
            status: "accepted",
            appliedAt: "2024-01-20",
            lastUpdate: "2024-01-25",
        },
        {
            id: "app-3",
            project: projects[1], // Estudio de Impacto Ambiental
            status: "rejected",
            appliedAt: "2024-01-10",
            lastUpdate: "2024-01-12",
        },
    ];

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

    return (
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
                            {myApplications.map((app) => (
                                <TableRow key={app.id}>
                                    <TableCell className="font-medium">
                                        <Link
                                            to={`/projects/${app.project.id}`}
                                            className="hover:underline hover:text-primary transition-colors"
                                        >
                                            {app.project.title}
                                        </Link>
                                    </TableCell>
                                    <TableCell>{app.project.institution}</TableCell>
                                    <TableCell>{app.appliedAt}</TableCell>
                                    <TableCell>{getStatusBadge(app.status)}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm" asChild>
                                            <Link to={`/projects/${app.project.id}`}>
                                                <Eye className="w-4 h-4 mr-2" />
                                                Ver Proyecto
                                            </Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}

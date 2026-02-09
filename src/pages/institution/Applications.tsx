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
import { biologists, projects } from "@/data/mockData";
import { Check, X, Eye, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function InstitutionApplications() {
    // Mock received applications
    // In a real app, this would be fetched from supabase join tables
    const applications = [
        {
            id: "app-101",
            biologist: biologists[0], // Dra. María Santos
            project: projects[0], // Inventario de Flora
            status: "pending",
            appliedAt: "2024-02-18",
            matchScore: 98,
        },
        {
            id: "app-102",
            biologist: biologists[1], // Lic. Carlos Méndez
            project: projects[0], // Inventario de Flora
            status: "pending",
            appliedAt: "2024-02-17",
            matchScore: 85,
        },
        {
            id: "app-103",
            biologist: biologists[3], // Ing. Roberto Guzmán
            project: projects[1], // Estudio de Impacto
            status: "reviewing",
            appliedAt: "2024-02-15",
            matchScore: 92,
        },
        {
            id: "app-104",
            biologist: biologists[5], // Dr. Miguel Ángel Torres
            project: projects[0], // Inventario de Flora
            status: "rejected",
            appliedAt: "2024-02-10",
            matchScore: 60,
        },
    ];

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "pending":
                return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pendiente</Badge>;
            case "reviewing":
                return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">En Revisión</Badge>;
            case "accepted":
                return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Aceptada</Badge>;
            case "rejected":
                return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Rechazada</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold font-serif mb-2">Aplicaciones Recibidas</h1>
                <p className="text-muted-foreground">
                    Revise y evalúe a los candidatos para sus proyectos.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Candidatos Pendientes</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Candidato</TableHead>
                                <TableHead>Proyecto</TableHead>
                                <TableHead>Match</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead>Fecha</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {applications.map((app) => (
                                <TableRow key={app.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={app.biologist.photo} />
                                                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                                    {app.biologist.name.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col">
                                                <Link
                                                    to={`/biologists/${app.biologist.id}`}
                                                    className="font-medium hover:underline text-sm"
                                                >
                                                    {app.biologist.name}
                                                </Link>
                                                <span className="text-xs text-muted-foreground">{app.biologist.title}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-sm">{app.project.title}</TableCell>
                                    <TableCell>
                                        <Badge variant={app.matchScore > 90 ? "default" : "secondary"}>
                                            {app.matchScore}%
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{getStatusBadge(app.status)}</TableCell>
                                    <TableCell className="text-sm">{app.appliedAt}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" title="Ver Perfil" asChild>
                                                <Link to={`/biologists/${app.biologist.id}`}>
                                                    <Eye className="w-4 h-4" />
                                                </Link>
                                            </Button>
                                            <Button variant="ghost" size="icon" className="text-green-600 hover:text-green-700 hover:bg-green-50" title="Aceptar">
                                                <Check className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50" title="Rechazar">
                                                <X className="w-4 h-4" />
                                            </Button>
                                        </div>
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

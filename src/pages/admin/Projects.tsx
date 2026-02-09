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
import { Eye, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

export default function AdminProjects() {
    const getStatusBadge = (status: string) => {
        switch (status) {
            case "abierto":
                return <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">Abierto</Badge>;
            case "en_curso":
                return <Badge className="bg-blue-100 text-blue-800 border-blue-200">En Curso</Badge>;
            case "cerrado":
                return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Cerrado</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold font-serif mb-2">Gestión de Proyectos</h1>
                <p className="text-muted-foreground">
                    Revise y modere todos los proyectos publicados en la plataforma.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Todos los Proyectos</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Título</TableHead>
                                <TableHead>Institución</TableHead>
                                <TableHead>Tipo</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead>Vacantes</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {projects.map((project) => (
                                <TableRow key={project.id}>
                                    <TableCell className="font-medium">{project.title}</TableCell>
                                    <TableCell className="text-sm">{project.institution}</TableCell>
                                    <TableCell className="text-sm">{project.type}</TableCell>
                                    <TableCell>{getStatusBadge(project.status)}</TableCell>
                                    <TableCell className="text-sm">{project.positions}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" title="Ver" asChild>
                                                <Link to={`/projects/${project.id}`}>
                                                    <Eye className="w-4 h-4" />
                                                </Link>
                                            </Button>
                                            <Button variant="ghost" size="icon" title="Editar">
                                                <Edit className="w-4 h-4 text-blue-500" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                title="Eliminar"
                                                onClick={() => alert(`Proyecto "${project.title}" eliminado (Simulado)`)}
                                            >
                                                <Trash2 className="w-4 h-4 text-red-500" />
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

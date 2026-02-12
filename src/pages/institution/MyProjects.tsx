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
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

export default function InstitutionProjects() {
    // Filter projects for a specific institution (mocked)
    // Let's assume the current institution is "Ministerio de Medio Ambiente" for demo purposes
    // or just show all projects to demonstrate the UI
    const myProjects = projects;

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
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold font-serif mb-2">Mis Proyectos</h1>
                    <p className="text-muted-foreground">
                        Gestione sus convocatorias y proyectos de investigación.
                    </p>
                </div>
                <Button asChild>
                    <Link to="/institution/projects/new">
                        <Plus className="w-4 h-4 mr-2" />
                        Crear Proyecto
                    </Link>
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Listado de Proyectos</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Título</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead>Comienzo</TableHead>
                                <TableHead>Vacantes</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {myProjects.map((project) => (
                                <TableRow key={project.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex flex-col">
                                            <span>{project.title}</span>
                                            <span className="text-xs text-muted-foreground">{project.category}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{getStatusBadge(project.status)}</TableCell>
                                    <TableCell>{project.deadline || "N/A"}</TableCell>
                                    <TableCell>{project.vacancies}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" asChild>
                                                <Link to={`/projects/${project.id}`}>
                                                    <Eye className="w-4 h-4" />
                                                </Link>
                                            </Button>
                                            <Button variant="ghost" size="icon">
                                                <Edit className="w-4 h-4 text-blue-500" />
                                            </Button>
                                            <Button variant="ghost" size="icon">
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

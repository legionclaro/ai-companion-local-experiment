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
import { Check, Ban } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AdminInstitutions() {
    // Extract unique institutions from projects
    const institutions = Array.from(new Set(projects.map(p => p.institution))).map((institutionName, idx) => ({
        id: idx + 1,
        name: institutionName,
        projectsCount: projects.filter(p => p.institution === institutionName).length,
        status: idx % 4 === 0 ? "pending" : "verified",
        registeredAt: `2024-0${(idx % 6) + 1}-15`,
    }));

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "pending":
                return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pendiente</Badge>;
            case "verified":
                return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Verificada</Badge>;
            case "suspended":
                return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Suspendida</Badge>;
            default:
                return null;
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold font-serif mb-2">Gestión de Instituciones</h1>
                <p className="text-muted-foreground">
                    Administre las instituciones registradas en la plataforma.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Instituciones Registradas</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Proyectos</TableHead>
                                <TableHead>Fecha Registro</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {institutions.map((institution) => (
                                <TableRow key={institution.id}>
                                    <TableCell className="font-medium">{institution.name}</TableCell>
                                    <TableCell className="text-sm">{institution.projectsCount}</TableCell>
                                    <TableCell className="text-sm">{institution.registeredAt}</TableCell>
                                    <TableCell>{getStatusBadge(institution.status)}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            {institution.status === "pending" && (
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                                    title="Verificar"
                                                    onClick={() => alert(`${institution.name} verificada (Simulado)`)}
                                                >
                                                    <Check className="w-4 h-4" />
                                                </Button>
                                            )}
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                                title="Suspender"
                                                onClick={() => alert(`${institution.name} suspendida (Simulado)`)}
                                            >
                                                <Ban className="w-4 h-4" />
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

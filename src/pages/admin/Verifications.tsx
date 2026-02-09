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
import { biologists } from "@/data/mockData";
import { Check, X, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AdminVerifications() {
    // Mock pending verifications (filter biologists with pending status)
    const pendingVerifications = biologists.slice(0, 5).map((bio, idx) => ({
        ...bio,
        status: idx % 3 === 0 ? "pending" : idx % 3 === 1 ? "verified" : "rejected",
        submittedAt: `2024-02-${15 + idx}`,
    }));

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "pending":
                return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pendiente</Badge>;
            case "verified":
                return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Verificado</Badge>;
            case "rejected":
                return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Rechazado</Badge>;
            default:
                return null;
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold font-serif mb-2">Verificaciones Pendientes</h1>
                <p className="text-muted-foreground">
                    Revise y apruebe los perfiles de biólogos registrados.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Cola de Verificación</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Biólogo</TableHead>
                                <TableHead>Título</TableHead>
                                <TableHead>Fecha Registro</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {pendingVerifications.map((bio) => (
                                <TableRow key={bio.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={bio.photo} />
                                                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                                    {bio.name.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col">
                                                <span className="font-medium text-sm">{bio.name}</span>
                                                <span className="text-xs text-muted-foreground">{bio.location}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-sm">{bio.title}</TableCell>
                                    <TableCell className="text-sm">{bio.submittedAt}</TableCell>
                                    <TableCell>{getStatusBadge(bio.status)}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" title="Ver Perfil" asChild>
                                                <Link to={`/biologists/${bio.id}`}>
                                                    <Eye className="w-4 h-4" />
                                                </Link>
                                            </Button>
                                            {bio.status === "pending" && (
                                                <>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                                        title="Aprobar"
                                                        onClick={() => alert(`Perfil ${bio.name} aprobado (Simulado)`)}
                                                    >
                                                        <Check className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                                        title="Rechazar"
                                                        onClick={() => alert(`Perfil ${bio.name} rechazado (Simulado)`)}
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </Button>
                                                </>
                                            )}
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

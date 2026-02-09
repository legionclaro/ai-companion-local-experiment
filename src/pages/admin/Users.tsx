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
import { Ban, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AdminUsers() {
    // Mock users (combining biologists with fake institutions/admins)
    const users = [
        ...biologists.slice(0, 5).map((bio, idx) => ({
            id: bio.id,
            name: bio.name,
            email: `${bio.name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
            role: "biologist",
            status: idx % 3 === 0 ? "banned" : "active",
            photo: bio.photo,
            registeredAt: `2024-02-${10 + idx}`,
        })),
        {
            id: 100,
            name: "Ministerio de Medio Ambiente",
            email: "contacto@medioambiente.gob.do",
            role: "institution",
            status: "active",
            photo: "",
            registeredAt: "2024-01-15",
        },
        {
            id: 101,
            name: "Admin Principal",
            email: "admin@biord.do",
            role: "admin",
            status: "active",
            photo: "",
            registeredAt: "2023-12-01",
        },
    ];

    const getRoleBadge = (role: string) => {
        switch (role) {
            case "biologist":
                return <Badge variant="outline" className="bg-blue-50 text-blue-700">Biólogo</Badge>;
            case "institution":
                return <Badge variant="outline" className="bg-purple-50 text-purple-700">Institución</Badge>;
            case "admin":
                return <Badge variant="outline" className="bg-orange-50 text-orange-700">Admin</Badge>;
            default:
                return <Badge>{role}</Badge>;
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "active":
                return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Activo</Badge>;
            case "banned":
                return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Suspendido</Badge>;
            default:
                return null;
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold font-serif mb-2">Gestión de Usuarios</h1>
                <p className="text-muted-foreground">
                    Administre todos los usuarios registrados en la plataforma.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Todos los Usuarios</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Usuario</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Rol</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead>Fecha Registro</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-8 w-8">
                                                {user.photo ? (
                                                    <AvatarImage src={user.photo} />
                                                ) : null}
                                                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                                    {user.name.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="font-medium text-sm">{user.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-sm">{user.email}</TableCell>
                                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                                    <TableCell className="text-sm">{user.registeredAt}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            {user.status === "active" ? (
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                                    title="Suspender"
                                                    onClick={() => alert(`Usuario ${user.name} suspendido (Simulado)`)}
                                                >
                                                    <Ban className="w-4 h-4" />
                                                </Button>
                                            ) : (
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                                    title="Activar"
                                                    onClick={() => alert(`Usuario ${user.name} activado (Simulado)`)}
                                                >
                                                    <CheckCircle className="w-4 h-4" />
                                                </Button>
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

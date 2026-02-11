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
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Ban, CheckCircle, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AdminUsers() {
    // Fetch real users from Supabase
    const { data: users, isLoading } = useQuery({
        queryKey: ["admin-users"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("biologist_profiles")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;
            return data.map((profile: any) => ({
                id: profile.id,
                name: profile.name,
                email: "Ver en Dashboard Autenticación", // Email is protected in auth.users
                role: profile.experience_level ? "biologist" : "pending",
                status: "active",
                photo: profile.photo,
                registeredAt: new Date(profile.created_at).toLocaleDateString(),
            }));
        },
    });

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
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-8">
                                        <Loader2 className="h-6 w-6 animate-spin mx-auto text-primary" />
                                        <p className="text-xs text-muted-foreground mt-2">Cargando usuarios...</p>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                users?.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-8 w-8">
                                                    {user.photo ? (
                                                        <AvatarImage src={user.photo} />
                                                    ) : null}
                                                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                                        {(user.name || "U").charAt(0)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="font-medium text-sm">{user.name || "Sin nombre"}</span>
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
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}

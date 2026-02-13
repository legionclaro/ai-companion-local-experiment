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
import { Check, X, Eye, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useInstitution } from "@/hooks/useInstitution";
import { useProjectApplications, useUpdateApplicationStatus } from "@/hooks/useProjectApplications";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export default function InstitutionApplications() {
    const { user } = useAuth();
    const { data: institution, isLoading: isLoadingInst } = useInstitution(user?.id);
    const { data: applications, isLoading: isLoadingApps } = useProjectApplications(undefined, institution?.id);
    const updateStatus = useUpdateApplicationStatus();

    const handleUpdateStatus = async (appId: string, status: "accepted" | "rejected") => {
        try {
            await updateStatus.mutateAsync({
                applicationId: appId,
                status: status
            });
            toast.success(`Aplicación ${status === "accepted" ? "aceptada" : "rechazada"} con éxito`);
        } catch (error: any) {
            toast.error("Error al actualizar estado: " + error.message);
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "pending":
                return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pendiente</Badge>;
            case "accepted":
                return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Aceptada</Badge>;
            case "rejected":
                return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Rechazada</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    const isLoading = isLoadingInst || isLoadingApps;

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
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold font-serif mb-2">Aplicaciones Recibidas</h1>
                <p className="text-muted-foreground">
                    Revise y evalúe a los candidatos para sus proyectos{institution ? ` en ${institution.name}` : ""}.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Historial de Aplicaciones</CardTitle>
                </CardHeader>
                <CardContent>
                    {applications && applications.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Candidato</TableHead>
                                    <TableHead>Proyecto</TableHead>
                                    <TableHead>Estado</TableHead>
                                    <TableHead>Fecha</TableHead>
                                    <TableHead className="text-right">Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {applications.map((app: any) => (
                                    <TableRow key={app.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage src={app.biologist_profiles?.photo} />
                                                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                                        {(app.biologist_profiles?.name || "B").charAt(0)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex flex-col">
                                                    <Link
                                                        to={`/biologists/${app.biologist_id}`}
                                                        className="font-medium hover:underline text-sm"
                                                    >
                                                        {app.biologist_profiles?.name}
                                                    </Link>
                                                    <span className="text-xs text-muted-foreground">{app.biologist_profiles?.title}</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-sm">{app.projects?.title}</TableCell>
                                        <TableCell>{getStatusBadge(app.status)}</TableCell>
                                        <TableCell className="text-sm">{new Date(app.applied_at).toLocaleDateString()}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost" size="icon" title="Ver Perfil" asChild>
                                                    <Link to={`/biologists/${app.biologist_id}`}>
                                                        <Eye className="w-4 h-4" />
                                                    </Link>
                                                </Button>
                                                {app.status === "pending" && (
                                                    <>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                                            title="Aceptar"
                                                            onClick={() => handleUpdateStatus(app.id, "accepted")}
                                                            disabled={updateStatus.isPending}
                                                        >
                                                            <Check className="w-4 h-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                                            title="Rechazar"
                                                            onClick={() => handleUpdateStatus(app.id, "rejected")}
                                                            disabled={updateStatus.isPending}
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </Button>
                                                    </>
                                                )}
                                                {updateStatus.isPending && (
                                                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground">Aún no has recibido aplicaciones para tus proyectos.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

import { useParams, Link } from "react-router-dom";
import { projects, specialtyLabels } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Users, Briefcase, ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ProjectDetail() {
    const { id } = useParams<{ id: string }>();
    const project = projects.find((p) => p.id === id);

    if (!project) {
        return (
            <div className="min-h-screen flex flex-col bg-background">
                <Navbar />
                <main className="flex-grow container mx-auto px-4 py-8 mt-16 flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4">Proyecto no encontrado</h2>
                        <Button asChild>
                            <Link to="/projects">Volver al banco de proyectos</Link>
                        </Button>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "abierto":
                return "bg-emerald-100 text-emerald-800 border-emerald-200";
            case "en_curso":
                return "bg-blue-100 text-blue-800 border-blue-200";
            case "cerrado":
                return "bg-gray-100 text-gray-800 border-gray-200";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar />

            <main className="flex-grow container mx-auto px-4 py-8 mt-16">
                <Button variant="ghost" className="mb-6 pl-0 hover:pl-2 transition-all" asChild>
                    <Link to="/projects">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Volver a proyectos
                    </Link>
                </Button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-card rounded-xl p-8 border border-border shadow-sm">
                            <div className="flex flex-wrap gap-2 mb-4">
                                <Badge className={`${getStatusColor(project.status)}`}>
                                    {project.status.replace("_", " ").toUpperCase()}
                                </Badge>
                                <Badge variant="outline" className="uppercase">
                                    {project.type.replace("_", " ")}
                                </Badge>
                            </div>

                            <h1 className="text-3xl font-bold font-serif mb-4 text-foreground">
                                {project.title}
                            </h1>

                            <div className="flex items-center text-lg text-primary font-medium mb-6">
                                <Briefcase className="w-5 h-5 mr-2" />
                                {project.institution}
                            </div>

                            <div className="prose max-w-none text-muted-foreground">
                                <p className="text-lg leading-relaxed">{project.description}</p>
                            </div>
                        </div>

                        <div className="bg-card rounded-xl p-8 border border-border shadow-sm">
                            <h2 className="text-xl font-bold font-serif mb-6">Requisitos</h2>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-semibold mb-3">Perfiles Requeridos</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.profileRequired.map((spec) => (
                                            <Badge key={spec} variant="secondary" className="text-base px-4 py-1">
                                                {specialtyLabels[spec]}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-semibold mb-3">Roles a Desempeñar</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.rolesNeeded.map((role) => (
                                            <Badge key={role} variant="outline" className="text-base px-4 py-1 capitalize">
                                                {role}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-card rounded-xl p-6 border border-border shadow-sm sticky top-24">
                            <h3 className="font-bold text-lg mb-6 border-b border-border pb-2">
                                Detalles del Proyecto
                            </h3>

                            <div className="space-y-5 mb-8">
                                <div className="flex items-center">
                                    <MapPin className="w-5 h-5 mr-3 text-primary" />
                                    <div>
                                        <p className="text-sm font-medium text-foreground">Ubicación</p>
                                        <p className="text-sm text-muted-foreground">{project.location}</p>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <Calendar className="w-5 h-5 mr-3 text-primary" />
                                    <div>
                                        <p className="text-sm font-medium text-foreground">Duración</p>
                                        <p className="text-sm text-muted-foreground">{project.duration}</p>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <Users className="w-5 h-5 mr-3 text-primary" />
                                    <div>
                                        <p className="text-sm font-medium text-foreground">Vacantes</p>
                                        <p className="text-sm text-muted-foreground">{project.positions} disponibles</p>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <div className={`w-3 h-3 rounded-full mr-4 ml-1 ${project.fundingConfirmed ? 'bg-green-500' : 'bg-yellow-500'}`} />
                                    <div>
                                        <p className="text-sm font-medium text-foreground">Financiamiento</p>
                                        <p className="text-sm text-muted-foreground">
                                            {project.fundingConfirmed ? 'Confirmado' : 'Pendiente'}
                                        </p>
                                    </div>
                                </div>

                                {project.deadline && (
                                    <div className="bg-muted/50 p-3 rounded-md text-sm text-center">
                                        <span className="font-semibold">Fecha límite:</span> {project.deadline}
                                    </div>
                                )}
                            </div>

                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button className="w-full text-lg py-6" size="lg">
                                        Aplicar al Proyecto
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Aplicar a {project.title}</DialogTitle>
                                        <DialogDescription>
                                            Envía tu perfil para este proyecto. La institución revisará tu solicitud.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4 py-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="cover-letter">Carta de Presentación (Breve)</Label>
                                            <Textarea
                                                id="cover-letter"
                                                placeholder="Explica brevemente por qué eres ideal para este proyecto..."
                                                className="h-32"
                                            />
                                        </div>
                                    </div>
                                    <Button className="w-full" onClick={() => alert("¡Solicitud enviada (Simulación)!")}>
                                        Confirmar Aplicación
                                    </Button>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
    Calendar,
    MapPin,
    Clock,
    Users,
    Tag,
    ArrowLeft,
    Briefcase,
    Globe,
    FileText,
    CheckCircle2,
    Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import PageTransition from "@/components/layout/PageTransition";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useProject } from "@/hooks/useProjects";
import { useApplyToProject } from "@/hooks/useProjectApplications";
import { Skeleton } from "@/components/ui/skeleton";
import SEO from "@/components/common/SEO";
import { toast } from "sonner";

export default function ProjectDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: project, isLoading } = useProject(id || "") as { data: any, isLoading: boolean };
    const applyToProject = useApplyToProject();

    const [coverLetter, setCoverLetter] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleApply = async () => {
        if (!id) return;

        try {
            await applyToProject.mutateAsync({
                projectId: id,
                coverLetter: coverLetter
            });
            toast.success("¡Aplicación enviada con éxito!");
            setIsDialogOpen(false);
            setCoverLetter("");
        } catch (error: any) {
            toast.error("Error al enviar la aplicación: " + error.message);
        }
    };

    if (!isLoading && !project) {
        // ... rest of component
    }

    if (isLoading) {
        // ... rest of component
    }

    return (
        <div className="min-h-screen bg-background flex flex-col pt-16">
            <SEO title={project.title || "Proyecto"} description={project.description || ""} />
            <Navbar />
            <PageTransition
                title={project.title || "Proyecto"}
                description={`Proyecto de biodiversidad en BioRD: ${(project.description || "").substring(0, 150)}...`}
            >
                <main className="flex-grow container mx-auto px-4 py-12">
                    <Button variant="ghost" className="mb-6 pl-0 hover:pl-2 transition-all" asChild>
                        <Link to="/projects">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Explorar Proyectos
                        </Link>
                    </Button>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <Badge variant="secondary" className="px-3 py-1 text-sm font-medium">
                                        {project.category}
                                    </Badge>
                                    <span className="text-sm text-muted-foreground flex items-center">
                                        <Clock className="w-4 h-4 mr-1" />
                                        Publicado recientemente
                                    </span>
                                </div>
                                <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6 leading-tight">
                                    {project.title}
                                </h1>
                            </div>

                            <div className="bg-card rounded-2xl p-8 border border-border shadow-sm">
                                <h2 className="text-2xl font-bold font-serif mb-6">Descripción del Proyecto</h2>
                                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap text-lg">
                                    {project.description}
                                </p>
                            </div>

                            <div className="bg-card rounded-2xl p-8 border border-border shadow-sm">
                                <h2 className="text-2xl font-bold font-serif mb-6">Categoría</h2>
                                <div className="flex flex-wrap gap-3">
                                    <Badge variant="outline" className="px-4 py-2 text-base font-medium uppercase tracking-wider">
                                        {project.category}
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-card rounded-2xl p-8 border border-border shadow-sm sticky top-24">
                                <div className="space-y-6 mb-8">
                                    <div className="flex items-center justify-between font-serif">
                                        <span className="text-muted-foreground">Institución</span>
                                        <span className="font-bold">{project.institution}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground flex items-center">
                                            <MapPin className="w-4 h-4 mr-2" /> Ubicación
                                        </span>
                                        <span className="font-medium">{project.location}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground flex items-center">
                                            <Users className="w-4 h-4 mr-2" /> Vacantes
                                        </span>
                                        <span className="font-medium">{project.vacancies} disponibles</span>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Progreso Presupuestario</span>
                                            <span className="font-medium">{project.budget_progress}%</span>
                                        </div>
                                        <Progress value={project.budget_progress} className="h-2" />
                                    </div>
                                </div>

                                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                    <DialogTrigger asChild>
                                        <Button className="w-full text-lg h-14 shadow-md hover:shadow-lg transition-all" size="lg">
                                            Aplicar al Proyecto
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[525px]">
                                        <DialogHeader>
                                            <DialogTitle className="text-2xl font-serif">Enviar Aplicación</DialogTitle>
                                            <DialogDescription>
                                                Cuéntale a {project.institution} por qué eres el candidato ideal para este proyecto.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="message">Carta de Motivación</Label>
                                                <Textarea
                                                    id="message"
                                                    placeholder="Describe tu experiencia relevante..."
                                                    className="h-32"
                                                    value={coverLetter}
                                                    onChange={(e) => setCoverLetter(e.target.value)}
                                                />
                                            </div>
                                            <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg border border-primary/10">
                                                <CheckCircle2 className="w-5 h-5 text-primary" />
                                                <span className="text-sm">Se enviará tu perfil verificado automáticamente.</span>
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button
                                                type="submit"
                                                className="w-full"
                                                onClick={handleApply}
                                                disabled={applyToProject.isPending || !coverLetter.trim()}
                                            >
                                                {applyToProject.isPending ? (
                                                    <>
                                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                        Enviando...
                                                    </>
                                                ) : (
                                                    "Confirmar Aplicación"
                                                )}
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>

                                <div className="mt-8 pt-8 border-t border-border space-y-4">
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                        <Globe className="w-4 h-4" />
                                        <span>Modalidad: {project.modality}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                        <FileText className="w-4 h-4" />
                                        <span>Estado: {project.status}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </PageTransition>
            <Footer />
        </div>
    );
}

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { specialtyLabels } from "@/data/mockData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Calendar, Users, Briefcase } from "lucide-react";
import Navbar from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useProjects } from "@/hooks/useProjects";
import SEO from "@/components/common/SEO";
import { Skeleton } from "@/components/ui/skeleton";
import PageTransition from "@/components/layout/PageTransition";

export default function Projects() {
    const navigate = useNavigate();
    const { data: fetchedProjects, isLoading } = useProjects();

    const [searchTerm, setSearchTerm] = useState("");
    const [typeFilter, setTypeFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const [modalityFilter, setModalityFilter] = useState("all");

    const filteredProjects = (fetchedProjects || []).filter((project) => {
        const title = project.title || "";
        const description = project.description || "";
        const institution = project.institution || "";

        const matchesSearch =
            title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            institution.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesType = typeFilter === "all" || project.category === typeFilter;
        const matchesStatus = statusFilter === "all" || project.status === statusFilter;
        const matchesModality = modalityFilter === "all" || project.modality === modalityFilter;

        return matchesSearch && matchesType && matchesStatus && matchesModality;
    });

    const getStatusColor = (status: string) => {
        switch (status?.toLowerCase()) {
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

    const getStatusLabel = (status: string) => {
        switch (status?.toLowerCase()) {
            case "abierto":
                return "Abierto";
            case "en_curso":
                return "En Curso";
            case "cerrado":
                return "Cerrado";
            default:
                return status;
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <SEO title="Banco de Proyectos" description="Explora oportunidades científicas en República Dominicana." />
            <Navbar />

            <PageTransition
                title="Banco de Proyectos"
                description="Explora oportunidades de investigación, consultoría y conservación en todo el país."
            >
                <main className="flex-grow container mx-auto px-4 py-8 mt-16">
                    <div className="mb-8 text-center">
                        <h1 className="text-4xl font-bold font-serif text-primary mb-4">
                            Banco de Proyectos
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Explora oportunidades de investigación, consultoría y conservación en todo el país.
                        </p>
                    </div>

                    {/* Filters Section */}
                    <div className="bg-card p-6 rounded-lg shadow-sm border border-border/50 mb-8 sticky top-20 z-10 backdrop-blur-md bg-opacity-95">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="relative md:col-span-1">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Buscar proyectos..."
                                    className="pl-10"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            <Select value={typeFilter} onValueChange={setTypeFilter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Tipo de Proyecto" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todos los tipos</SelectItem>
                                    <SelectItem value="conservación">Conservación</SelectItem>
                                    <SelectItem value="impacto_ambiental">Impacto Ambiental</SelectItem>
                                    <SelectItem value="inventario">Inventario</SelectItem>
                                    <SelectItem value="académico">Académico</SelectItem>
                                    <SelectItem value="ong">ONG</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Estado" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todos los estados</SelectItem>
                                    <SelectItem value="abierto">Abierto</SelectItem>
                                    <SelectItem value="en_curso">En Curso</SelectItem>
                                    <SelectItem value="cerrado">Cerrado</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select value={modalityFilter} onValueChange={setModalityFilter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Modalidad" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todas las modalidades</SelectItem>
                                    <SelectItem value="campo">Campo</SelectItem>
                                    <SelectItem value="remoto">Remoto</SelectItem>
                                    <SelectItem value="híbrido">Híbrido</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Results Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {isLoading ? (
                            Array(4).fill(0).map((_, i) => (
                                <Card key={i} className="overflow-hidden border-border/50 p-6 space-y-4">
                                    <div className="flex justify-between">
                                        <Skeleton className="h-6 w-20" />
                                        <Skeleton className="h-6 w-24" />
                                    </div>
                                    <Skeleton className="h-7 w-3/4" />
                                    <Skeleton className="h-4 w-1/2" />
                                    <Skeleton className="h-16 w-full" />
                                    <div className="grid grid-cols-2 gap-4">
                                        <Skeleton className="h-4 w-24" />
                                        <Skeleton className="h-4 w-24" />
                                    </div>
                                </Card>
                            ))
                        ) : (
                            filteredProjects.map((project) => (
                                <div
                                    key={project.id}
                                    className="bg-card rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group flex flex-col"
                                >
                                    <div className="p-6 flex flex-col h-full">
                                        <div className="flex justify-between items-start mb-4">
                                            <Badge className={`${getStatusColor(project.status)} pointer-events-none`}>
                                                {getStatusLabel(project.status)}
                                            </Badge>
                                            <span className="text-sm font-medium text-muted-foreground bg-secondary px-2 py-1 rounded">
                                                {(project.category || 'PROYECTO').replace("_", " ").toUpperCase()}
                                            </span>
                                        </div>

                                        <Link to={`/projects/${project.id}`} className="block mb-2">
                                            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                                                {project.title}
                                            </h3>
                                        </Link>

                                        <div className="flex items-center text-sm text-primary font-medium mb-4">
                                            <Briefcase className="w-4 h-4 mr-2" />
                                            {project.institution}
                                        </div>

                                        <p className="text-muted-foreground text-sm mb-6 line-clamp-2">
                                            {project.description}
                                        </p>

                                        <div className="grid grid-cols-2 gap-y-2 text-sm text-muted-foreground mb-6">
                                            <div className="flex items-center">
                                                <MapPin className="w-4 h-4 mr-2" />
                                                {project.location}
                                            </div>
                                            <div className="flex items-center">
                                                <Calendar className="w-4 h-4 mr-2" />
                                                {project.duration || 'Flexible'}
                                            </div>
                                            <div className="flex items-center">
                                                <Users className="w-4 h-4 mr-2" />
                                                {project.vacancies} vacantes
                                            </div>
                                            <div className="flex items-center">
                                                <div className={`w-2 h-2 rounded-full mr-2 ${project.budget_progress > 0 ? 'bg-green-500' : 'bg-yellow-500'}`} />
                                                {project.budget_progress > 0 ? 'Fondos Confirmados' : 'Presupuesto Abierto'}
                                            </div>
                                        </div>

                                        <div className="mt-auto pt-4 border-t border-border flex justify-between items-center">
                                            <div className="flex flex-wrap gap-2">
                                                <Badge variant="outline" className="bg-background text-[10px] uppercase">
                                                    {project.category}
                                                </Badge>
                                            </div>

                                            <Button variant="outline" size="sm" onClick={() => navigate(`/projects/${project.id}`)}>
                                                Ver Detalles
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {!isLoading && filteredProjects.length === 0 && (
                        <div className="text-center py-12">
                            <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                                No se encontraron proyectos
                            </h3>
                            <p className="text-muted-foreground">
                                Intenta ajustar tus filtros de búsqueda.
                            </p>
                            <Button
                                variant="link"
                                onClick={() => {
                                    setSearchTerm("");
                                    setTypeFilter("all");
                                    setStatusFilter("all");
                                    setModalityFilter("all");
                                }}
                                className="mt-4"
                            >
                                Limpiar filtros
                            </Button>
                        </div>
                    )}
                </main>
            </PageTransition>

            <Footer />
        </div>
    );
}

// Inline card for skeleton reuse
function Card({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={`bg-card rounded-xl border border-border shadow-sm ${className}`}>
            {children}
        </div>
    );
}

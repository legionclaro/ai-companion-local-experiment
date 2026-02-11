import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { specialtyLabels, availabilityLabels } from "@/data/mockData";
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
import { Search, MapPin, Award, BookOpen, CheckCircle2, Filter } from "lucide-react";
import Navbar from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";
import { useBiologists } from "@/hooks/useBiologists";
import { Card, CardContent } from "@/components/ui/card";
import SEO from "@/components/common/SEO";
import { Skeleton } from "@/components/ui/skeleton";

export default function Biologists() {
    const navigate = useNavigate();
    const { data: fetchedBiologists, isLoading } = useBiologists();

    const [searchTerm, setSearchTerm] = useState("");
    const [specialtyFilter, setSpecialtyFilter] = useState("all");
    const [availabilityFilter, setAvailabilityFilter] = useState("all");

    const filteredBiologists = (fetchedBiologists || []).filter((biologist) => {
        const name = biologist.name || "";
        const title = biologist.title || "";
        const bio = biologist.bio || "";
        const specialties = biologist.specialties || [];

        const matchesSearch =
            name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            bio.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesSpecialty =
            specialtyFilter === "all" ||
            specialties.includes(specialtyFilter as any);

        const matchesAvailability =
            availabilityFilter === "all" || biologist.availability === availabilityFilter;

        return matchesSearch && matchesSpecialty && matchesAvailability;
    });

    const handleViewProfile = (id: string) => {
        navigate(`/biologists/${id}`);
    };

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <SEO title="Directorio de Biólogos" description="Encuentra los mejores profesionales de la biodiversidad en República Dominicana." />
            <Navbar />

            <PageTransition
                title="Directorio de Biólogos Elite"
                description="Conecta con los mejores científicos y especialistas en biodiversidad de la República Dominicana."
            >
                <main className="flex-grow container mx-auto px-4 py-8 mt-16">
                    <div className="mb-8 text-center">
                        <h1 className="text-4xl font-bold font-serif text-primary mb-4">
                            Directorio de Biólogos
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Encuentra profesionales calificados para tus proyectos de investigación y conservación en República Dominicana.
                        </p>
                    </div>

                    {/* Filters Section */}
                    <div className="bg-card p-6 rounded-lg shadow-sm border border-border/50 mb-8 sticky top-20 z-10 backdrop-blur-md bg-opacity-95">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="relative md:col-span-2">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Buscar por nombre, título o especialidad..."
                                    className="pl-10"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Especialidad" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todas las especialidades</SelectItem>
                                    {Object.entries(specialtyLabels).map(([key, label]) => (
                                        <SelectItem key={key} value={key}>
                                            {label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Disponibilidad" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Cualquier disponibilidad</SelectItem>
                                    {Object.entries(availabilityLabels).map(([key, label]) => (
                                        <SelectItem key={key} value={key}>
                                            {label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Results Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {isLoading ? (
                            Array(6).fill(0).map((_, i) => (
                                <Card key={i} className="overflow-hidden border-border/50">
                                    <CardContent className="p-0">
                                        <div className="p-6 space-y-4">
                                            <div className="flex items-start gap-4">
                                                <Skeleton className="w-16 h-16 rounded-full" />
                                                <div className="flex-1 space-y-2">
                                                    <Skeleton className="h-5 w-3/4" />
                                                    <Skeleton className="h-4 w-1/2" />
                                                </div>
                                            </div>
                                            <Skeleton className="h-4 w-full" />
                                            <Skeleton className="h-4 w-5/6" />
                                            <div className="flex gap-2">
                                                <Skeleton className="h-6 w-16" />
                                                <Skeleton className="h-6 w-16" />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            filteredBiologists.map((biologist) => (
                                <Card
                                    key={biologist.id}
                                    className="group overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg cursor-pointer flex flex-col h-full"
                                    onClick={() => handleViewProfile(biologist.id)}
                                >
                                    <CardContent className="p-0 flex flex-col flex-grow">
                                        <div className="p-6 flex-grow">
                                            <div className="flex items-start gap-4 mb-4">
                                                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 overflow-hidden ring-2 ring-background group-hover:ring-primary/20 transition-all">
                                                    {biologist.photo ? (
                                                        <img src={biologist.photo} alt={biologist.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <Award className="w-8 h-8" />
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-1 mb-1">
                                                        <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">
                                                            {biologist.name}
                                                        </h3>
                                                        {biologist.verified && (
                                                            <CheckCircle2 className="w-4 h-4 text-blue-500 fill-blue-50" />
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-muted-foreground leading-snug">
                                                        {biologist.title}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <p className="text-sm text-muted-foreground line-clamp-3 italic">
                                                    "{biologist.bio}"
                                                </p>

                                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                    <MapPin className="w-3 h-3" />
                                                    {biologist.location}
                                                </div>

                                                <div className="flex flex-wrap gap-1.5 pt-1">
                                                    {(biologist.specialties || []).slice(0, 3).map((spec: string) => (
                                                        <Badge key={spec} variant="secondary" className="bg-slate-50 text-[10px] uppercase font-bold tracking-tight px-1.5 py-0">
                                                            {specialtyLabels[spec] || spec}
                                                        </Badge>
                                                    ))}
                                                    {(biologist.specialties || []).length > 3 && (
                                                        <span className="text-[10px] text-muted-foreground font-medium pl-1">
                                                            +{(biologist.specialties || []).length - 3}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="px-6 py-4 bg-slate-50 border-t border-border/50 flex items-center justify-between mt-auto">
                                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                                {biologist.years_experience} años exp.
                                            </span>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="h-8 text-xs font-bold border-slate-200 hover:bg-white"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleViewProfile(biologist.id);
                                                }}
                                            >
                                                Ver Perfil
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </div>

                    {!isLoading && filteredBiologists.length === 0 && (
                        <div className="text-center py-12">
                            <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                                No se encontraron biólogos
                            </h3>
                            <p className="text-muted-foreground">
                                Intenta ajustar tus filtros de búsqueda.
                            </p>
                            <Button
                                variant="link"
                                onClick={() => {
                                    setSearchTerm("");
                                    setSpecialtyFilter("all");
                                    setAvailabilityFilter("all");
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

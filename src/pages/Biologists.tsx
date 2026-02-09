import { useState } from "react";
import { Link } from "react-router-dom";
import { biologists, specialtyLabels, availabilityLabels } from "@/data/mockData";
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
import { Search, MapPin, Award, BookOpen } from "lucide-react";
import Navbar from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function Biologists() {
    const [searchTerm, setSearchTerm] = useState("");
    const [specialtyFilter, setSpecialtyFilter] = useState("all");
    const [availabilityFilter, setAvailabilityFilter] = useState("all");

    const filteredBiologists = biologists.filter((biologist) => {
        const matchesSearch =
            biologist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            biologist.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            biologist.bio.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesSpecialty =
            specialtyFilter === "all" ||
            biologist.specialties.includes(specialtyFilter as any);

        const matchesAvailability =
            availabilityFilter === "all" || biologist.availability === availabilityFilter;

        return matchesSearch && matchesSpecialty && matchesAvailability;
    });

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar />

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
                    {filteredBiologists.map((biologist) => (
                        <Link
                            key={biologist.id}
                            to={`/biologists/${biologist.id}`}
                            className="group block"
                        >
                            <div className="bg-card rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                                            {biologist.name.charAt(0)}
                                        </div>
                                        {biologist.verified && (
                                            <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
                                                Verificado
                                            </Badge>
                                        )}
                                    </div>

                                    <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                                        {biologist.name}
                                    </h3>
                                    <p className="text-sm font-medium text-primary mb-3">
                                        {biologist.title}
                                    </p>

                                    <div className="flex items-center text-sm text-muted-foreground mb-4">
                                        <MapPin className="w-4 h-4 mr-1" />
                                        {biologist.location}
                                    </div>

                                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                                        {biologist.bio}
                                    </p>

                                    <div className="mt-auto">
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {biologist.specialties.slice(0, 3).map((spec) => (
                                                <Badge key={spec} variant="outline" className="bg-background">
                                                    {specialtyLabels[spec]}
                                                </Badge>
                                            ))}
                                            {biologist.specialties.length > 3 && (
                                                <Badge variant="outline" className="bg-background">
                                                    +{biologist.specialties.length - 3}
                                                </Badge>
                                            )}
                                        </div>

                                        <div className="flex justify-between items-center text-sm border-t border-border pt-4">
                                            <span className="flex items-center text-muted-foreground">
                                                <Award className="w-4 h-4 mr-1" />
                                                {biologist.yearsExperience} años exp.
                                            </span>
                                            <span className="flex items-center text-muted-foreground">
                                                <BookOpen className="w-4 h-4 mr-1" />
                                                {biologist.projectsCompleted} proyectos
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {filteredBiologists.length === 0 && (
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

            <Footer />
        </div>
    );
}

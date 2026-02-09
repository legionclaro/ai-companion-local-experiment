import { useParams, Link } from "react-router-dom";
import { biologists, specialtyLabels } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Award, BookOpen, Mail, Building, ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ReviewsSection from "@/components/reviews/ReviewsSection";

export default function BiologistProfile() {
    const { id } = useParams<{ id: string }>();
    const biologist = biologists.find((b) => b.id === id);

    if (!biologist) {
        return (
            <div className="min-h-screen flex flex-col bg-background">
                <Navbar />
                <main className="flex-grow container mx-auto px-4 py-8 mt-16 flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4">Biólogo no encontrado</h2>
                        <Button asChild>
                            <Link to="/biologists">Volver al directorio</Link>
                        </Button>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar />

            <main className="flex-grow container mx-auto px-4 py-8 mt-16">
                <Button variant="ghost" className="mb-6 pl-0 hover:pl-2 transition-all" asChild>
                    <Link to="/biologists">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Volver al directorio
                    </Link>
                </Button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Sidebar Info */}
                    <div className="lg:col-span-1">
                        <div className="bg-card rounded-xl p-6 border border-border sticky top-24">
                            <div className="flex flex-col items-center text-center mb-6">
                                <Avatar className="w-32 h-32 mb-4 border-4 border-background shadow-lg">
                                    <AvatarImage src={biologist.photo} alt={biologist.name} />
                                    <AvatarFallback className="bg-primary/10 text-primary text-4xl">
                                        {biologist.name.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>

                                <h1 className="text-2xl font-bold font-serif mb-1">{biologist.name}</h1>
                                <p className="text-primary font-medium mb-3">{biologist.title}</p>

                                {biologist.verified && (
                                    <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 mb-4">
                                        Verificado
                                    </Badge>
                                )}

                                <Button className="w-full mb-3">
                                    <Mail className="w-4 h-4 mr-2" />
                                    Contactar
                                </Button>
                            </div>

                            <div className="space-y-4 text-sm">
                                <div className="flex items-center text-muted-foreground">
                                    <MapPin className="w-4 h-4 mr-3 text-primary" />
                                    {biologist.location}
                                </div>
                                {biologist.institution && (
                                    <div className="flex items-center text-muted-foreground">
                                        <Building className="w-4 h-4 mr-3 text-primary" />
                                        {biologist.institution}
                                    </div>
                                )}
                                <div className="flex items-center text-muted-foreground">
                                    <Award className="w-4 h-4 mr-3 text-primary" />
                                    {biologist.yearsExperience} años de experiencia
                                </div>
                                <div className="flex items-center text-muted-foreground">
                                    <BookOpen className="w-4 h-4 mr-3 text-primary" />
                                    {biologist.projectsCompleted} proyectos completados
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-border">
                                <h3 className="font-semibold mb-3">Disponibilidad</h3>
                                <Badge variant="outline" className="capitalize">
                                    {biologist.availability}
                                </Badge>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-card rounded-xl p-6 border border-border">
                            <h2 className="text-xl font-bold font-serif mb-4 flex items-center">
                                Sobre mí
                            </h2>
                            <p className="text-muted-foreground leading-relaxed">
                                {biologist.bio}
                            </p>
                        </div>

                        <div className="bg-card rounded-xl p-6 border border-border">
                            <h2 className="text-xl font-bold font-serif mb-4">Especialidades</h2>
                            <div className="flex flex-wrap gap-2">
                                {biologist.specialties.map((spec) => (
                                    <Badge key={spec} variant="secondary" className="text-base px-4 py-1">
                                        {specialtyLabels[spec]}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <div className="bg-card rounded-xl p-6 border border-border">
                            <h2 className="text-xl font-bold font-serif mb-4">Roles</h2>
                            <div className="flex flex-wrap gap-2">
                                {biologist.roles.map((role) => (
                                    <Badge key={role} variant="outline" className="text-base px-4 py-1 capitalize">
                                        {role}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <div className="bg-card rounded-xl p-6 border border-border">
                            <h2 className="text-xl font-bold font-serif mb-4">Idiomas</h2>
                            <div className="flex flex-wrap gap-2">
                                {biologist.languages.map((lang) => (
                                    <Badge key={lang} variant="outline" className="text-base px-4 py-1">
                                        {lang}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <div className="bg-card rounded-xl p-6 border border-border">
                            <h2 className="text-xl font-bold font-serif mb-4">Reseñas y Evaluaciones</h2>
                            <ReviewsSection targetId={biologist.id} />
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

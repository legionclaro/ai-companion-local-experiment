import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { User, Mail, MapPin, Award, Download } from "lucide-react";

export default function ProfileEditor() {
    const { user } = useAuth();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-serif mb-2">Mi Perfil</h1>
                    <p className="text-muted-foreground">
                        Actualiza tu información profesional y personal.
                    </p>
                </div>
                <Button
                    variant="outline"
                    onClick={() => alert("Exportando CV como PDF...\n(Simulado - sin backend)")}
                >
                    <Download className="w-4 h-4 mr-2" />
                    Exportar CV
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Card */}
                <Card className="col-span-1 border-primary/20 bg-primary/5">
                    <CardContent className="pt-6 flex flex-col items-center">
                        <div className="w-32 h-32 rounded-full bg-background border-4 border-primary/20 flex items-center justify-center text-4xl text-primary font-bold mb-4 shadow-sm">
                            {user?.email?.charAt(0).toUpperCase() || "U"}
                        </div>
                        <h2 className="text-xl font-bold mb-1">Tu Nombre</h2>
                        <p className="text-muted-foreground mb-4">{user?.email}</p>
                        <Button variant="outline" className="w-full">
                            Cambiar Foto
                        </Button>
                    </CardContent>
                </Card>

                {/* Edit Form */}
                <Card className="col-span-1 lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Información Personal</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">Nombre</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input id="firstName" placeholder="Tu nombre" className="pl-10" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Apellido</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input id="lastName" placeholder="Tu apellido" className="pl-10" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Correo Electrónico</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input id="email" type="email" value={user?.email || ""} disabled className="pl-10 bg-muted" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="title">Título Profesional</Label>
                            <div className="relative">
                                <Award className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input id="title" placeholder="Ej. Biólogo Marino" className="pl-10" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="location">Ubicación</Label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input id="location" placeholder="Ciudad, País" className="pl-10" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="bio">Biografía</Label>
                            <Textarea
                                id="bio"
                                placeholder="Cuéntanos sobre tu experiencia y especialidades..."
                                className="min-h-[120px]"
                            />
                        </div>

                        <div className="pt-4 flex justify-end">
                            <Button onClick={() => alert("Guardado (Simulado)")}>
                                Guardar Cambios
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

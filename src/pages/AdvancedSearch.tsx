import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Search, Save, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AdvancedSearch() {
    const [searchTerm, setSearchTerm] = useState("");
    const [specialty, setSpecialty] = useState("");
    const [location, setLocation] = useState("");
    const [availability, setAvailability] = useState("");

    const handleSearch = () => {
        alert(`Búsqueda ejecutada con:\n- Término: "${searchTerm}"\n- Especialidad: "${specialty}"\n- Ubicación: "${location}"\n- Disponibilidad: "${availability}"\n\n(Simulado - sin backend)`);
    };

    const handleSaveSearch = () => {
        alert("Búsqueda guardada exitosamente (Simulado)");
    };

    const handleClearFilters = () => {
        setSearchTerm("");
        setSpecialty("");
        setLocation("");
        setAvailability("");
    };

    return (
        <div className="min-h-screen bg-background py-20">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold font-serif mb-2">Búsqueda Avanzada</h1>
                    <p className="text-muted-foreground">
                        Encuentra biólogos y proyectos con filtros personalizados
                    </p>
                </div>

                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <span>Filtros de Búsqueda</span>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" onClick={handleClearFilters}>
                                    <X className="w-4 h-4 mr-2" />
                                    Limpiar
                                </Button>
                                <Button variant="outline" size="sm" onClick={handleSaveSearch}>
                                    <Save className="w-4 h-4 mr-2" />
                                    Guardar Búsqueda
                                </Button>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="search">Buscar por palabra clave</Label>
                                <Input
                                    id="search"
                                    placeholder="Ej: conservación marina, ornitología..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="specialty">Especialidad</Label>
                                <Select value={specialty} onValueChange={setSpecialty}>
                                    <SelectTrigger id="specialty">
                                        <SelectValue placeholder="Selecciona especialidad" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">Todas</SelectItem>
                                        <SelectItem value="marine">Biología Marina</SelectItem>
                                        <SelectItem value="conservation">Conservación</SelectItem>
                                        <SelectItem value="ecology">Ecología</SelectItem>
                                        <SelectItem value="ornithology">Ornitología</SelectItem>
                                        <SelectItem value="herpetology">Herpetología</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="location">Ubicación</Label>
                                <Select value={location} onValueChange={setLocation}>
                                    <SelectTrigger id="location">
                                        <SelectValue placeholder="Selecciona provincia" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">Todas</SelectItem>
                                        <SelectItem value="santo-domingo">Santo Domingo</SelectItem>
                                        <SelectItem value="santiago">Santiago</SelectItem>
                                        <SelectItem value="la-vega">La Vega</SelectItem>
                                        <SelectItem value="puerto-plata">Puerto Plata</SelectItem>
                                        <SelectItem value="barahona">Barahona</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="availability">Disponibilidad</Label>
                                <Select value={availability} onValueChange={setAvailability}>
                                    <SelectTrigger id="availability">
                                        <SelectValue placeholder="Selecciona disponibilidad" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">Cualquiera</SelectItem>
                                        <SelectItem value="immediate">Inmediata</SelectItem>
                                        <SelectItem value="1-month">En 1 mes</SelectItem>
                                        <SelectItem value="3-months">En 3 meses</SelectItem>
                                        <SelectItem value="flexible">Flexible</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <Button onClick={handleSearch} className="w-full" size="lg">
                            <Search className="w-4 h-4 mr-2" />
                            Buscar
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Resultados (Demo)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                                            <span className="text-2xl font-bold text-primary">
                                                {String.fromCharCode(64 + i)}
                                            </span>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold mb-1">
                                                Biólogo de Ejemplo {i}
                                            </h3>
                                            <p className="text-sm text-muted-foreground mb-2">
                                                Especialista en conservación marina con 5+ años de experiencia
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                <Badge variant="secondary">Biología Marina</Badge>
                                                <Badge variant="secondary">Conservación</Badge>
                                                <Badge variant="outline">Santo Domingo</Badge>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

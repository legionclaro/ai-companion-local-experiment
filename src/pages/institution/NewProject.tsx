import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function NewProject() {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link to="/institution/projects">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-3xl font-bold font-serif mb-1">Crear Nuevo Proyecto</h1>
                    <p className="text-muted-foreground">
                        Publique una nueva oportunidad para la comunidad de biólogos.
                    </p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Detalles del Proyecto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="title">Título del Proyecto</Label>
                        <Input id="title" placeholder="Ej. Inventario de Flora en Valle Nuevo" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="type">Tipo de Proyecto</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Seleccione un tipo" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="conservacion">Conservación</SelectItem>
                                    <SelectItem value="investigacion">Investigación</SelectItem>
                                    <SelectItem value="inventario">Inventario</SelectItem>
                                    <SelectItem value="impacto">Estudio de Impacto</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="modality">Modalidad</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Seleccione modalidad" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="campo">Trabajo de Campo</SelectItem>
                                    <SelectItem value="remoto">Remoto</SelectItem>
                                    <SelectItem value="hibrido">Híbrido</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Descripción</Label>
                        <Textarea
                            id="description"
                            placeholder="Describa los objetivos, metodología y responsabilidades..."
                            className="min-h-[150px]"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="location">Ubicación</Label>
                            <Input id="location" placeholder="Ciudad o Provincia" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="positions">Vacantes</Label>
                            <Input id="positions" type="number" min="1" placeholder="Ej. 2" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="duration">Duración</Label>
                            <Input id="duration" placeholder="Ej. 6 meses" />
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                        <Button variant="outline" asChild>
                            <Link to="/institution/projects">Cancelar</Link>
                        </Button>
                        <Button onClick={() => alert("Proyecto creado (Simulado)")}>
                            Publicar Proyecto
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { User, Mail, MapPin, Award, Download, Loader2, Camera } from "lucide-react";
import { useBiologist, useUpdateBiologist } from "@/hooks/useBiologists";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";

export default function ProfileEditor() {
    const { user, isDemoMode } = useAuth();
    const { data: profile, isLoading } = useBiologist(user?.id || "");
    const updateProfile = useUpdateBiologist();

    const [formData, setFormData] = useState({
        name: "",
        title: "",
        location: "",
        bio: "",
        years_experience: 0,
        photo: "",
    });

    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        if (profile) {
            setFormData({
                name: profile.name || "",
                title: profile.title || "",
                location: profile.location || "",
                bio: profile.bio || "",
                years_experience: profile.years_experience || 0,
                photo: profile.photo || "",
            });
        }
    }, [profile]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSave = async () => {
        if (!user?.id) return;
        try {
            await updateProfile.mutateAsync({
                id: user.id,
                ...formData
            });
            toast.success("Perfil actualizado con éxito");
        } catch (error) {
            toast.error("Error al actualizar el perfil");
        }
    };

    const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !user?.id) return;

        if (isDemoMode) {
            toast.error("El cambio de foto no está disponible en modo Demo");
            return;
        }

        try {
            setIsUploading(true);
            const fileExt = file.name.split('.').pop();
            const filePath = `${user.id}/${Math.random()}.${fileExt}`;

            // Upload to 'avatars' bucket
            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, file);

            if (uploadError) {
                console.error("Upload error details:", uploadError);
                throw new Error(uploadError.message || "Error al subir el archivo");
            }

            const { data: { publicUrl } } = supabase.storage
                .from('avatars')
                .getPublicUrl(filePath);

            setFormData(prev => ({ ...prev, photo: publicUrl }));
            toast.success("Foto subida. No olvides guardar los cambios.");
        } catch (error: any) {
            console.error("Full upload error:", error);
            toast.error("Error al subir la foto: " + (error.message || "Error desconocido"));
        } finally {
            setIsUploading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-10 w-48" />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <Skeleton className="h-64 col-span-1" />
                    <Skeleton className="h-[400px] col-span-2" />
                </div>
            </div>
        );
    }

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
                    onClick={() => alert("Exportando CV como PDF...\n(Funcionalidad en desarrollo)")}
                >
                    <Download className="w-4 h-4 mr-2" />
                    Exportar CV
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Card */}
                <Card className="col-span-1 border-primary/20 bg-primary/5">
                    <CardContent className="pt-6 flex flex-col items-center">
                        <div className="relative group">
                            <div className="w-32 h-32 rounded-full bg-background border-4 border-primary/20 flex items-center justify-center text-4xl text-primary font-bold mb-4 shadow-sm overflow-hidden">
                                {formData.photo ? (
                                    <img src={formData.photo} alt="Avatar" className="w-full h-full object-cover" />
                                ) : (
                                    user?.email?.charAt(0).toUpperCase() || "U"
                                )}
                            </div>
                            <label className="absolute bottom-4 right-0 bg-primary text-white p-2 rounded-full cursor-pointer shadow-md hover:bg-primary/90 transition-colors">
                                {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4" />}
                                <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} disabled={isUploading} />
                            </label>
                        </div>
                        <h2 className="text-xl font-bold mb-1">{formData.name || "Tu Nombre"}</h2>
                        <p className="text-muted-foreground mb-4">{user?.email}</p>
                        <Badge variant={profile?.verified ? "secondary" : "outline"} className={profile?.verified ? "bg-emerald-100 text-emerald-800" : ""}>
                            {profile?.verified ? "Verificado" : "Pendiente de Verificación"}
                        </Badge>
                    </CardContent>
                </Card>

                {/* Edit Form */}
                <Card className="col-span-1 lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Información Profesional</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nombre Completo</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input id="name" value={formData.name} onChange={handleChange} placeholder="Tu nombre completo" className="pl-10" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Correo Electrónico</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input id="email" type="email" value={user?.email || ""} disabled className="pl-10 bg-muted" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Título Profesional</Label>
                                <div className="relative">
                                    <Award className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input id="title" value={formData.title} onChange={handleChange} placeholder="Ej. Biólogo Marino" className="pl-10" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="years_experience">Años de experiencia</Label>
                                <Input id="years_experience" type="number" value={formData.years_experience} onChange={handleChange} className="pl-3" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="location">Ubicación</Label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input id="location" value={formData.location} onChange={handleChange} placeholder="Ciudad, País" className="pl-10" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="bio">Biografía</Label>
                            <Textarea
                                id="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                placeholder="Cuéntanos sobre tu experiencia y especialidades..."
                                className="min-h-[120px]"
                            />
                        </div>

                        <div className="pt-4 flex justify-end">
                            <Button onClick={handleSave} disabled={updateProfile.isPending}>
                                {updateProfile.isPending ? "Guardando..." : "Guardar Cambios"}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

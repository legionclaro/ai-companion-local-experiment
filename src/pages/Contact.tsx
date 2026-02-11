import ContentLayout from "@/components/layout/ContentLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Contact() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Mensaje enviado con éxito. Nos pondremos en contacto pronto (Simulado)");
    };

    return (
        <ContentLayout
            title="Contacto"
            subtitle="Estamos aquí para escucharte"
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Form */}
                <div className="space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nombre</Label>
                                <Input id="name" placeholder="Tu nombre" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="tu@email.com" required />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="subject">Asunto</Label>
                            <Input id="subject" placeholder="¿En qué podemos ayudarte?" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="message">Mensaje</Label>
                            <Textarea
                                id="message"
                                placeholder="Escribe tu mensaje aquí..."
                                className="min-h-[150px]"
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full" size="lg">Enviar Mensaje</Button>
                    </form>
                </div>

                {/* Info */}
                <div className="space-y-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4 font-serif">Información de Contacto</h3>
                        <p className="text-muted-foreground mb-6">
                            ¿Tienes preguntas sobre cómo funciona la plataforma o necesitas asistencia técnica?
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                <Mail className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <p className="font-semibold text-sm">Email</p>
                                <p className="text-muted-foreground text-sm">info@biord.com</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                <Phone className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <p className="font-semibold text-sm">Teléfono</p>
                                <p className="text-muted-foreground text-sm">+1 (809) 555-0123</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                <MapPin className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <p className="font-semibold text-sm">Oficina</p>
                                <p className="text-muted-foreground text-sm">Calle Paseo de los Investigadores #42, Santo Domingo, RD.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ContentLayout>
    );
}

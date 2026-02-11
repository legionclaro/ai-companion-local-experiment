import ContentLayout from "@/components/layout/ContentLayout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Mail, MessageCircle, Phone } from "lucide-react";

export default function Help() {
    return (
        <ContentLayout
            title="Centro de Ayuda"
            subtitle="¿En qué podemos ayudarte hoy?"
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="p-6 border rounded-xl bg-card hover:border-primary/50 transition-colors text-center">
                    <Mail className="w-8 h-8 text-primary mx-auto mb-4" />
                    <h3 className="font-bold mb-2">Email</h3>
                    <p className="text-sm text-muted-foreground mb-4">soporte@biord.com</p>
                    <Button variant="outline" size="sm" asChild>
                        <a href="mailto:soporte@biord.com">Escribir</a>
                    </Button>
                </div>
                <div className="p-6 border rounded-xl bg-card hover:border-primary/50 transition-colors text-center">
                    <MessageCircle className="w-8 h-8 text-primary mx-auto mb-4" />
                    <h3 className="font-bold mb-2">Chat en Vivo</h3>
                    <p className="text-sm text-muted-foreground mb-4">Disponible de 9am - 6pm</p>
                    <Button variant="outline" size="sm">Iniciar</Button>
                </div>
                <div className="p-6 border rounded-xl bg-card hover:border-primary/50 transition-colors text-center">
                    <Phone className="w-8 h-8 text-primary mx-auto mb-4" />
                    <h3 className="font-bold mb-2">Teléfono</h3>
                    <p className="text-sm text-muted-foreground mb-4">+1 (809) 555-0123</p>
                    <Button variant="outline" size="sm" asChild>
                        <a href="tel:+18095550123">Llamar</a>
                    </Button>
                </div>
            </div>

            <h2 className="text-3xl font-bold mb-8 font-serif">Preguntas Frecuentes</h2>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>¿Cómo verifico mi perfil de biólogo?</AccordionTrigger>
                    <AccordionContent>
                        Para verificar tu perfil, debes subir una copia de tu título universitario o exequátur en la sección de "Documentación" de tu dashboard. Nuestro equipo revisará la información en un plazo de 48-72 horas.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>¿Tiene algún costo para los biólogos?</AccordionTrigger>
                    <AccordionContent>
                        El registro y las aplicaciones básicas son gratuitas. Ofrecemos planes Premium para aquellos que deseen destacar su perfil o acceder a herramientas avanzadas de exportación de CV.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>¿Qué tipo de instituciones pueden publicar proyectos?</AccordionTrigger>
                    <AccordionContent>
                        Cualquier ONG, ministerio, universidad o empresa privada con proyectos relacionados a la biología, conservación o estudios ambientales puede registrarse y publicar vacantes.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger>¿Cómo funciona el sistema de pagos?</AccordionTrigger>
                    <AccordionContent>
                        BioRD actúa como puente. Los pagos de los proyectos son acordados directamente entre la institución y el biólogo, aunque recomendamos el uso de contratos estándar disponibles en la plataforma.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <div className="mt-12 p-8 bg-primary/5 rounded-2xl text-center border border-primary/10">
                <h3 className="text-xl font-bold mb-2">¿No encuentras lo que buscas?</h3>
                <p className="text-muted-foreground mb-6">Nuestro equipo de soporte está listo para asistirte en cualquier momento.</p>
                <Button asChild>
                    <Link to="/contact">Contáctanos</Link>
                </Button>
            </div>
        </ContentLayout>
    );
}

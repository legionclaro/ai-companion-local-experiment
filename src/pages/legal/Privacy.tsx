import ContentLayout from "@/components/layout/ContentLayout";

export default function Privacy() {
    return (
        <ContentLayout
            title="Política de Privacidad"
            subtitle="Tu privacidad es nuestra prioridad"
        >
            <section className="space-y-6">
                <div>
                    <h2 className="text-2xl font-bold mb-2">1. Información que Recopilamos</h2>
                    <p className="text-muted-foreground">
                        Recopilamos información personal necesaria para la creación de perfiles profesionales, incluyendo nombre, correo electrónico, credenciales académicas e historial laboral.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-bold mb-2">2. Uso de la Información</h2>
                    <p className="text-muted-foreground">
                        La información se utiliza únicamente para conectar biólogos con instituciones, mejorar nuestros servicios y garantizar la seguridad de la plataforma.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-bold mb-2">3. Protección de Datos</h2>
                    <p className="text-muted-foreground">
                        Implementamos una variedad de medidas de seguridad para mantener la seguridad de su información personal cuando ingresa, envía o accede a su información personal.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-bold mb-2">4. Divulgación a Terceros</h2>
                    <p className="text-muted-foreground">
                        No vendemos, intercambiamos ni transferimos de ninguna otra manera su información de identificación personal a terceros ajenos a las conexiones profesionales dentro de la plataforma.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-bold mb-2">5. Consentimiento</h2>
                    <p className="text-muted-foreground">
                        Al utilizar nuestro sitio, usted acepta nuestra política de privacidad.
                    </p>
                </div>
            </section>
        </ContentLayout>
    );
}

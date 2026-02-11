import ContentLayout from "@/components/layout/ContentLayout";

export default function Terms() {
    return (
        <ContentLayout
            title="Términos de Uso"
            subtitle="Última actualización: Febrero 2024"
        >
            <section className="space-y-6">
                <div>
                    <h2 className="text-2xl font-bold mb-2">1. Aceptación de los Términos</h2>
                    <p className="text-muted-foreground">
                        Al acceder y utilizar BioRD, usted acepta estar sujeto a estos Términos de Uso y a todas las leyes y regulaciones aplicables. Si no está de acuerdo con alguno de estos términos, tiene prohibido utilizar o acceder a este sitio.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-bold mb-2">2. Licencia de Uso</h2>
                    <p className="text-muted-foreground">
                        Se concede permiso para descargar temporalmente una copia de los materiales (información o software) en el sitio web de BioRD para visualización transitoria personal y no comercial únicamente.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-bold mb-2">3. Verificación de Perfiles</h2>
                    <p className="text-muted-foreground">
                        BioRD se reserva el derecho de verificar la identidad y las credenciales de todos los biólogos registrados. La información falsa proporcionada puede resultar en la suspensión inmediata de la cuenta.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-bold mb-2">4. Responsabilidad de las Instituciones</h2>
                    <p className="text-muted-foreground">
                        Las instituciones son responsables de la veracidad de los proyectos publicados y de cumplir con los compromisos financieros y éticos establecidos con los biólogos contratados.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-bold mb-2">5. Limitaciones</h2>
                    <p className="text-muted-foreground">
                        En ningún caso BioRD o sus proveedores serán responsables de ningún daño surgido del uso o la incapacidad de usar los materiales en el sitio web de BioRD.
                    </p>
                </div>
            </section>
        </ContentLayout>
    );
}

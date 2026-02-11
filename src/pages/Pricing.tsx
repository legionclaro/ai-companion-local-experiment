import { useState } from "react";
import Navbar from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { biologistPlans, institutionPlans, PricingPlan } from "@/data/pricingData";
import { Check, X, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import PageTransition from "@/components/layout/PageTransition";

export default function Pricing() {
    const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

    const PlanCard = ({ plan }: { plan: PricingPlan }) => (
        <Card className={cn(
            "relative flex flex-col h-full transition-all duration-300 hover:shadow-xl border-2",
            plan.highlighted ? "border-primary shadow-lg scale-105 z-10" : "border-border hover:border-primary/50"
        )}>
            {plan.highlighted && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Popular
                </div>
            )}
            <CardHeader>
                <CardTitle className="text-2xl font-serif">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                </div>
            </CardHeader>
            <CardContent className="flex-grow">
                <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm">
                            {feature.included ? (
                                <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                            ) : (
                                <X className="w-4 h-4 text-muted-foreground/30 mt-0.5 shrink-0" />
                            )}
                            <span className={cn(feature.included ? "text-foreground" : "text-muted-foreground")}>
                                {feature.text}
                            </span>
                        </li>
                    ))}
                </ul>
            </CardContent>
            <CardFooter>
                <Button
                    className="w-full"
                    variant={plan.highlighted ? "default" : "outline"}
                    size="lg"
                    onClick={() => alert(`Iniciando suscripción a plan: ${plan.name} (Simulado)`)}
                >
                    {plan.buttonText}
                </Button>
            </CardFooter>
        </Card>
    );

    return (
        <div className="min-h-screen bg-background flex flex-col pt-16">
            <Navbar />
            <PageTransition
                title="Planes y Precios"
                description="Encuentra el plan perfecto para potenciar tu carrera científica o gestionar el talento biológico de tu institución en BioRD."
            >
                <main className="flex-grow container mx-auto px-4 py-20">
                    <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                        <h1 className="text-4xl md:text-5xl font-bold font-serif">Planes para cada necesidad</h1>
                        <p className="text-xl text-muted-foreground font-light">
                            Únete a la comunidad de biólogos más grande de República Dominicana.
                            Elige el plan que mejor se adapte a tus objetivos.
                        </p>

                        <div className="flex items-center justify-center gap-4 pt-6">
                            <span className={cn("text-sm", billingCycle === "monthly" ? "font-bold" : "text-muted-foreground")}>Mensual</span>
                            <div
                                className="w-12 h-6 bg-muted rounded-full p-1 cursor-pointer flex items-center relative"
                                onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
                            >
                                <div className={cn(
                                    "w-4 h-4 bg-primary rounded-full transition-all duration-200",
                                    billingCycle === "yearly" ? "translate-x-6" : "translate-x-0"
                                )} />
                            </div>
                            <span className={cn("text-sm", billingCycle === "yearly" ? "font-bold" : "text-muted-foreground")}>
                                Anual <span className="text-emerald-500 font-medium ml-1">(-20%)</span>
                            </span>
                        </div>
                    </div>

                    <Tabs defaultValue="biologists" className="w-full">
                        <div className="flex justify-center mb-12">
                            <TabsList className="grid w-80 grid-cols-2">
                                <TabsTrigger value="biologists">Biólogos</TabsTrigger>
                                <TabsTrigger value="institutions">Instituciones</TabsTrigger>
                            </TabsList>
                        </div>

                        <TabsContent value="biologists">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-center">
                                {biologistPlans.map((plan) => (
                                    <PlanCard key={plan.id} plan={plan} />
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="institutions">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-center">
                                {institutionPlans.map((plan) => (
                                    <PlanCard key={plan.id} plan={plan} />
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>

                    {/* FAQ Section Placeholder */}
                    <div className="mt-32 max-w-3xl mx-auto text-center">
                        <h2 className="text-2xl font-bold mb-8">Preguntas Frecuentes</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                            <div>
                                <h3 className="font-semibold mb-2">¿Puedo cambiar de plan después?</h3>
                                <p className="text-sm text-muted-foreground">Sí, puedes subir o bajar de categoría en cualquier momento desde tu panel de facturación.</p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">¿Cómo funcionan los reembolsos?</h3>
                                <p className="text-sm text-muted-foreground">Ofrecemos una garantía de satisfacción de 7 días. Si no estás conforme, te devolvemos tu dinero.</p>
                            </div>
                        </div>
                    </div>
                </main>
            </PageTransition>
            <Footer />
        </div>
    );
}

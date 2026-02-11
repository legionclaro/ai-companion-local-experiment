import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, ChevronRight, ChevronLeft, Upload, FileText, UserCheck, ShieldCheck } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import PageTransition from "@/components/layout/PageTransition";

const steps = [
    { title: "Identidad", icon: UserCheck, description: "Valida tus datos personales básicos." },
    { title: "Académico", icon: FileText, description: "Sube tus títulos y exequátur." },
    { title: "Revisión", icon: ShieldCheck, description: "Confirma tu solicitud de verificación." },
];

export default function VerificationWizard() {
    const [currentStep, setCurrentStep] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            setIsComplete(true);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    if (isComplete) {
        return (
            <PageTransition>
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-6">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold font-serif">¡Solicitud Enviada!</h2>
                        <p className="text-muted-foreground max-w-md">
                            Tu documentación ha sido enviada al comité de BioRD.
                            Te notificaremos el resultado en un plazo de 48 a 72 horas.
                        </p>
                    </div>
                    <Button asChild size="lg">
                        <a href="/dashboard">Volver al Panel</a>
                    </Button>
                </div>
            </PageTransition>
        );
    }

    return (
        <PageTransition>
            <div className="max-w-2xl mx-auto space-y-8">
                <div>
                    <h1 className="text-3xl font-bold font-serif mb-2">Verificación de Perfil</h1>
                    <p className="text-muted-foreground">
                        Sigue los pasos para obtener tu insignia dorada y destacar en la plataforma.
                    </p>
                </div>

                {/* Stepper Header */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm font-medium">
                        <span className="text-primary">Paso {currentStep + 1} de {steps.length}</span>
                        <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
                    </div>
                    <Progress value={((currentStep + 1) / steps.length) * 100} className="h-2" />
                </div>

                <div className="grid grid-cols-3 gap-2">
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        const isActive = index === currentStep;
                        const isFinished = index < currentStep;
                        return (
                            <div
                                key={step.title}
                                className={`flex flex-col items-center p-3 rounded-lg border transition-colors ${isActive ? "bg-primary/5 border-primary" : "bg-card border-border/50 opacity-60"
                                    } ${isFinished ? "bg-emerald-50 border-emerald-200 opacity-100" : ""}`}
                            >
                                <Icon className={`w-5 h-5 mb-1 ${isActive ? "text-primary" : ""} ${isFinished ? "text-emerald-600" : ""}`} />
                                <span className="text-[10px] uppercase font-bold tracking-wider">{step.title}</span>
                            </div>
                        );
                    })}
                </div>

                {/* Step Content */}
                <Card className="shadow-soft border-border/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            {steps[currentStep].title}
                        </CardTitle>
                        <CardDescription>{steps[currentStep].description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 min-h-[250px] flex flex-col justify-center">
                        {currentStep === 0 && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-right-2 duration-300">
                                <div className="space-y-2">
                                    <Label>Nombre Completo (como aparece en tu ID)</Label>
                                    <Input placeholder="Ej. Dr. Juan Perez" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Cédula o Pasaporte</Label>
                                    <Input placeholder="000-0000000-0" />
                                </div>
                            </div>
                        )}

                        {currentStep === 1 && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-right-2 duration-300">
                                <div className="space-y-2">
                                    <Label>Título Universitario (Grado)</Label>
                                    <div className="border-2 border-dashed rounded-xl p-8 text-center border-muted-foreground/20 hover:border-primary/50 transition-colors cursor-pointer group">
                                        <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2 group-hover:text-primary transition-colors" />
                                        <p className="text-sm font-medium">Sube tu PDF o Imagen</p>
                                        <p className="text-xs text-muted-foreground">Máximo 5MB (PDF, JPG, PNG)</p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Exequátur (Si aplica)</Label>
                                    <Input placeholder="Número de registro profesional" />
                                </div>
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div className="space-y-4 text-center py-6 animate-in fade-in slide-in-from-right-2 duration-300">
                                <ShieldCheck className="w-16 h-16 text-primary mx-auto mb-2" />
                                <h3 className="text-xl font-bold">Todo listo para enviar</h3>
                                <p className="text-sm text-muted-foreground px-8">
                                    Al confirmar, declaras que toda la información proporcionada es verídica y autorizas a BioRD a validar tus credenciales académicas.
                                </p>
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="flex justify-between border-t pt-6 bg-muted/20">
                        <Button
                            variant="ghost"
                            onClick={handleBack}
                            disabled={currentStep === 0}
                        >
                            <ChevronLeft className="w-4 h-4 mr-2" />
                            Anterior
                        </Button>
                        <Button onClick={handleNext}>
                            {currentStep === steps.length - 1 ? "Enviar Verificación" : "Siguiente Paso"}
                            <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </PageTransition>
    );
}

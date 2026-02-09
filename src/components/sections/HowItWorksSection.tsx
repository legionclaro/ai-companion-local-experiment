import { Badge } from '@/components/ui/badge';
import { UserPlus, Search, Handshake, Star } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    title: 'Crea tu Perfil',
    description: 'Registra tus especialidades, experiencia y disponibilidad. Tu perfil es verificado por nuestro comité.',
  },
  {
    icon: Search,
    title: 'Explora Proyectos',
    description: 'Encuentra oportunidades que coincidan con tu perfil. Solo proyectos verificados con financiamiento confirmado.',
  },
  {
    icon: Handshake,
    title: 'Conecta y Colabora',
    description: 'Aplica a proyectos y conecta directamente con instituciones. Sin intermediarios innecesarios.',
  },
  {
    icon: Star,
    title: 'Construye Reputación',
    description: 'Cada proyecto completado fortalece tu perfil profesional. Sistema de evaluación mutua transparente.',
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Proceso Simple</Badge>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-4">
            Cómo Funciona
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Una plataforma diseñada para conectar talento científico con oportunidades reales.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={step.title}
              className="relative animate-fade-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Connector Line (hidden on mobile and last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-full h-px bg-border" />
              )}
              
              {/* Step Card */}
              <div className="relative bg-card rounded-2xl border border-border/50 p-6 text-center shadow-sm hover:shadow-card transition-shadow">
                {/* Number */}
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                  {index + 1}
                </div>
                
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                
                {/* Content */}
                <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

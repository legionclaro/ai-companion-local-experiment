import { Button } from '@/components/ui/button';
import { ArrowRight, Leaf } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-primary-foreground/20 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-primary-foreground/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-primary-foreground/10 mx-auto mb-6 flex items-center justify-center">
            <Leaf className="w-8 h-8 text-primary-foreground" />
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-primary-foreground mb-6">
            Únete a la Comunidad de Biología Dominicana
          </h2>

          {/* Description */}
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Sé parte de la primera red profesional que conecta talento científico local con proyectos de impacto real.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="accent" size="xl">
              Registrar mi Perfil
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button 
              variant="glass" 
              size="xl"
              className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/20"
            >
              Soy una Institución
            </Button>
          </div>

          {/* Trust Text */}
          <p className="text-sm text-primary-foreground/60 mt-8">
            ✓ Perfiles verificados &nbsp;·&nbsp; ✓ Proyectos con financiamiento real &nbsp;·&nbsp; ✓ Sin costo inicial
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

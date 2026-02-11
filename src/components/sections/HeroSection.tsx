import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle2, Users, Briefcase, Building2 } from 'lucide-react';
import { stats } from '@/data/mockData';
import { Link } from 'react-router-dom';
import heroBg from '@/assets/hero-bg.jpg';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6 animate-fade-in">
            <Badge variant="verified" className="px-4 py-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
              Perfiles Verificados
            </Badge>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6 leading-tight animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Conectamos Biólogos{' '}
            <span className="text-primary">Dominicanos</span>{' '}
            con Proyectos Reales
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            La primera plataforma profesional que une talento científico local con oportunidades de conservación, investigación y consultoría en el Caribe.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Button variant="hero" size="xl" asChild>
              <Link to="/projects">
                Explorar Proyectos
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="glass" size="xl" asChild>
              <Link to="/auth/register/biologist">
                Soy Biólogo
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <StatCard icon={Users} value={stats.biologists} label="Biólogos" />
            <StatCard icon={Briefcase} value={stats.projects} label="Proyectos" />
            <StatCard icon={Building2} value={stats.institutions} label="Instituciones" />
            <StatCard icon={CheckCircle2} value={stats.countries} label="Países" />
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  value: number;
  label: string;
}

const StatCard = ({ icon: Icon, value, label }: StatCardProps) => (
  <div className="glass-card rounded-xl p-4 text-center">
    <Icon className="w-5 h-5 text-primary mx-auto mb-2" />
    <div className="text-2xl font-bold text-foreground">{value}+</div>
    <div className="text-sm text-muted-foreground">{label}</div>
  </div>
);

export default HeroSection;

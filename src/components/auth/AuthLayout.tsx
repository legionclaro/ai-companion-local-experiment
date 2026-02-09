import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 leaf-pattern opacity-30" />
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold font-serif">BioRD</span>
          </Link>
          
          <div className="space-y-6">
            <h2 className="text-4xl font-serif font-bold leading-tight">
              Conectando la biodiversidad <br />
              con quienes la protegen
            </h2>
            <p className="text-lg text-white/80 max-w-md">
              La plataforma que une a biólogos dominicanos con proyectos de conservación 
              e investigación en toda la región.
            </p>
          </div>
          
          <p className="text-sm text-white/60">
            © 2024 BioRD. Todos los derechos reservados.
          </p>
        </div>
      </div>
      
      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <Link to="/" className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Leaf className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold font-serif text-primary">BioRD</span>
          </Link>
          
          <div className="mb-8">
            <h1 className="text-2xl font-serif font-bold text-foreground">{title}</h1>
            {subtitle && (
              <p className="text-muted-foreground mt-2">{subtitle}</p>
            )}
          </div>
          
          {children}
        </div>
      </div>
    </div>
  );
}

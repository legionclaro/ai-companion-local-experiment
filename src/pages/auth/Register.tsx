import { Link } from 'react-router-dom';
import { User, Building2, ArrowRight } from 'lucide-react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Register() {
  return (
    <AuthLayout
      title="Crea tu cuenta"
      subtitle="Selecciona el tipo de cuenta que deseas crear"
    >
      <div className="space-y-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer group">
          <Link to="/auth/register/biologist">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
              <CardTitle className="text-lg mt-3">Soy Biólogo</CardTitle>
              <CardDescription>
                Crea tu perfil profesional, muestra tus especialidades y conecta con proyectos de investigación
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Perfil verificado por comité de expertos</li>
                <li>• Acceso a proyectos de conservación</li>
                <li>• Networking con la comunidad científica</li>
              </ul>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer group">
          <Link to="/auth/register/institution">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
              <CardTitle className="text-lg mt-3">Represento una Institución</CardTitle>
              <CardDescription>
                Registra tu organización, publica proyectos y encuentra los mejores profesionales
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Publica proyectos de investigación</li>
                <li>• Acceso a directorio de biólogos verificados</li>
                <li>• Gestiona aplicaciones y equipos</li>
              </ul>
            </CardContent>
          </Link>
        </Card>

        <p className="text-center text-sm text-muted-foreground pt-4">
          ¿Ya tienes cuenta?{' '}
          <Link to="/auth/login" className="text-primary font-medium hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}

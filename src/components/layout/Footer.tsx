import { Leaf } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="about" className="bg-card border-t border-border py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <a href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Leaf className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-serif font-semibold text-foreground">
                Bio<span className="text-primary">RD</span>
              </span>
            </a>
            <p className="text-sm text-muted-foreground">
              Infraestructura profesional para la biología dominicana. Conectando talento científico con proyectos reales.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Plataforma</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/biologists" className="hover:text-foreground transition-colors">Directorio</a></li>
              <li><a href="/projects" className="hover:text-foreground transition-colors">Proyectos</a></li>
              <li><a href="/blog" className="hover:text-foreground transition-colors">Blog</a></li>
              <li><a href="/auth/register/institution" className="hover:text-foreground transition-colors">Para Instituciones</a></li>
              <li><a href="/auth/register/biologist" className="hover:text-foreground transition-colors">Verificación</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Recursos</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/help" className="hover:text-foreground transition-colors">Centro de Ayuda</a></li>
              <li><a href="/pricing" className="hover:text-foreground transition-colors">Precios</a></li>
              <li><a href="/search" className="hover:text-foreground transition-colors">Búsqueda Avanzada</a></li>
              <li><a href="/contact" className="hover:text-foreground transition-colors">Contacto</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/terms" className="hover:text-foreground transition-colors">Términos de Uso</a></li>
              <li><a href="/privacy" className="hover:text-foreground transition-colors">Privacidad</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} BioRD. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Hecho con 🌱 en República Dominicana</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

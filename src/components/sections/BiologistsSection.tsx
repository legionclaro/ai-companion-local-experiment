import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import BiologistCard from '@/components/cards/BiologistCard';
import { specialtyLabels } from '@/data/mockData';
import { Specialty } from '@/types';
import { Filter, ArrowRight } from 'lucide-react';
import { useBiologists } from '@/hooks/useBiologists';
import { Skeleton } from '@/components/ui/skeleton';
import { Link } from 'react-router-dom';

const allSpecialties: Specialty[] = [
  'botánica', 'zoología', 'herpetología', 'ornitología',
  'entomología', 'ecología', 'conservación', 'GIS',
  'taxonomía', 'biología marina'
];

const BiologistsSection = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty | null>(null);
  const { data: biologists = [], isLoading } = useBiologists();

  const filteredBiologists = selectedSpecialty
    ? biologists.filter(b => (b.specialties || []).includes(selectedSpecialty))
    : biologists;

  return (
    <section id="biologists" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 bg-primary/5 text-primary border-primary/20">Directorio Profesional</Badge>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-4">
            Biólogos Verificados
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Profesionales con experiencia comprobada listos para colaborar en proyectos de conservación e investigación.
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
          <Button
            variant={selectedSpecialty === null ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setSelectedSpecialty(null)}
          >
            Todos
          </Button>
          {allSpecialties.slice(0, 6).map(specialty => (
            <Button
              key={specialty}
              variant={selectedSpecialty === specialty ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedSpecialty(specialty)}
              className="shrink-0"
            >
              {specialtyLabels[specialty] || specialty}
            </Button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {isLoading ? (
            Array(3).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-[400px] w-full rounded-2xl" />
            ))
          ) : (
            filteredBiologists.slice(0, 3).map((biologist, index) => (
              <div
                key={biologist.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <BiologistCard biologist={biologist} />
              </div>
            ))
          )}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button variant="outline" size="lg" asChild className="group">
            <Link to="/biologists" className="flex items-center gap-2">
              Ver Todos los Biólogos
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BiologistsSection;

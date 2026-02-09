import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import BiologistCard from '@/components/cards/BiologistCard';
import { biologists, specialtyLabels } from '@/data/mockData';
import { Specialty } from '@/types';
import { Filter, ArrowRight } from 'lucide-react';

const allSpecialties: Specialty[] = [
  'botánica', 'zoología', 'herpetología', 'ornitología', 
  'entomología', 'ecología', 'conservación', 'GIS', 
  'taxonomía', 'biología marina'
];

const BiologistsSection = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty | null>(null);

  const filteredBiologists = selectedSpecialty
    ? biologists.filter(b => b.specialties.includes(selectedSpecialty))
    : biologists;

  return (
    <section id="biologists" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="specialty" className="mb-4">Directorio Profesional</Badge>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-4">
            Biólogos Verificados
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Profesionales con experiencia comprobada listos para colaborar en proyectos de conservación e investigación.
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
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
              {specialtyLabels[specialty]}
            </Button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredBiologists.slice(0, 6).map((biologist, index) => (
            <div 
              key={biologist.id} 
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <BiologistCard biologist={biologist} />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button variant="outline" size="lg">
            Ver Todos los Biólogos
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BiologistsSection;

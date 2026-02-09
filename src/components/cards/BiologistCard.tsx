import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Biologist } from '@/types';
import { specialtyLabels, availabilityLabels } from '@/data/mockData';
import { CheckCircle2, MapPin, Briefcase, MessageCircle } from 'lucide-react';

interface BiologistCardProps {
  biologist: Biologist;
}

const BiologistCard = ({ biologist }: BiologistCardProps) => {
  const initials = biologist.name
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('');

  return (
    <div className="group bg-card rounded-2xl border border-border/50 p-6 shadow-sm hover:shadow-card transition-all duration-300 hover:-translate-y-1">
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        {/* Avatar */}
        <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-semibold text-xl shrink-0">
          {initials}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-foreground truncate">{biologist.name}</h3>
            {biologist.verified && (
              <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
            )}
          </div>
          <p className="text-sm text-muted-foreground truncate">{biologist.title}</p>
          {biologist.institution && (
            <p className="text-xs text-muted-foreground/70 truncate">{biologist.institution}</p>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5" />
          {biologist.location}
        </div>
        <div className="flex items-center gap-1">
          <Briefcase className="w-3.5 h-3.5" />
          {biologist.projectsCompleted} proyectos
        </div>
      </div>

      {/* Specialties */}
      <div className="flex flex-wrap gap-2 mb-4">
        {biologist.specialties.slice(0, 3).map(specialty => (
          <Badge key={specialty} variant="specialty">
            {specialtyLabels[specialty] || specialty}
          </Badge>
        ))}
        {biologist.specialties.length > 3 && (
          <Badge variant="secondary">+{biologist.specialties.length - 3}</Badge>
        )}
      </div>

      {/* Availability & Experience */}
      <div className="flex items-center justify-between mb-4">
        <Badge variant="available">
          {availabilityLabels[biologist.availability]}
        </Badge>
        <span className="text-xs text-muted-foreground">
          {biologist.yearsExperience} años exp.
        </span>
      </div>

      {/* Bio */}
      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
        {biologist.bio}
      </p>

      {/* Action */}
      <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
        <MessageCircle className="w-4 h-4" />
        Contactar
      </Button>
    </div>
  );
};

export default BiologistCard;

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Project } from '@/types';
import { specialtyLabels } from '@/data/mockData';
import { MapPin, Clock, Users, Calendar, CheckCircle, Building2 } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const statusConfig = {
    abierto: { variant: 'open' as const, label: 'Abierto' },
    en_curso: { variant: 'inProgress' as const, label: 'En Curso' },
    cerrado: { variant: 'closed' as const, label: 'Cerrado' },
  };

  const typeLabels: Record<string, string> = {
    conservación: 'Conservación',
    impacto_ambiental: 'Impacto Ambiental',
    inventario: 'Inventario',
    académico: 'Académico',
    ong: 'ONG',
  };

  const status = statusConfig[project.status];

  return (
    <div className="group bg-card rounded-2xl border border-border/50 p-6 shadow-sm hover:shadow-card transition-all duration-300 hover:-translate-y-1">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant={status.variant}>{status.label}</Badge>
            <Badge variant="project">{typeLabels[project.type]}</Badge>
          </div>
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
            {project.title}
          </h3>
        </div>
      </div>

      {/* Institution */}
      <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
        <Building2 className="w-4 h-4" />
        <span>{project.institution}</span>
        {project.fundingConfirmed && (
          <Badge variant="verified" className="text-[10px] px-2 py-0.5">
            <CheckCircle className="w-3 h-3 mr-1" />
            Financiado
          </Badge>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
        {project.description}
      </p>

      {/* Required Profiles */}
      <div className="mb-4">
        <p className="text-xs font-medium text-muted-foreground mb-2">Perfiles Requeridos:</p>
        <div className="flex flex-wrap gap-1.5">
          {project.profileRequired.map(specialty => (
            <Badge key={specialty} variant="specialty" className="text-[10px]">
              {specialtyLabels[specialty] || specialty}
            </Badge>
          ))}
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="w-3.5 h-3.5" />
          <span>{project.location}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="w-3.5 h-3.5" />
          <span>{project.duration}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Users className="w-3.5 h-3.5" />
          <span>{project.positions} posiciones</span>
        </div>
        {project.deadline && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-3.5 h-3.5" />
            <span>{new Date(project.deadline).toLocaleDateString('es-DO', { month: 'short', day: 'numeric' })}</span>
          </div>
        )}
      </div>

      {/* Modality */}
      <div className="flex items-center justify-between mb-4">
        <Badge variant="secondary" className="capitalize">
          {project.modality}
        </Badge>
      </div>

      {/* Action */}
      <Button 
        variant={project.status === 'abierto' ? 'hero' : 'outline'} 
        className="w-full"
        disabled={project.status === 'cerrado'}
      >
        {project.status === 'abierto' ? 'Aplicar Ahora' : 'Ver Detalles'}
      </Button>
    </div>
  );
};

export default ProjectCard;

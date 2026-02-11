import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ProjectCard from '@/components/cards/ProjectCard';
import { ProjectStatus } from '@/types';
import { ArrowRight } from 'lucide-react';
import { useProjects } from '@/hooks/useProjects';
import { Skeleton } from '@/components/ui/skeleton';
import { Link } from 'react-router-dom';

const ProjectsSection = () => {
  const [selectedStatus, setSelectedStatus] = useState<ProjectStatus | null>(null);
  const { data: projects = [], isLoading } = useProjects();

  const filteredProjects = selectedStatus
    ? projects.filter(p => p.status === selectedStatus)
    : projects;

  const statusOptions: { value: ProjectStatus | null; label: string }[] = [
    { value: null, label: 'Todos' },
    { value: 'abierto', label: 'Abiertos' },
    { value: 'en_curso', label: 'En Curso' },
    { value: 'cerrado', label: 'Cerrados' },
  ];

  return (
    <section id="projects" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 bg-primary/5 text-primary border-primary/20">Oportunidades</Badge>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-4">
            Proyectos Activos
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Proyectos verificados con financiamiento confirmado buscando talento local.
          </p>
        </div>

        {/* Status Filters */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {statusOptions.map(option => (
            <Button
              key={option.label}
              variant={selectedStatus === option.value ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedStatus(option.value)}
            >
              {option.label}
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
            filteredProjects.slice(0, 3).map((project, index) => (
              <div
                key={project.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProjectCard project={project} />
              </div>
            ))
          )}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button variant="hero" size="lg" asChild className="group">
            <Link to="/projects" className="flex items-center gap-2">
              Ver Todos los Proyectos
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;

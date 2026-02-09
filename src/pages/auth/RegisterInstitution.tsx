import { AuthLayout } from '@/components/auth/AuthLayout';
import { InstitutionRegistration } from '@/components/auth/InstitutionRegistration';

export default function RegisterInstitution() {
  return (
    <AuthLayout
      title="Registro de institución"
      subtitle="Registra tu organización y publica proyectos de investigación"
    >
      <InstitutionRegistration />
    </AuthLayout>
  );
}

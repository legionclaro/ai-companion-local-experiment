import { AuthLayout } from '@/components/auth/AuthLayout';
import { BiologistRegistration } from '@/components/auth/BiologistRegistration';

export default function RegisterBiologist() {
  return (
    <AuthLayout
      title="Registro de biólogo"
      subtitle="Crea tu perfil profesional y conecta con oportunidades"
    >
      <BiologistRegistration />
    </AuthLayout>
  );
}

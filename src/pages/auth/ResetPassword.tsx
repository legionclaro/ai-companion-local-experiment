import { AuthLayout } from '@/components/auth/AuthLayout';
import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm';

export default function ResetPassword() {
  return (
    <AuthLayout
      title="Nueva contraseña"
      subtitle="Ingresa tu nueva contraseña para recuperar el acceso"
    >
      <ResetPasswordForm />
    </AuthLayout>
  );
}

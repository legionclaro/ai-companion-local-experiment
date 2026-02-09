import { AuthLayout } from '@/components/auth/AuthLayout';
import { LoginForm } from '@/components/auth/LoginForm';

export default function Login() {
  return (
    <AuthLayout
      title="Inicia sesión"
      subtitle="Ingresa tus credenciales para acceder a tu cuenta"
    >
      <LoginForm />
    </AuthLayout>
  );
}

# Plan Completo: BioRD - Plataforma SaaS

## Resumen Ejecutivo

Este plan transformará BioRD de una landing page con datos de demostración a una plataforma SaaS completa que conecta biólogos dominicanos con proyectos de conservación e investigación.

---

## Estado Actual

### ✅ FASE 1: Autenticación y Registro - COMPLETADA

#### 1.1 Sistema de Autenticación Base ✅
- [x] AuthContext para manejo de sesión global (`src/contexts/AuthContext.tsx`)
- [x] ProtectedRoute para rutas protegidas (`src/components/auth/ProtectedRoute.tsx`)
- [x] Páginas de Login y Register (`src/pages/auth/`)
- [x] Validaciones con Zod (`src/lib/validations/auth.ts`)

#### 1.2 Flujo de Registro de Biólogo ✅
- [x] Formulario multi-paso con validación Zod:
  - Paso 1: Datos básicos (nombre, email, contraseña)
  - Paso 2: Perfil profesional (especialidades, roles, experiencia)
  - Paso 3: Disponibilidad y ubicación
- [x] Componentes: `BiologistRegistration/` (StepIndicator, Step1, Step2, Step3)
- [x] Guarda perfil en `biologist_profiles` con estado `pending`

#### 1.3 Flujo de Registro de Institución ✅
- [x] Formulario de registro (`InstitutionRegistration.tsx`)
- [x] Crea registro en `institutions` con `created_by = user_id`

#### 1.4 Recuperación de Contraseña ✅
- [x] Página `/auth/forgot-password`
- [x] Página `/auth/reset-password`
- [x] Validación de tokens de recuperación

---

## Archivos Creados en Fase 1

```
src/
├── components/auth/
│   ├── AuthLayout.tsx
│   ├── LoginForm.tsx
│   ├── RegisterForm.tsx
│   ├── ForgotPasswordForm.tsx
│   ├── ResetPasswordForm.tsx
│   ├── ProtectedRoute.tsx
│   ├── InstitutionRegistration.tsx
│   └── BiologistRegistration/
│       ├── index.tsx
│       ├── StepIndicator.tsx
│       ├── Step1BasicData.tsx
│       ├── Step2ProfessionalProfile.tsx
│       └── Step3Availability.tsx
├── contexts/
│   └── AuthContext.tsx
├── lib/validations/
│   ├── auth.ts
│   └── profile.ts
└── pages/auth/
    ├── Login.tsx
    ├── Register.tsx
    ├── RegisterBiologist.tsx
    ├── RegisterInstitution.tsx
    ├── ForgotPassword.tsx
    └── ResetPassword.tsx
```

---

## Arquitectura de Usuarios

```text
+------------------+     +-------------------+     +------------------+
|    BIÓLOGO       |     |   INSTITUCIÓN     |     |      ADMIN       |
+------------------+     +-------------------+     +------------------+
| - Ver proyectos  |     | - Publicar        |     | - Verificar      |
| - Aplicar        |     |   proyectos       |     |   perfiles       |
| - Gestionar      |     | - Revisar         |     | - Moderar        |
|   perfil         |     |   aplicaciones    |     |   contenido      |
| - Ver estado de  |     | - Gestionar       |     | - Estadísticas   |
|   aplicaciones   |     |   institución     |     |   globales       |
+------------------+     +-------------------+     +------------------+
```

---

## Próximas Fases

### FASE 2: Directorio y Datos Reales
**Duración estimada: 2-3 iteraciones**

#### 2.1 Hooks de Datos con React Query
- `useBiologists()` - listar biólogos verificados con filtros
- `useProjects()` - listar proyectos abiertos/en curso
- `useInstitutions()` - listar instituciones
- `useProjectApplications()` - aplicaciones del usuario

#### 2.2 Páginas de Directorio
- `/biologists` - Directorio completo con paginación
- `/biologists/:id` - Perfil público del biólogo
- `/projects` - Banco de proyectos con filtros avanzados
- `/projects/:id` - Detalle de proyecto con botón "Aplicar"

#### 2.3 Conectar Landing con Datos Reales
- Modificar HeroSection para mostrar conteos reales
- BiologistsSection carga desde base de datos
- ProjectsSection carga desde base de datos

---

### FASE 3: Dashboard del Biólogo
**Duración estimada: 3-4 iteraciones**

#### 3.1 Layout del Dashboard
- Crear `/dashboard` con sidebar de navegación
- Componente DashboardLayout reutilizable
- Navegación: Mi Perfil, Mis Aplicaciones, Proyectos, Configuración

#### 3.2 Gestión de Perfil
- `/dashboard/profile` - Ver y editar perfil
- Formulario de edición con todos los campos
- Subida de foto de perfil (Storage)
- Indicador de estado de verificación
- Historial de proyectos completados

#### 3.3 Sistema de Aplicaciones
- `/dashboard/applications` - Lista de aplicaciones
- Estados: pendiente, aceptada, rechazada
- Formulario de aplicación con carta de presentación
- Retirar aplicaciones pendientes

#### 3.4 Explorador de Proyectos
- `/dashboard/projects` - Proyectos disponibles
- Filtros por especialidad, ubicación, modalidad
- Guardar proyectos favoritos
- Match score basado en perfil

---

### FASE 4: Dashboard de Institución
**Duración estimada: 3-4 iteraciones**

#### 4.1 Layout del Dashboard Institucional
- `/institution/dashboard` con navegación específica
- Navegación: Mi Institución, Proyectos, Aplicaciones, Equipo

#### 4.2 Gestión de Institución
- `/institution/settings` - Editar datos de institución
- Subida y gestión de logo
- Información de contacto

#### 4.3 Gestión de Proyectos
- `/institution/projects` - Lista de proyectos propios
- `/institution/projects/new` - Crear nuevo proyecto
- `/institution/projects/:id/edit` - Editar proyecto
- Cambiar estado del proyecto (abierto/en_curso/cerrado)

#### 4.4 Gestión de Aplicaciones
- `/institution/applications` - Ver todas las aplicaciones
- Filtrar por proyecto y estado
- Aceptar/rechazar aplicaciones con notas
- Ver perfil completo del aplicante

---

### FASE 5: Panel de Administración
**Duración estimada: 2-3 iteraciones**

#### 5.1 Dashboard Admin
- `/admin` - Panel de estadísticas globales
- Conteos: usuarios, proyectos, aplicaciones
- Gráficos de actividad con Recharts

#### 5.2 Verificación de Perfiles
- `/admin/verifications` - Cola de perfiles pendientes
- Ver perfil completo del biólogo
- Aprobar/rechazar con notas
- Historial de verificaciones

#### 5.3 Moderación de Contenido
- `/admin/projects` - Revisar proyectos
- `/admin/institutions` - Gestionar instituciones
- `/admin/users` - Gestión de usuarios

---

### FASE 6: Comunicación y Notificaciones
**Duración estimada: 2-3 iteraciones**

#### 6.1 Sistema de Mensajería Interna
- Crear tabla `messages` para comunicación directa
- Bandeja de entrada en dashboard
- Notificaciones de nuevos mensajes

#### 6.2 Notificaciones en Plataforma
- Crear tabla `notifications`
- Centro de notificaciones en header
- Notificar: nueva aplicación, estado cambiado, perfil verificado

#### 6.3 Emails Transaccionales (Edge Functions)
- Confirmación de registro
- Nueva aplicación recibida
- Aplicación aceptada/rechazada
- Perfil verificado

---

### FASE 7: Funcionalidades Avanzadas
**Duración estimada: 3-4 iteraciones**

#### 7.1 Sistema de Evaluaciones
- Crear tabla `reviews` para evaluaciones mutuas
- Instituciones evalúan biólogos post-proyecto
- Biólogos evalúan experiencia con institución
- Mostrar rating en perfiles

#### 7.2 Sistema de Búsqueda Avanzada
- Búsqueda por texto libre
- Filtros combinados
- Ordenamiento múltiple
- Guardar búsquedas

#### 7.3 Exportación y Reportes
- Exportar CV desde perfil de biólogo
- Reportes de proyectos para instituciones
- Estadísticas de aplicaciones

---

### FASE 8: Monetización y Premium
**Duración estimada: 2-3 iteraciones**

#### 8.1 Planes de Suscripción
- Plan gratuito: funcionalidades básicas
- Plan Premium Biólogo: destacar perfil, más aplicaciones
- Plan Premium Institución: proyectos ilimitados, analytics

#### 8.2 Integración de Pagos (Stripe)
- Página de planes y precios
- Checkout para suscripciones
- Gestión de suscripción activa
- Webhooks para eventos de pago

---

## Tablas de Base de Datos Adicionales (Futuras)

### messages
- id, sender_id, recipient_id, subject, content, read_at, created_at

### notifications  
- id, user_id, type, title, message, read, data, created_at

### reviews
- id, reviewer_id, reviewed_id, project_id, rating, comment, created_at

### saved_projects (favoritos)
- id, biologist_id, project_id, created_at

### subscriptions (si se implementa monetización)
- id, user_id, plan, stripe_customer_id, status, current_period_end

---

## Consideraciones de Seguridad

1. **RLS ya configurado** para todas las tablas principales
2. **Solo biólogos verificados** pueden aplicar a proyectos
3. **Verificación de email** antes de activar cuenta
4. **Roles separados** en tabla user_roles (evita escalación de privilegios)
5. **Storage con políticas** para fotos y logos
6. **Rate limiting** en Edge Functions para prevenir abuso

# Plan Completo: BioRD - Plataforma SaaS

## Resumen Ejecutivo

Este plan transformará BioRD de una landing page con datos de demostración a una plataforma SaaS completa que conecta biólogos dominicanos con proyectos de conservación e investigación.

---

## Estado Actual

### Ya Implementado
- Landing page con diseño profesional (Hero, Biólogos, Proyectos, CTA)
- Componentes UI personalizados (botones, badges, cards)
- Datos de demostración en mockData.ts
- Base de datos completa con tablas: biologist_profiles, institutions, projects, project_applications, user_roles
- Políticas RLS de seguridad configuradas
- Funciones helper para verificación de roles

### Pendiente
- Sistema de autenticación completo
- Conexión con datos reales de la base de datos
- Dashboards para cada tipo de usuario
- Formularios de registro y gestión
- Sistema de notificaciones
- Panel de administración

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

## Fases de Implementación

### FASE 1: Autenticación y Registro
**Duración estimada: 3-4 iteraciones**

#### 1.1 Sistema de Autenticación Base
- Crear páginas `/auth/login` y `/auth/register`
- Implementar AuthContext para manejo de sesión global
- Componente ProtectedRoute para rutas protegidas
- Redirecciones según estado de autenticación

#### 1.2 Flujo de Registro de Biólogo
- Formulario multi-paso con validación Zod:
  - Paso 1: Datos básicos (nombre, email, contraseña)
  - Paso 2: Perfil profesional (especialidades, roles, experiencia)
  - Paso 3: Disponibilidad y ubicación
- Guardar perfil en `biologist_profiles` con estado `pending`
- Email de confirmación de registro

#### 1.3 Flujo de Registro de Institución
- Formulario de registro de institución:
  - Datos de la organización (nombre, descripción, sitio web)
  - Subida de logo (Storage)
  - Datos del administrador
- Crear registro en `institutions` con `created_by = user_id`

#### 1.4 Recuperación de Contraseña
- Página `/auth/forgot-password`
- Página `/auth/reset-password`
- Integración con emails transaccionales

---

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

## Estructura de Archivos Propuesta

```text
src/
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   ├── BiologistRegistration.tsx
│   │   └── InstitutionRegistration.tsx
│   ├── dashboard/
│   │   ├── DashboardLayout.tsx
│   │   ├── Sidebar.tsx
│   │   ├── ProfileCard.tsx
│   │   └── ApplicationsTable.tsx
│   ├── institution/
│   │   ├── ProjectForm.tsx
│   │   ├── ApplicationsList.tsx
│   │   └── InstitutionSettings.tsx
│   └── admin/
│       ├── AdminLayout.tsx
│       ├── VerificationQueue.tsx
│       └── StatsCards.tsx
├── contexts/
│   └── AuthContext.tsx
├── hooks/
│   ├── useAuth.ts
│   ├── useBiologists.ts
│   ├── useProjects.ts
│   ├── useApplications.ts
│   └── useNotifications.ts
├── pages/
│   ├── auth/
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   └── ForgotPassword.tsx
│   ├── dashboard/
│   │   ├── Index.tsx
│   │   ├── Profile.tsx
│   │   ├── Applications.tsx
│   │   └── Projects.tsx
│   ├── institution/
│   │   ├── Dashboard.tsx
│   │   ├── Projects.tsx
│   │   ├── NewProject.tsx
│   │   └── Applications.tsx
│   ├── admin/
│   │   ├── Index.tsx
│   │   ├── Verifications.tsx
│   │   └── Users.tsx
│   ├── Biologists.tsx
│   ├── BiologistProfile.tsx
│   ├── Projects.tsx
│   └── ProjectDetail.tsx
└── lib/
    ├── validations/
    │   ├── auth.ts
    │   ├── profile.ts
    │   └── project.ts
    └── constants.ts
```

---

## Tablas de Base de Datos Adicionales

Se necesitarán las siguientes tablas adicionales:

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

---

## Orden de Implementación Recomendado

1. **Autenticación básica** (login/register) - Fundamental
2. **Registro de biólogo** con perfil completo
3. **Hooks de datos** y conexión con base de datos real
4. **Dashboard del biólogo** para gestión de perfil
5. **Sistema de aplicaciones** para proyectos
6. **Registro de institución** y dashboard
7. **Gestión de proyectos** por instituciones
8. **Panel de administración** para verificaciones
9. **Notificaciones** y comunicación
10. **Funcionalidades premium** (opcional)

---

## Siguiente Paso Inmediato

Para comenzar, recomiendo implementar la **Fase 1: Autenticación y Registro**, específicamente:

1. Crear AuthContext y hook useAuth
2. Páginas de Login y Register
3. Componente ProtectedRoute
4. Formulario de registro de biólogo multi-paso

Esto establecerá la base necesaria para todas las demás funcionalidades.
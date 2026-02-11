# BioRD: Roadmap para Lanzamiento SaaS Premium

Este documento detalla los pasos técnicos y estratégicos necesarios para convertir el prototipo actual en una plataforma SaaS comercial operativa y lista para producción.

---

## 🏗️ 1. Infraestructura de Datos (Powering the Machine)
*Actualmente la aplicación utiliza datos estáticos (mock data). Es crítico migrar a una base de datos real.*

- [ ] **Migración a Supabase (PostgreSQL)**:
    - Crear esquema de base de datos para `perfiles_biologos`, `proyectos`, `instituciones` y `blog`.
    - Implementar Row Level Security (RLS) para proteger los datos privados.
- [ ] **Sincronización de Hooks**:
    - Reemplazar `mockData.ts` por llamadas reales utilizando `react-query` y el cliente de Supabase.
- [ ] **Almacenamiento de Archivos (Buckets)**:
    - Configurar storage para fotos de perfil, PDFs de títulos académicos y documentos de proyectos.

---

## 🔒 2. Seguridad y Autenticación
*Pasar del "Demo Mode" a un sistema de identidad robusto.*

- [ ] **Flujo de Auth Real**:
    - Habilitar Login vía Email/Password y Social Auth (Google/LinkedIn).
    - Implementar "Protected Routes" para evitar acceso a paneles de administración sin permisos.
- [ ] **Sistema de Roles (RBAC)**:
    - Asegurar que una Institución no pueda ver el Wizard de Verificación de un Biólogo y viceversa.
- [ ] **Validación KYC (Know Your Professional)**:
    - Implementar la lógica del servidor para que los administradores aprueben o rechacen documentos subidos en el Wizard.

---

## 💳 3. Monetización y Pagos (Stripe Integration)
*El corazón del modelo de negocio.*

- [ ] **Integración de Stripe Billing**:
    - Conectar los planes de `Pricing.tsx` con productos reales en el Dashboard de Stripe.
    - Implementar Stripe Checkout para suscripciones (Pro y Enterprise).
- [ ] **Webhooks de Facturación**:
    - Crear una función (Edge Function) que escuche cuando un pago es exitoso para actualizar el estado del usuario a "PRO" automáticamente.
- [ ] **Gestión de Portal del Cliente**:
    - Permitir que los usuarios cancelen o cambien de plan de forma autónoma.

---

## 📈 4. SEO Avanzado y Marketing de Contenidos
*Asegurar que BioRD sea la primera opción en Google.*

- [ ] **Generación Dinámica de Sitemaps**:
    - Crear un script que genere un `sitemap.xml` incluyendo todos los biólogos públicos y proyectos.
- [ ] **Optimización de Velocidad (Core Web Vitals)**:
    - Implementar carga perezosa (lazy load) de imágenes y componentes pesados.
    - Asegurar que el LCP (Largest Contentful Paint) sea menor a 2.5s.
- [ ] **Consola de Búsqueda (Google Search Console)**:
    - Indexar la página y monitorear palabras clave como "Biólogos en Dominicana" o "Gestión de Biodiversidad".

---

## 🚀 5. Despliegue y Lanzamiento Online
*Poner la plataforma en manos de los usuarios.*

- [ ] **Configuración de Dominio**:
    - Adquirir y configurar `biord.do` o un dominio similar con SSL (HTTPS) obligatorio.
- [ ] **CI/CD (Continuous Integration/Deployment)**:
    - Configurar GitHub Actions o Vercel/Netlify para que cada cambio aprobado se suba a producción automáticamente tras pasar los tests.
- [ ] **Variables de Entorno (.env)**:
    - Mover todas las API Keys (Stripe, Supabase, Google) a un entorno secreto fuera del código.

---

## ✨ 6. Pulido de Experiencia Premium (UX 2.0)
*Detalles que separan un MVP de un producto de $100/mes.*

- [ ] **Skeleton Loaders**: Implementar estados de carga elegantes para evitar saltos visuales mientras cargan los datos.
- [ ] **Sistema de Notificaciones Reales**: Pasar de notificaciones estáticas a alertas basadas en eventos (ej: "Tu perfil ha sido verificado").
- [ ] **Modo Offline Básico**: Implementar un PWA (Progressive Web App) para que la app sea instalable en móviles.

---

## ⚖️ 7. Legal y Cumplimiento
- [ ] **Auditoría Legal**: Validar los Términos de Uso y Privacidad según las leyes de protección de datos de República Dominicana e internacionales (si aplica).
- [ ] **Consentimiento de Cookies**: Implementar el banner obligatorio de gestión de privacidad.

---
> [!TIP]
> **Prioridad Recomendada**: 
> 1. Base de Datos -> 2. Autenticación -> 3. Pagos -> 4. Despliegue. 
> Con estos 4 pilares, BioRD deja de ser una demo para ser una empresa real.

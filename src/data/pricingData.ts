export interface PlanFeature {
    text: string;
    included: boolean;
}

export interface PricingPlan {
    id: string;
    name: string;
    price: string;
    period: string;
    description: string;
    features: PlanFeature[];
    buttonText: string;
    highlighted?: boolean;
}

export const biologistPlans: PricingPlan[] = [
    {
        id: "bio-free",
        name: "Explorador",
        price: "$0",
        period: "/mes",
        description: "Para biólogos que están empezando.",
        features: [
            { text: "Perfil público básico", included: true },
            { text: "Hasta 3 aplicaciones simultáneas", included: true },
            { text: "Acceso a directorio de proyectos", included: true },
            { text: "Mensajería básica", included: true },
            { text: "Badge de verificación", included: false },
            { text: "Exportación de CV en PDF", included: false },
            { text: "Soporte prioritario", included: false },
        ],
        buttonText: "Continuar Gratis",
    },
    {
        id: "bio-pro",
        name: "Profesional",
        price: "$19",
        period: "/mes",
        description: "Maximiza tus oportunidades laborales.",
        features: [
            { text: "Perfil destacado en búsquedas", included: true },
            { text: "Aplicaciones ilimitadas", included: true },
            { text: "Exportación de CV ilimitada", included: true },
            { text: "Badge de Usuario Pro", included: true },
            { text: "Estadísticas de visualizaciones", included: true },
            { text: "Soporte prioritario", included: true },
            { text: "Acceso temprano a proyectos", included: true },
        ],
        buttonText: "Empezar Pro",
        highlighted: true,
    },
];

export const institutionPlans: PricingPlan[] = [
    {
        id: "inst-free",
        name: "Base",
        price: "$0",
        period: "/mes",
        description: "Publica proyectos ocasionalmente.",
        features: [
            { text: "1 Proyecto activo", included: true },
            { text: "Revisión de aplicaciones manual", included: true },
            { text: "Dashboards básicos", included: true },
            { text: "Analytics avanzado", included: false },
            { text: "Filtros IA de candidatos", included: false },
            { text: "Exportación masiva de datos", included: false },
        ],
        buttonText: "Empezar Gratis",
    },
    {
        id: "inst-pro",
        name: "Institucional",
        price: "$99",
        period: "/mes",
        description: "Gestión avanzada para organizaciones.",
        features: [
            { text: "Proyectos ilimitados", included: true },
            { text: "Analytics completo", included: true },
            { text: "Exportación masiva de aplicaciones", included: true },
            { text: "Proyectos destacados", included: true },
            { text: "Asistente de filtrado con IA", included: true },
            { text: "Personalización de marca", included: true },
        ],
        buttonText: "Empezar Pro",
        highlighted: true,
    },
];

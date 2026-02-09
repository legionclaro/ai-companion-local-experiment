export type UserRole = "biologist" | "institution" | "admin";

export interface DemoUser {
    id: string;
    email: string;
    role: UserRole;
    name: string;
    description: string;
    dashboardPath: string;
}

export const demoUsers: DemoUser[] = [
    {
        id: "demo-biologist",
        email: "biologo@demo.com",
        role: "biologist",
        name: "Dra. María Santos",
        description: "Biólogo marino especializado en conservación de arrecifes",
        dashboardPath: "/dashboard",
    },
    {
        id: "demo-institution",
        email: "institucion@demo.com",
        role: "institution",
        name: "Ministerio de Medio Ambiente",
        description: "Institución encargada de publicar proyectos de investigación",
        dashboardPath: "/institution",
    },
    {
        id: "demo-admin",
        email: "admin@demo.com",
        role: "admin",
        name: "Administrador Principal",
        description: "Administrador con acceso completo a la plataforma",
        dashboardPath: "/admin",
    },
];

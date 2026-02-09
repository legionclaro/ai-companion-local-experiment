export interface Notification {
    id: string;
    type: "application" | "verification" | "message" | "project" | "system";
    title: string;
    message: string;
    read: boolean;
    createdAt: string;
    link?: string;
}

export const mockNotifications: Notification[] = [
    {
        id: "notif-1",
        type: "application",
        title: "Nueva aplicación recibida",
        message: "Dr. Carlos Méndez aplicó a tu proyecto 'Conservación de Tortugas Marinas'",
        read: false,
        createdAt: "2024-02-10T10:30:00Z",
        link: "/institution/applications",
    },
    {
        id: "notif-2",
        type: "verification",
        title: "Perfil verificado",
        message: "¡Felicidades! Tu perfil ha sido verificado por el equipo de BioRD",
        read: false,
        createdAt: "2024-02-10T09:15:00Z",
    },
    {
        id: "notif-3",
        type: "message",
        title: "Nuevo mensaje",
        message: "Ministerio de Medio Ambiente te envió un mensaje",
        read: false,
        createdAt: "2024-02-09T16:45:00Z",
        link: "/dashboard/messages",
    },
    {
        id: "notif-4",
        type: "application",
        title: "Aplicación aceptada",
        message: "Tu aplicación al proyecto 'Monitoreo de Aves' fue aceptada",
        read: true,
        createdAt: "2024-02-09T14:20:00Z",
        link: "/dashboard/applications",
    },
    {
        id: "notif-5",
        type: "project",
        title: "Nuevo proyecto disponible",
        message: "Se publicó un nuevo proyecto que coincide con tu perfil",
        read: true,
        createdAt: "2024-02-08T11:00:00Z",
        link: "/projects",
    },
    {
        id: "notif-6",
        type: "system",
        title: "Actualización del sistema",
        message: "BioRD ha implementado nuevas funcionalidades en la plataforma",
        read: true,
        createdAt: "2024-02-07T08:00:00Z",
    },
];

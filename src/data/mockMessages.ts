export interface Message {
    id: string;
    conversationId: string;
    senderId: string;
    senderName: string;
    senderRole: "biologist" | "institution" | "admin";
    content: string;
    timestamp: string;
    read: boolean;
}

export interface Conversation {
    id: string;
    participantId: string;
    participantName: string;
    participantRole: "biologist" | "institution" | "admin";
    lastMessage: string;
    lastMessageTime: string;
    unreadCount: number;
}

export const mockConversations: Conversation[] = [
    {
        id: "conv-1",
        participantId: "user-inst-1",
        participantName: "Ministerio de Medio Ambiente",
        participantRole: "institution",
        lastMessage: "Nos gustaría conocer más sobre tu experiencia con tortugas marinas.",
        lastMessageTime: "2024-02-10T09:30:00Z",
        unreadCount: 2,
    },
    {
        id: "conv-2",
        participantId: "user-bio-2",
        participantName: "Dr. Carlos Méndez",
        participantRole: "biologist",
        lastMessage: "Gracias por aceptar mi aplicación al proyecto.",
        lastMessageTime: "2024-02-09T15:20:00Z",
        unreadCount: 0,
    },
    {
        id: "conv-3",
        participantId: "user-inst-2",
        participantName: "CEBSE",
        participantRole: "institution",
        lastMessage: "¿Cuándo estarías disponible para una reunión?",
        lastMessageTime: "2024-02-08T11:45:00Z",
        unreadCount: 1,
    },
];

export const mockMessages: Record<string, Message[]> = {
    "conv-1": [
        {
            id: "msg-1",
            conversationId: "conv-1",
            senderId: "user-inst-1",
            senderName: "Ministerio de Medio Ambiente",
            senderRole: "institution",
            content: "Hola, vimos tu perfil y nos interesa tu experiencia.",
            timestamp: "2024-02-10T09:00:00Z",
            read: true,
        },
        {
            id: "msg-2",
            conversationId: "conv-1",
            senderId: "current-user",
            senderName: "Tú",
            senderRole: "biologist",
            content: "¡Hola! Muchas gracias por contactarme. Estaré encantada de colaborar.",
            timestamp: "2024-02-10T09:15:00Z",
            read: true,
        },
        {
            id: "msg-3",
            conversationId: "conv-1",
            senderId: "user-inst-1",
            senderName: "Ministerio de Medio Ambiente",
            senderRole: "institution",
            content: "Nos gustaría conocer más sobre tu experiencia con tortugas marinas.",
            timestamp: "2024-02-10T09:30:00Z",
            read: false,
        },
    ],
    "conv-2": [
        {
            id: "msg-4",
            conversationId: "conv-2",
            senderId: "user-bio-2",
            senderName: "Dr. Carlos Méndez",
            senderRole: "biologist",
            content: "Buenos días, apliqué a su proyecto de monitoreo de aves.",
            timestamp: "2024-02-09T10:00:00Z",
            read: true,
        },
        {
            id: "msg-5",
            conversationId: "conv-2",
            senderId: "current-user",
            senderName: "Tú",
            senderRole: "institution",
            content: "Hemos revisado tu aplicación y nos encantaría que te unas al equipo.",
            timestamp: "2024-02-09T14:30:00Z",
            read: true,
        },
        {
            id: "msg-6",
            conversationId: "conv-2",
            senderId: "user-bio-2",
            senderName: "Dr. Carlos Méndez",
            senderRole: "biologist",
            content: "Gracias por aceptar mi aplicación al proyecto.",
            timestamp: "2024-02-09T15:20:00Z",
            read: true,
        },
    ],
    "conv-3": [
        {
            id: "msg-7",
            conversationId: "conv-3",
            senderId: "user-inst-2",
            senderName: "CEBSE",
            senderRole: "institution",
            content: "¿Cuándo estarías disponible para una reunión?",
            timestamp: "2024-02-08T11:45:00Z",
            read: false,
        },
    ],
};

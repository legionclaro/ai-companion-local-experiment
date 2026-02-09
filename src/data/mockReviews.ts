export interface Review {
    id: string;
    reviewerId: string;
    reviewerName: string;
    reviewerType: "institution" | "biologist";
    targetId: string;
    targetType: "biologist" | "institution";
    projectId?: string;
    projectTitle?: string;
    rating: number; // 1-5 stars
    comment: string;
    createdAt: string;
}

export const mockReviews: Review[] = [
    {
        id: "rev-1",
        reviewerId: "inst-1",
        reviewerName: "Ministerio de Medio Ambiente",
        reviewerType: "institution",
        targetId: "bio-1",
        targetType: "biologist",
        projectId: "proj-1",
        projectTitle: "Conservación de Tortugas Marinas",
        rating: 5,
        comment: "Excelente trabajo en campo. Muy profesional y dedicada. Los resultados superaron nuestras expectativas.",
        createdAt: "2024-02-05T10:00:00Z",
    },
    {
        id: "rev-2",
        reviewerId: "inst-2",
        reviewerName: "CEBSE",
        reviewerType: "institution",
        targetId: "bio-1",
        targetType: "biologist",
        projectId: "proj-2",
        projectTitle: "Monitoreo de Aves Endémicas",
        rating: 4,
        comment: "Gran conocimiento técnico y buena comunicación con el equipo. Recomendado para proyectos futuros.",
        createdAt: "2024-01-20T14:30:00Z",
    },
    {
        id: "rev-3",
        reviewerId: "inst-3",
        reviewerName: "Universidad Autónoma de Santo Domingo",
        reviewerType: "institution",
        targetId: "bio-1",
        targetType: "biologist",
        projectId: "proj-3",
        projectTitle: "Estudio de Ecosistemas Costeros",
        rating: 5,
        comment: "Investigadora excepcional. Sus aportes fueron fundamentales para el éxito del proyecto.",
        createdAt: "2023-12-10T09:15:00Z",
    },
    {
        id: "rev-4",
        reviewerId: "bio-2",
        reviewerName: "Dr. Carlos Méndez",
        reviewerType: "biologist",
        targetId: "inst-1",
        targetType: "institution",
        projectId: "proj-4",
        projectTitle: "Reforestación en Zona Protegida",
        rating: 4,
        comment: "Buena organización del proyecto. El proceso de aplicación fue transparente y eficiente.",
        createdAt: "2024-01-15T11:00:00Z",
    },
];

export const getAverageRating = (targetId: string): number => {
    const reviews = mockReviews.filter(r => r.targetId === targetId);
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return Math.round((sum / reviews.length) * 10) / 10;
};

export const getReviewsForTarget = (targetId: string): Review[] => {
    return mockReviews.filter(r => r.targetId === targetId);
};

export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    category: "Ciencia" | "Institucional" | "Carrera" | "Biodiversidad";
    date: string;
    image: string;
    readTime: string;
}

export const BLOG_POSTS: BlogPost[] = [
    {
        id: "1",
        slug: "futuro-biologia-marina-dominicana",
        title: "El Futuro de la Biología Marina en la República Dominicana",
        excerpt: "Exploramos cómo las nuevas tecnologías están ayudando a preservar los arrecifes de coral en nuestras costas.",
        content: `
      <p>La biología marina en la República Dominicana está entrando en una nueva era dorada. Con más de 1,200 kilómetros de costa, nuestro país se encuentra en una posición única para liderar la investigación científica en el Caribe.</p>
      <h2>El papel de la tecnología</h2>
      <p>Desde el uso de drones submarinos hasta la secuenciación genética in-situ, los biólogos dominicanos están adoptando herramientas que antes solo estaban disponibles en laboratorios de primer mundo.</p>
      <blockquote>"La biodiversidad no es solo un recurso natural, es nuestro mayor activo intelectual."</blockquote>
      <p>En este artículo, detallamos los 5 proyectos más impactantes que están ocurriendo ahora mismo...</p>
    `,
        author: "Dra. Marina Santos",
        category: "Biodiversidad",
        date: "2024-02-15",
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800",
        readTime: "5 min"
    },
    {
        id: "2",
        slug: "como-conseguir-financiamiento-proyectos-cientificos",
        title: "Guía: Cómo conseguir financiamiento para tus proyectos",
        excerpt: "Consejos prácticos para biólogos que buscan apoyo institucional o internacional para sus investigaciones.",
        content: `
      <p>Conseguir fondos es una de las tareas más difíciles pero cruciales para cualquier científico. Aquí te explicamos cómo estructurar tu propuesta para que sea irresistible para las instituciones.</p>
      <h2>Claridad y Impacto</h2>
      <p>Las instituciones no solo buscan ciencia, buscan resultados tangibles que puedan reportar a sus stakeholders.</p>
    `,
        author: "Lic. Roberto Mejía",
        category: "Institucional",
        date: "2024-02-10",
        image: "https://images.unsplash.com/photo-1454165833767-027ffea9e778?q=80&w=800",
        readTime: "8 min"
    },
    {
        id: "3",
        slug: "habilidades-digitales-biologos-2024",
        title: "Habilidades Digitales que todo Biólogo debe tener en 2024",
        excerpt: "Del laboratorio al código: por qué aprender Python y manejo de datos es esencial hoy en día.",
        content: `
      <p>El laboratorio moderno ya no solo consiste en tubos de ensayo. El manejo de grandes volúmenes de datos (Big Data) es la nueva frontera.</p>
    `,
        author: "BioRD Team",
        category: "Carrera",
        date: "2024-02-05",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800",
        readTime: "6 min"
    }
];

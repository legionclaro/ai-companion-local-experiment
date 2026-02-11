import { Helmet } from "react-helmet-async";

interface SEOProps {
    title?: string;
    description?: string;
    type?: string;
    name?: string;
    image?: string;
}

export default function SEO({
    title,
    description = "BioRD: Conectando biólogos elite con instituciones globales para proyectos de biodiversidad e impacto científico.",
    type = "website",
    name = "BioRD",
    image = "https://lovable.dev/opengraph-image-p98pqg.png" // Replace with actual project image later
}: SEOProps) {
    const fullTitle = title ? `${title} | ${name}` : name;

    return (
        <Helmet>
            {/* Standard metadata tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta name="twitter:creator" content={name} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
        </Helmet>
    );
}

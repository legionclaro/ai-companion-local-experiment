import { useParams, Link, Navigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, ArrowLeft, Share2 } from "lucide-react";
import { useBlogPost } from "@/hooks/useBlog";
import SEO from "@/components/common/SEO";
import { Skeleton } from "@/components/ui/skeleton";

export default function BlogPost() {
    const { slug } = useParams();
    const { data: post, isLoading } = useBlogPost(slug || "") as { data: any, isLoading: boolean };

    if (!isLoading && !post) {
        return <Navigate to="/404" replace />;
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background text-foreground">
                <Header />
                <div className="container mx-auto px-4 py-24 max-w-4xl space-y-8">
                    <Skeleton className="h-10 w-32" />
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-10 w-2/3" />
                    <Skeleton className="h-[400px] w-full rounded-3xl" />
                    <div className="space-y-4">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <SEO title={post.title || "Artículo"} description={post.excerpt || ""} image={post.image} />
            <Header />
            <PageTransition
                title={post.title || "Artículo"}
                description={post.excerpt || ""}
            >
                <article className="container mx-auto px-4 py-12 max-w-4xl mt-16">
                    <Button variant="ghost" size="sm" asChild className="mb-8">
                        <Link to="/blog" className="flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" /> Volver al blog
                        </Link>
                    </Button>

                    <header className="mb-12">
                        <Badge className="mb-4">{post.category || "General"}</Badge>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif leading-tight mb-6">
                            {post.title || "Untitled"}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-muted-foreground text-sm border-b pb-8">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                    <User className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <p className="font-medium text-foreground">{post.author || "Anónimo"}</p>
                                    <p>Equipo BioRD</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{post.date ? new Date(post.date).toLocaleDateString('es-ES', { dateStyle: 'long' }) : "Reciente"}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>{post.read_time} de lectura</span>
                            </div>
                            <Button variant="outline" size="icon" className="ml-auto rounded-full">
                                <Share2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </header>

                    <div className="aspect-video rounded-3xl overflow-hidden mb-12 shadow-xl">
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                    </div>

                    <div
                        className="prose prose-lg prose-emerald dark:prose-invert max-w-none prose-headings:font-serif prose-headings:font-bold"
                        dangerouslySetInnerHTML={{ __html: post.content || "" }}
                    />

                    <section className="mt-20 pt-12 border-t text-center">
                        <h3 className="text-2xl font-serif font-bold mb-4">¿Te interesó este tema?</h3>
                        <p className="text-muted-foreground mb-8">
                            Únete a BioRD para colaborar con expertos y acceder a proyectos exclusivos.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Button size="lg" asChild>
                                <Link to="/auth/register/biologist">Registrarme como Biólogo</Link>
                            </Button>
                            <Button variant="outline" size="lg" asChild>
                                <Link to="/auth/register/institution">Soy una Institución</Link>
                            </Button>
                        </div>
                    </section>
                </article>
            </PageTransition>
            <Footer />
        </div>
    );
}

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import { useBlogPosts } from "@/hooks/useBlog";
import { Link } from "react-router-dom";
import SEO from "@/components/common/SEO";
import { Skeleton } from "@/components/ui/skeleton";

export default function BlogIndex() {
    const { data: posts, isLoading } = useBlogPosts();

    return (
        <div className="min-h-screen bg-background">
            <SEO title="Blog Científico" description="Artículos exclusivos sobre ciencia, carrera profesional y gestión institucional de biodiversidad." />
            <Header />
            <PageTransition
                title="Blog Científico"
                description="Explora las últimas noticias, guías y avances en el mundo de la biología y la biodiversidad en BioRD."
            >
                <main className="container mx-auto px-4 py-12 mt-16">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6">Conocimiento que Impacta</h1>
                        <p className="text-lg text-muted-foreground">
                            Artículos exclusivos sobre ciencia, carrera profesional y gestión institucional de biodiversidad.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {isLoading ? (
                            Array(3).fill(0).map((_, i) => (
                                <Card key={i} className="overflow-hidden border-none shadow-soft flex flex-col h-full">
                                    <Skeleton className="aspect-video w-full" />
                                    <div className="p-6 space-y-4 flex-grow">
                                        <div className="flex gap-2">
                                            <Skeleton className="h-5 w-16" />
                                            <Skeleton className="h-5 w-16" />
                                        </div>
                                        <Skeleton className="h-7 w-full" />
                                        <Skeleton className="h-4 w-5/6" />
                                    </div>
                                    <div className="p-6 border-t mt-auto">
                                        <Skeleton className="h-4 w-24" />
                                    </div>
                                </Card>
                            ))
                        ) : (
                            posts?.map((post: any) => (
                                <Card key={post.id} className="group overflow-hidden border-none shadow-soft hover:shadow-xl transition-all duration-300 flex flex-col">
                                    <div className="aspect-video overflow-hidden">
                                        <img
                                            src={post.image || "/placeholder.jpg"}
                                            alt={post.title || "Post"}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                    <CardHeader className="flex-grow">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Badge variant="secondary" className="bg-primary/10 text-primary-foreground border-none">
                                                {post.category || "General"}
                                            </Badge>
                                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                <Clock className="w-3 h-3" /> {post.read_time || "5 min"}
                                            </span>
                                        </div>
                                        <CardTitle className="font-serif text-xl leading-tight group-hover:text-primary transition-colors">
                                            <Link to={`/blog/${post.slug}`}>{post.title || "Untitled"}</Link>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground text-sm line-clamp-2">
                                            {post.excerpt || ""}
                                        </p>
                                    </CardContent>
                                    <CardFooter className="pt-0 flex items-center justify-between mt-auto">
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <User className="w-3 h-3" />
                                            <span>{post.author || "Anónimo"}</span>
                                        </div>
                                        <Button variant="ghost" size="sm" asChild className="group-hover:translate-x-1 transition-transform">
                                            <Link to={`/blog/${post.slug}`} className="flex items-center gap-2">
                                                Leer más <ArrowRight className="w-4 h-4" />
                                            </Link>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))
                        )}
                    </div>

                    {!isLoading && posts?.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-muted-foreground italic">Próximamente más artículos...</p>
                        </div>
                    )}
                </main>
            </PageTransition>
            <Footer />
        </div>
    );
}

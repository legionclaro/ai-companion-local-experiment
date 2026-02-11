import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    FileText,
    Search,
    Plus,
    Edit,
    Trash2,
    Globe,
    Settings,
    Eye,
    CheckCircle2,
    AlertCircle,
    BarChart2
} from "lucide-react";
import { BLOG_POSTS, BlogPost } from "@/data/blogData";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function BlogManager() {
    const [posts, setPosts] = useState<BlogPost[]>(BLOG_POSTS);
    const [isEditing, setIsEditing] = useState(false);
    const [currentPost, setCurrentPost] = useState<Partial<BlogPost> | null>(null);

    // SEO Analysis Mock Function
    const analyzeSEO = (title: string, content: string, keywords: string) => {
        const score = Math.floor(Math.random() * (95 - 60 + 1)) + 60; // Mock score
        return {
            score,
            status: score > 80 ? "En excelente estado" : "Necesita mejoras",
            checks: [
                { label: "Palabra clave en el título", pass: title.toLowerCase().includes(keywords.toLowerCase()) },
                { label: "Longitud de meta descripción", pass: true },
                { label: "Legibilidad de contenido", pass: content.length > 300 },
                { label: "Atributos Alt en imágenes", pass: false }
            ]
        };
    };

    const handleEdit = (post: BlogPost) => {
        setCurrentPost(post);
        setIsEditing(true);
    };

    const handleCreate = () => {
        setCurrentPost({
            title: "",
            slug: "",
            excerpt: "",
            content: "",
            category: "Ciencia",
            author: "Admin",
            date: new Date().toISOString().split('T')[0],
            image: "https://images.unsplash.com/photo-1518152006812-edab29b069ac?q=80&w=800",
            readTime: "5 min"
        });
        setIsEditing(true);
    };

    if (isEditing && currentPost) {
        const seo = analyzeSEO(currentPost.title || "", currentPost.content || "", "biología");

        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <Button variant="ghost" onClick={() => setIsEditing(false)} className="mb-2 pl-0">
                            &larr; Volver a la lista
                        </Button>
                        <h1 className="text-3xl font-bold font-serif">
                            {currentPost.id ? "Editar Entrada" : "Nueva Entrada"}
                        </h1>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={() => setIsEditing(false)}>Descartar</Button>
                        <Button onClick={() => {
                            alert("Entrada guardada con éxito.");
                            setIsEditing(false);
                        }}>Publicar Entrada</Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Editor */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Contenido Principal</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Título de la Entrada</Label>
                                    <Input
                                        value={currentPost.title}
                                        onChange={(e) => setCurrentPost({ ...currentPost, title: e.target.value })}
                                        placeholder="Escribe un título atractivo..."
                                        className="text-lg font-serif"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Contenido (Markdown/HTML)</Label>
                                    <Textarea
                                        value={currentPost.content}
                                        onChange={(e) => setCurrentPost({ ...currentPost, content: e.target.value })}
                                        placeholder="Empieza a escribir tu artículo científico..."
                                        className="min-h-[400px] font-mono text-sm"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Extracto (Resumen corto)</Label>
                                    <Textarea
                                        value={currentPost.excerpt}
                                        onChange={(e) => setCurrentPost({ ...currentPost, excerpt: e.target.value })}
                                        placeholder="Breve resumen para los feeds de redes sociales y búsqueda."
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* SEO & Settings Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        <Card className="border-primary/20 shadow-md">
                            <CardHeader className="bg-primary/5">
                                <CardTitle className="flex items-center gap-2 text-primary">
                                    <BarChart2 className="w-5 h-5" /> Análisis SEO
                                </CardTitle>
                                <CardDescription>Indicaciones en tiempo real tipo WordPress</CardDescription>
                            </CardHeader>
                            <CardContent className="pt-6 space-y-6">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Calificación SEO</span>
                                    <Badge className={seo.score > 80 ? "bg-emerald-500" : "bg-orange-500"}>
                                        {seo.score}/100
                                    </Badge>
                                </div>

                                <div className="space-y-3">
                                    {seo.checks.map((check, i) => (
                                        <div key={i} className="flex items-center gap-2 text-sm">
                                            {check.pass ? (
                                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                            ) : (
                                                <AlertCircle className="w-4 h-4 text-orange-500" />
                                            )}
                                            <span className={check.pass ? "text-foreground" : "text-muted-foreground"}>
                                                {check.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-4 border-t space-y-4">
                                    <div className="space-y-2">
                                        <Label className="text-xs uppercase tracking-wider text-muted-foreground">Palabra Clave Objetivo</Label>
                                        <Input placeholder="Ej: biodiversidad, arrecifes..." defaultValue="biología" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-xs uppercase tracking-wider text-muted-foreground">URL Slug</Label>
                                        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                                            biord.do/blog/ <span className="text-primary font-medium">{currentPost.slug || "titulo-de-entrada"}</span>
                                        </div>
                                        <Input
                                            value={currentPost.slug}
                                            onChange={(e) => setCurrentPost({ ...currentPost, slug: e.target.value })}
                                            placeholder="slug-de-la-url"
                                        />
                                    </div>
                                </div>

                                <div className="p-3 bg-muted rounded-lg text-xs space-y-2">
                                    <p className="font-bold flex items-center gap-1">
                                        <Eye className="w-3 h-3" /> Vista Previa de Google
                                    </p>
                                    <p className="text-blue-600 font-medium truncate">{currentPost.title || "Título del post..."} | BioRD</p>
                                    <p className="text-emerald-700 truncate font-mono">https://biord.do/blog/{currentPost.slug || "slug"}</p>
                                    <p className="text-muted-foreground line-clamp-2">{currentPost.excerpt || "Escribe un extracto para ver la vista previa..."}</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Ajustes de Publicación</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Categoría</Label>
                                    <select className="w-full h-10 px-3 rounded-md border border-input bg-background">
                                        <option>Ciencia</option>
                                        <option>Institucional</option>
                                        <option>Carrera</option>
                                        <option>Biodiversidad</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Imagen Destacada</Label>
                                    <div className="aspect-video bg-muted rounded-lg border-2 border-dashed flex items-center justify-center overflow-hidden">
                                        {currentPost.image ? (
                                            <img src={currentPost.image} className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-xs text-muted-foreground">Subir imagen</span>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-serif mb-2">Gestión de Blog</h1>
                    <p className="text-muted-foreground">
                        Administra los artículos científicos y noticias de la plataforma.
                    </p>
                </div>
                <Button onClick={handleCreate} className="gap-2">
                    <Plus className="w-4 h-4" /> Nueva Entrada
                </Button>
            </div>

            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Título</TableHead>
                                <TableHead>Categoría</TableHead>
                                <TableHead>Autor</TableHead>
                                <TableHead>Fecha</TableHead>
                                <TableHead>SEO Stat</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {posts.map((post) => (
                                <TableRow key={post.id} className="group">
                                    <TableCell className="font-medium">
                                        <div className="flex flex-col">
                                            <span>{post.title}</span>
                                            <span className="text-xs text-muted-foreground font-mono">/{post.slug}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className="bg-primary/10 text-primary-foreground font-normal">
                                            {post.category}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">{post.author}</TableCell>
                                    <TableCell className="text-muted-foreground text-sm">{post.date}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1 text-emerald-500 text-sm">
                                            <CheckCircle2 className="w-3 h-3" />
                                            Optiminizado
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button variant="ghost" size="icon" asChild>
                                                <a href={`/blog/${post.slug}`} target="_blank">
                                                    <Eye className="w-4 h-4" />
                                                </a>
                                            </Button>
                                            <Button variant="ghost" size="icon" onClick={() => handleEdit(post)}>
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}

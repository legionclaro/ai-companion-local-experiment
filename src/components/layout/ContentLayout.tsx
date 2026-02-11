import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { cn } from "@/lib/utils";

interface ContentLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle?: string;
    className?: string;
}

export default function ContentLayout({ children, title, subtitle, className }: ContentLayoutProps) {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />
            <main className="flex-grow pt-32 pb-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="mb-12 border-b pb-8">
                        <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">{title}</h1>
                        {subtitle && (
                            <p className="text-xl text-muted-foreground font-light">{subtitle}</p>
                        )}
                    </div>
                    <div className={cn("prose prose-slate max-w-none dark:prose-invert", className)}>
                        {children}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

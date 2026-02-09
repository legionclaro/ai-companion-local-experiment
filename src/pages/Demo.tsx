import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { demoUsers } from "@/lib/demoUsers";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { User, Building2, Shield, ArrowRight } from "lucide-react";

export default function DemoPage() {
    const { signInWithDemoUser } = useAuth();
    const navigate = useNavigate();

    const handleSelectUser = (userId: string) => {
        const user = demoUsers.find(u => u.id === userId);
        if (user) {
            signInWithDemoUser(user);
            navigate(user.dashboardPath);
        }
    };

    const getRoleIcon = (role: string) => {
        switch (role) {
            case "biologist":
                return <User className="w-8 h-8 text-blue-500" />;
            case "institution":
                return <Building2 className="w-8 h-8 text-purple-500" />;
            case "admin":
                return <Shield className="w-8 h-8 text-orange-500" />;
            default:
                return <User className="w-8 h-8" />;
        }
    };

    const getRoleColor = (role: string) => {
        switch (role) {
            case "biologist":
                return "from-blue-500/10 to-blue-500/5 border-blue-200";
            case "institution":
                return "from-purple-500/10 to-purple-500/5 border-purple-200";
            case "admin":
                return "from-orange-500/10 to-orange-500/5 border-orange-200";
            default:
                return "";
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/5 to-background flex items-center justify-center p-4">
            <div className="max-w-4xl w-full space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-bold font-serif">Modo Demo - BioRD</h1>
                    <p className="text-lg text-muted-foreground">
                        Selecciona un tipo de usuario para explorar la plataforma
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {demoUsers.map((user) => (
                        <Card
                            key={user.id}
                            className={`bg-gradient-to-br ${getRoleColor(user.role)} hover:shadow-lg transition-all cursor-pointer group`}
                            onClick={() => handleSelectUser(user.id)}
                        >
                            <CardHeader className="text-center">
                                <div className="flex justify-center mb-4">
                                    {getRoleIcon(user.role)}
                                </div>
                                <CardTitle className="text-xl">{user.name}</CardTitle>
                                <CardDescription className="text-xs uppercase tracking-wide font-semibold">
                                    {user.role === "biologist" && "Biólogo"}
                                    {user.role === "institution" && "Institución"}
                                    {user.role === "admin" && "Administrador"}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm text-muted-foreground text-center min-h-[60px]">
                                    {user.description}
                                </p>
                                <Button
                                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                                    variant="outline"
                                >
                                    Ingresar como {user.role === "biologist" ? "Biólogo" : user.role === "institution" ? "Institución" : "Admin"}
                                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                                <p className="text-xs text-center text-muted-foreground">
                                    {user.email}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="text-center">
                    <Button variant="ghost" onClick={() => navigate("/")}>
                        Volver al Inicio
                    </Button>
                </div>
            </div>
        </div>
    );
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, History, Zap, CheckCircle2, Download } from "lucide-react";

export default function Billing() {
    const invoices = [
        { id: "INV-001", date: "2024-02-01", amount: "$19.00", status: "Pagado" },
        { id: "INV-002", date: "2024-01-01", amount: "$19.00", status: "Pagado" },
        { id: "INV-003", date: "2023-12-01", amount: "$19.00", status: "Pagado" },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold font-serif mb-2">Facturación</h1>
                <p className="text-muted-foreground">Gestiona tu plan y revisa tu historial de pagos.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Current Plan Card */}
                <Card className="lg:col-span-2 border-primary/20 bg-primary/5">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-xl flex items-center gap-2">
                                    Plan Profesional <Badge className="bg-primary text-primary-foreground">Activo</Badge>
                                </CardTitle>
                                <CardDescription>Tu próxima renovación es el 1 de Marzo, 2024</CardDescription>
                            </div>
                            <Zap className="w-10 h-10 text-primary opacity-20" />
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <p className="text-sm font-semibold">Beneficios activos:</p>
                                <ul className="space-y-2">
                                    <li className="text-sm flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Perfil Destacado
                                    </li>
                                    <li className="text-sm flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Aplicaciones Ilimitadas
                                    </li>
                                    <li className="text-sm flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Exportación PDF Pro
                                    </li>
                                </ul>
                            </div>
                            <div className="flex flex-col justify-end gap-2">
                                <Button variant="default">Gestionar Plan</Button>
                                <Button variant="outline" className="text-destructive hover:bg-destructive/10">Cancelar Suscripción</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Payment Method */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <CreditCard className="w-5 h-5" /> Método de Pago
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="p-4 border rounded-lg flex items-center gap-4">
                            <div className="h-10 w-16 bg-muted rounded flex items-center justify-center font-bold text-xs italic">
                                VISA
                            </div>
                            <div>
                                <p className="text-sm font-medium">•••• 4242</p>
                                <p className="text-xs text-muted-foreground">Exp: 12/26</p>
                            </div>
                        </div>
                        <Button variant="outline" className="w-full">Cambiar Tarjeta</Button>
                    </CardContent>
                </Card>
            </div>

            {/* Invoices Table */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <History className="w-5 h-5" /> Historial de Facturas
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left text-muted-foreground">
                            <thead className="text-xs text-foreground uppercase bg-muted/50">
                                <tr>
                                    <th className="px-6 py-3">ID Factura</th>
                                    <th className="px-6 py-3">Fecha</th>
                                    <th className="px-6 py-3">Monto</th>
                                    <th className="px-6 py-3">Estado</th>
                                    <th className="px-6 py-3 text-right">Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoices.map((invoice) => (
                                    <tr key={invoice.id} className="border-b border-muted">
                                        <td className="px-6 py-4 font-medium text-foreground">{invoice.id}</td>
                                        <td className="px-6 py-4">{invoice.date}</td>
                                        <td className="px-6 py-4">{invoice.amount}</td>
                                        <td className="px-6 py-4">
                                            <Badge variant="outline" className="text-emerald-500 border-emerald-500">
                                                {invoice.status}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Button variant="ghost" size="sm">
                                                <Download className="w-4 h-4 mr-2" /> PDF
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

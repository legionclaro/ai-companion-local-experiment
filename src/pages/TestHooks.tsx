import { useBiologists } from "@/hooks/useBiologists";
import { useProjects } from "@/hooks/useProjects";
import { useInstitutions } from "@/hooks/useInstitutions";

export default function TestHooks() {
    const { data: biologists, error: bioError, isLoading: bioLoading } = useBiologists();
    const { data: projects, error: projError, isLoading: projLoading } = useProjects();
    const { data: institutions, error: instError, isLoading: instLoading } = useInstitutions();

    return (
        <div className="p-8 space-y-8 bg-slate-50 min-h-screen">
            <div className="bg-white p-6 rounded-xl shadow-sm border">
                <h1 className="text-3xl font-bold font-serif mb-2">Supabase Debug Report</h1>
                <p className="text-muted-foreground">This page verifies if data is actually coming from Supabase.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4">
                    <h3 className="font-bold text-blue-600">Biólogos</h3>
                    <p className="text-2xl font-bold">{(biologists || []).length}</p>
                </Card>
                <Card className="p-4">
                    <h3 className="font-bold text-green-600">Proyectos</h3>
                    <p className="text-2xl font-bold">{(projects || []).length}</p>
                </Card>
                <Card className="p-4">
                    <h3 className="font-bold text-purple-600">Instituciones</h3>
                    <p className="text-2xl font-bold">{(institutions || []).length}</p>
                </Card>
            </div>

            <section className="bg-white p-6 rounded-xl shadow-sm border">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    Raw Profiles Data
                </h2>
                {bioLoading && <p className="animate-pulse text-blue-500 font-medium">Fetching from public.profiles...</p>}
                {bioError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-4">
                        <p className="font-bold">Error fetching profiles:</p>
                        <p className="font-mono text-sm">{bioError.message}</p>
                    </div>
                )}
                {!bioLoading && biologists && biologists.length === 0 && (
                    <p className="text-amber-600 font-medium bg-amber-50 p-4 rounded-lg border border-amber-100">
                        ⚠️ No records found in 'profiles'. This usually means RLS is blocking SELECT or the table is empty.
                    </p>
                )}
                <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-auto max-h-[400px] text-xs font-mono">
                    {JSON.stringify(biologists, null, 2)}
                </pre>
            </section>

            <section className="bg-white p-6 rounded-xl shadow-sm border">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    Raw Projects Data
                </h2>
                <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-auto max-h-[300px] text-xs font-mono">
                    {JSON.stringify(projects, null, 2)}
                </pre>
            </section>
        </div>
    );
}

import { Card } from "@/components/ui/card";

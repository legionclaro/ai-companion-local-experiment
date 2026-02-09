import { useBiologists } from "@/hooks/useBiologists";
import { useProjects } from "@/hooks/useProjects";
import { useInstitutions } from "@/hooks/useInstitutions";

export default function TestHooks() {
    const { data: biologists, error: bioError, isLoading: bioLoading } = useBiologists();
    const { data: projects, error: projError, isLoading: projLoading } = useProjects();
    const { data: institutions, error: instError, isLoading: instLoading } = useInstitutions();

    return (
        <div className="p-8 space-y-8">
            <h1 className="text-2xl font-bold">Hooks Test Page</h1>

            <section>
                <h2 className="text-xl font-semibold">Biologists</h2>
                {bioLoading && <p>Loading...</p>}
                {bioError && <p className="text-red-500">Error: {bioError.message}</p>}
                <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-40">
                    {JSON.stringify(biologists, null, 2)}
                </pre>
            </section>

            <section>
                <h2 className="text-xl font-semibold">Projects</h2>
                {projLoading && <p>Loading...</p>}
                {projError && <p className="text-red-500">Error: {projError.message}</p>}
                <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-40">
                    {JSON.stringify(projects, null, 2)}
                </pre>
            </section>

            <section>
                <h2 className="text-xl font-semibold">Institutions</h2>
                {instLoading && <p>Loading...</p>}
                {instError && <p className="text-red-500">Error: {instError.message}</p>}
                <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-40">
                    {JSON.stringify(institutions, null, 2)}
                </pre>
            </section>
        </div>
    );
}

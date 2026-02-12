import { supabase } from '../src/integrations/supabase/client';
import { biologists, projects } from '../src/data/mockData';
import { BLOG_POSTS } from '../src/data/blogData';

async function migrateData() {
    console.log('--- Iniciando Migración de Datos a Supabase ---');

    // 1. Migrar Perfiles
    console.log('Migrando biólogos...');
    for (const bio of biologists) {
        const { error } = await supabase.from('biologist_profiles').upsert({
            id: bio.id,
            name: bio.name,
            title: bio.title,
            bio: bio.bio,
            location: bio.location,
            photo: bio.photo || null,
            years_experience: bio.years_experience,
            projects_completed: bio.projects_completed,
            availability: bio.availability,
            verified: bio.verified,
            is_premium: bio.is_premium,
            specialties: bio.specialties,
            roles: bio.roles,
            languages: bio.languages,
            experience_level: bio.experience_level
        });
        if (error) console.error(`Error migrando biólogo ${bio.name}:`, error.message);
    }

    // 2. Migrar Proyectos
    console.log('Migrando proyectos...');
    for (const proj of projects) {
        const { error } = await supabase.from('projects').upsert({
            id: proj.id,
            title: proj.title,
            description: proj.description,
            location: proj.location,
            category: proj.category,
            status: proj.status,
            vacancies: proj.vacancies || 1,
            funding_confirmed: proj.fundingConfirmed,
            duration: proj.duration,
            modality: proj.modality,
            institution_id: '00000000-0000-0000-0000-000000000000', // Placeholder
            budget_progress: 0,
        });
        if (error) console.error(`Error migrando proyecto ${proj.title}:`, error.message);
    }

    // 3. Migrar Blog
    console.log('Migrando blog...');
    for (const post of BLOG_POSTS) {
        const { error } = await supabase.from('blog_posts').upsert({
            id: post.id,
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            content: post.content,
            category: post.category,
            author: post.author,
            image: post.image,
            read_time: post.readTime,
            date: post.date,
        });
        if (error) console.error(`Error migrando post ${post.title}:`, error.message);
    }

    console.log('--- Migración Finalizada ---');
}

migrateData();

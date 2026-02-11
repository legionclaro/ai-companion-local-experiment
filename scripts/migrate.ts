import { supabase } from '../src/lib/supabase';
import { biologists, projects } from '../src/data/mockData';
import { BLOG_POSTS } from '../src/data/blogData';

async function migrateData() {
    console.log('--- Iniciando Migración de Datos a Supabase ---');

    // 1. Migrar Perfiles
    console.log('Migrando biólogos...');
    for (const bio of biologists) {
        const { error } = await supabase.from('profiles').upsert({
            name: bio.name,
            title: bio.title,
            bio: bio.bio,
            location: bio.location,
            institution: bio.institution || null,
            photo: bio.photo || null,
            years_experience: bio.yearsExperience,
            projects_completed: bio.projectsCompleted,
            availability: bio.availability,
            verified: bio.verified,
            specialties: bio.specialties,
            roles: bio.roles,
            languages: bio.languages,
        });
        if (error) console.error(`Error migrando biólogo ${bio.name}:`, error.message);
    }

    // 2. Migrar Proyectos
    console.log('Migrando proyectos...');
    for (const proj of projects) {
        const { error } = await supabase.from('projects').upsert({
            title: proj.title,
            description: proj.description,
            institution: proj.institution,
            location: proj.location,
            category: proj.type, // Map 'type' to 'category'
            status: proj.status,
            vacancies: proj.positions || 1,
        });
        if (error) console.error(`Error migrando proyecto ${proj.title}:`, error.message);
    }

    // 3. Migrar Blog
    console.log('Migrando blog...');
    for (const post of BLOG_POSTS) {
        const { error } = await supabase.from('blog_posts').upsert({
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

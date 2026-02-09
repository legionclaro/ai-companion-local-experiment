import { test, expect } from '@playwright/test';

test.describe('BioRD Platform Navigation', () => {
    test('should load landing page successfully', async ({ page }) => {
        await page.goto('http://localhost:8080/');

        // Check that the page loaded
        await expect(page).toHaveTitle(/BioRD/i);

        // Check hero section
        await expect(page.locator('text=Conectamos Biólogos')).toBeVisible();
    });

    test('should navigate to biologists directory', async ({ page }) => {
        await page.goto('http://localhost:8080/biologists');

        // Check page title
        await expect(page.locator('h1:has-text("Directorio de Biólogos")')).toBeVisible();

        // Check that biologist cards are rendered
        await expect(page.locator('.grid').first()).toBeVisible();
    });

    test('should navigate to projects directory', async ({ page }) => {
        await page.goto('http://localhost:8080/projects');

        // Check page title
        await expect(page.locator('h1:has-text("Banco de Proyectos")')).toBeVisible();

        // Check that project cards are rendered
        await expect(page.locator('.grid').first()).toBeVisible();
    });

    test('should navigate to biologist profile', async ({ page }) => {
        await page.goto('http://localhost:8080/biologists/1');

        // Check that profile content loads
        await expect(page.locator('text=/Dra\\.|Dr\\.|Lic\\.|Ing\\./i').first()).toBeVisible();
    });

    test('should navigate to project detail', async ({ page }) => {
        await page.goto('http://localhost:8080/projects/1');

        // Check project detail loads
        await expect(page.locator('text=/Descripción|Description/i')).toBeVisible();
    });

    test('should navigate to biologist dashboard', async ({ page }) => {
        await page.goto('http://localhost:8080/dashboard');

        // Check dashboard layout
        await expect(page.locator('text=/Panel del Biólogo|Dashboard/i')).toBeVisible();

        // Check sidebar navigation
        await expect(page.locator('text=Resumen')).toBeVisible();
        await expect(page.locator('text=Mis Aplicaciones')).toBeVisible();
    });

    test('should navigate to dashboard applications', async ({ page }) => {
        await page.goto('http://localhost:8080/dashboard/applications');

        // Check applications page loads
        await expect(page.locator('h1:has-text("Mis Aplicaciones")')).toBeVisible();
    });

    test('should navigate to dashboard profile editor', async ({ page }) => {
        await page.goto('http://localhost:8080/dashboard/profile');

        // Check profile editor loads
        await expect(page.locator('h1:has-text("Mi Perfil")')).toBeVisible();
    });

    test('should navigate to institution dashboard', async ({ page }) => {
        await page.goto('http://localhost:8080/institution');

        // Check institution dashboard layout
        await expect(page.locator('text=/Panel Institucional|Institucional/i')).toBeVisible();

        // Check sidebar navigation
        await expect(page.locator('text=Mis Proyectos')).toBeVisible();
    });

    test('should navigate to institution projects', async ({ page }) => {
        await page.goto('http://localhost:8080/institution/projects');

        // Check projects management page loads
        await expect(page.locator('h1:has-text("Mis Proyectos")')).toBeVisible();
        await expect(page.locator('text=Crear Proyecto')).toBeVisible();
    });

    test('should navigate to create new project', async ({ page }) => {
        await page.goto('http://localhost:8080/institution/projects/new');

        // Check new project form loads
        await expect(page.locator('h1:has-text("Crear Nuevo Proyecto")')).toBeVisible();
    });

    test('should navigate to institution applications', async ({ page }) => {
        await page.goto('http://localhost:8080/institution/applications');

        // Check applications page loads
        await expect(page.locator('h1:has-text("Aplicaciones Recibidas")')).toBeVisible();
    });
});

# Cómo publicar esta wiki en GitHub

Esta guía te permite publicar el contenido local de `wiki/` en:

`https://github.com/legionclaro/ai-companion-local-experiment/wiki`

## Opción rápida (manual en GitHub)
1. Ve al enlace de la wiki.
2. Crea/edita la página **Home** y pega `wiki/Home.md`.
3. Crea el resto de páginas copiando el contenido de cada archivo `.md`.
4. Agrega `_Sidebar.md` y `_Footer.md` para navegación lateral y pie.

## Opción Git (recomendada)
GitHub mantiene la wiki como un repo separado:

```bash
git clone https://github.com/legionclaro/ai-companion-local-experiment.wiki.git
cd ai-companion-local-experiment.wiki
```

Luego copia el contenido desde este proyecto:

```bash
cp -r /ruta/a/ai-companion-local-experiment/wiki/* .
git add .
git commit -m "docs: publish business wiki"
git push origin master
```

## Convenciones importantes
- La página principal debe llamarse **Home.md**.
- `_Sidebar.md` y `_Footer.md` son opcionales pero recomendados.
- Mantén nombres estables para no romper enlaces internos.

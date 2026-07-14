import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Coleção de posts do blog. Cada post é um arquivo .md em src/content/blog.
// Quando o Keystatic for ligado, ele vai escrever/editar exatamente esses arquivos.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdoc}', base: './src/content/blog' }),
  schema: z.object({
    titulo: z.string(),
    resumo: z.string(),
    data: z.coerce.date(),
    categoria: z
      .enum(['Cuidados', 'Terapia Capilar', 'Tratamentos', 'Mechas', 'Transformações'])
      .default('Cuidados'),
    // Caminho de imagem em /public (ex.: /fotos/blog/inverno.jpg). Opcional.
    // (o Keystatic grava null quando fica vazio, por isso o nullable)
    capa: z.string().nullable().optional(),
    autor: z.string().default('Lu Ribeiro'),
    destaque: z.boolean().default(false),
    rascunho: z.boolean().default(false),
  }),
});

export const collections = { blog };

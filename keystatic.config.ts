import { config, fields, collection } from '@keystatic/core';

// Painel visual do blog. A Lu acessa em /keystatic, escreve o post numa
// tela tipo editor de texto e publica — isso grava um arquivo .mdoc em
// src/content/blog, e o site atualiza. Os campos abaixo são os mesmos que
// o blog lê (ver src/content.config.ts).

export default config({
  // 'local' = edita direto nos arquivos (bom pra desenvolvimento).
  // Na hora de publicar pra Lu editar pela internet, troca por:
  //   storage: { kind: 'github', repo: 'usuario/repositorio' }
  storage: {
    kind: 'local',
  },

  ui: {
    brand: { name: 'Espaço Lu Ribeiro' },
  },

  collections: {
    posts: collection({
      label: 'Posts do Blog',
      path: 'src/content/blog/*',
      slugField: 'titulo',
      format: { contentField: 'conteudo' },
      entryLayout: 'content',
      columns: ['titulo', 'data', 'categoria'],
      schema: {
        titulo: fields.slug({
          name: { label: 'Título', validation: { isRequired: true } },
          slug: {
            label: 'Endereço (URL)',
            description: 'Como aparece no link do post. Gerado a partir do título.',
          },
        }),
        resumo: fields.text({
          label: 'Resumo',
          description: 'Uma ou duas frases que aparecem no card e no Google.',
          multiline: true,
          validation: { isRequired: true },
        }),
        data: fields.date({
          label: 'Data de publicação',
          defaultValue: { kind: 'today' },
          validation: { isRequired: true },
        }),
        categoria: fields.select({
          label: 'Categoria',
          options: [
            { label: 'Cuidados', value: 'Cuidados' },
            { label: 'Terapia Capilar', value: 'Terapia Capilar' },
            { label: 'Tratamentos', value: 'Tratamentos' },
            { label: 'Mechas', value: 'Mechas' },
            { label: 'Transformações', value: 'Transformações' },
          ],
          defaultValue: 'Cuidados',
        }),
        capa: fields.image({
          label: 'Foto de capa',
          description: 'Opcional. Aparece no topo do post e no card.',
          directory: 'public/fotos/blog',
          publicPath: '/fotos/blog/',
        }),
        autor: fields.text({
          label: 'Autor',
          defaultValue: 'Lu Ribeiro',
        }),
        destaque: fields.checkbox({
          label: 'Post em destaque',
          defaultValue: false,
        }),
        rascunho: fields.checkbox({
          label: 'Rascunho (não publicar ainda)',
          defaultValue: false,
        }),
        conteudo: fields.markdoc({
          label: 'Conteúdo do post',
        }),
      },
    }),
  },
});

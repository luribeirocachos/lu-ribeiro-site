// Catálogo de serviços do site (/catalogo).
//
// O PREÇO vem ao vivo do painel de gestão (lu2-servicos-get → lu:servicos), procurado
// pelo campo `painel` (nome exato do serviço lá, sem diferença de acento/maiúscula).
// Mudou o preço no painel → o site mostra o novo em até ~10 minutos.
//
// O TEXTO é daqui: as descrições do painel foram escritas pro WhatsApp (asteriscos,
// "o investimento é...") e não servem como estão pra página pública.
//
// Serviço novo no painel NÃO aparece sozinho: precisa entrar nesta lista.
// `reserva` = preço usado só se o painel não responder (foto de 02/10/2026).
//
// Vocabulário da casa: nunca "hidratação / nutrição / reconstrução" nos serviços de cabelo.

export type ModoPreco = 'normal' | 'avaliacao' | 'consulta';

export interface Variante {
  rotulo: string;
  painel: string;
  reserva: number;
}

export interface ItemCatalogo {
  nome: string;
  painel?: string;
  foto?: string;
  precoFixo?: number;  // preço definido aqui, não no painel
  selo?: string;       // faixa de destaque no card (ex.: dia da promoção)
  soAPartir?: boolean; // com variantes: mostra só o menor "a partir de", sem a tabela
  fotos?: string[];   // várias fotos = carrossel no card (a 1ª é a capa)
  reserva?: number;
  desc?: string;
  inclui?: string[];
  modo?: ModoPreco;
  variantes?: Variante[];
}

export interface Categoria {
  id: string;
  titulo: string;
  intro?: string;
  itens: ItemCatalogo[];
}

const tamanhos = (base: string, sufixos: [string, string, string], precos: [number, number, number]): Variante[] =>
  (['Curto', 'Médio', 'Longo'] as const).map((rotulo, i) => ({ rotulo, painel: `${base} ${sufixos[i]}`, reserva: precos[i] }));

export const CATEGORIAS: Categoria[] = [
  {
    id: 'corte',
    titulo: 'Corte',
    intro: 'Todo corte começa com uma consultoria dos seus cachos: curvatura, densidade, porosidade e estrutura.',
    itens: [
      {
        nome: 'Corte Lu Ribeiro',
        painel: 'Corte Lu Ribeiro',
        foto: '/fotos/catalogo/corte-lu-ribeiro.jpg',
        reserva: 180,
        desc: 'Nosso protocolo exclusivo de corte, com um plano personalizado a partir da análise dos seus cachos.',
        inclui: ['Consultoria de corte', 'Corte com técnicas para cachos', 'Massagem relaxante', 'Indicação de produtos'],
      },
      {
        nome: 'Corte com a Giovanna',
        painel: 'Corte Giovanna',
        foto: '/fotos/catalogo/corte-giovanna.jpg',
        reserva: 160,
        desc: 'O mesmo protocolo de corte do Espaço, realizado pela nossa especialista Giovanna.',
        inclui: ['Consultoria de corte', 'Corte com técnicas para cachos', 'Massagem relaxante', 'Indicação de produtos'],
      },
      {
        nome: 'Terça do Corte: Corte + Curly Essencial',
        precoFixo: 280,   // a Lu passou R$280 em 02/10/2026 (o painel ainda tinha 260)
        selo: 'Toda última terça do mês',
        foto: '/fotos/catalogo/combo-corte-essencial.jpg',
        desc: 'Corte e o nosso protocolo Curly Essencial no mesmo atendimento, em condição especial na Terça do Corte.',
      },
      {
        nome: 'Corte Infantil',
        painel: 'Corte Infantil',
        foto: '/fotos/catalogo/corte-infantil.jpg',
        reserva: 100,
        desc: 'Corte com técnicas especializadas para cachos, com lavagem e finalização.',
      },
      {
        nome: 'Consultoria',
        painel: 'Consultoria',
        reserva: 50,
        desc: 'Análise detalhada dos cachos com indicação de produtos e um plano de cuidados para casa.',
      },
    ],
  },
  {
    id: 'protocolos',
    titulo: 'Protocolos capilares',
    intro: 'Protocolos exclusivos do Espaço, montados de acordo com o momento do seu cabelo.',
    itens: [
      {
        nome: 'Curly Básico',
        painel: 'Curly BASICO',
        foto: '/fotos/catalogo/curly-basico.jpg',
        reserva: 160,
        desc: 'Higienização do couro cabeludo e reposição de água no fio. Ideal para cabelos ressecados.',
      },
      {
        nome: 'Curly Essencial',
        painel: 'Curly Essencial',
        foto: '/fotos/catalogo/curly-essencial.jpg',
        reserva: 200,
        desc: 'Para cabelos opacos, ressecados e sem maleabilidade. Devolve maciez, brilho, definição e movimento, e deixa a finalização do dia a dia muito mais fácil.',
      },
      {
        nome: 'Curly Lifting',
        painel: 'Curly Lifting',
        foto: '/fotos/catalogo/curly-lifting.jpg',
        reserva: 200,
        desc: 'Para fios mais finos, secos, fragilizados ou pós-coloração. Ajuda a recuperar força, maciez e brilho, com cachos mais alinhados.',
      },
      {
        nome: 'Vital Curly',
        painel: 'Vital Curly',
        foto: '/fotos/catalogo/vital-curly.jpg',
        reserva: 280,
        desc: 'Começa pela saúde do couro cabeludo, com peeling capilar associado a vapor de ozônio ou ledterapia. Indicado para cabelos porosos e em transição capilar.',
      },
      {
        nome: 'SOS Blonde',
        painel: 'sos blonde',
        foto: '/fotos/catalogo/sos-blonde.jpg',
        reserva: 250,
        desc: 'Cuidado pós-química para quem tem mechas ou coloração: devolve maciez, brilho, resistência e um toque mais saudável.',
      },
    ],
  },
  {
    id: 'terapia',
    titulo: 'Terapia capilar',
    intro: 'Cuidado do couro cabeludo, com protocolo personalizado para cada pessoa.',
    itens: [
      {
        nome: 'Renova Therapy',
        painel: 'Renova Terapy',
        foto: '/fotos/catalogo/renova.jpg',
        modo: 'avaliacao',
        desc: 'Protocolo exclusivo criado pela Lu Ribeiro para o couro cabeludo: caspa, dermatite, psoríase, queda e outras queixas. Começa com uma avaliação e anamnese; a partir dela montamos o seu protocolo.',
      },
      {
        nome: 'Head Spa',
        painel: 'Head Spa',
        foto: '/fotos/catalogo/head-spa.jpg',
        reserva: 250,
        desc: 'Um ritual de cuidado e relaxamento para o couro cabeludo.',
      },
    ],
  },
  {
    id: 'cor',
    titulo: 'Cor e mechas',
    intro: 'Cor pensada para cachos: iluminar sem perder a saúde nem a definição. O valor final é confirmado na avaliação com a especialista.',
    itens: [
      {
        nome: 'Coloração',
        painel: 'Coloração',
        foto: '/fotos/catalogo/coloracao.jpg',
        reserva: 220,
        desc: 'Coloração personalizada, com produtos que preservam a estrutura dos cachos.',
        inclui: ['Cobertura dos brancos', 'Protocolo de cuidado'],
      },
      {
        nome: 'Ruivos',
        painel: 'Ruivos',
        foto: '/fotos/catalogo/ruivos.jpg',
        reserva: 480,
        desc: 'Ruivo sem descoloração, para não perder a definição dos cachos.',
        inclui: ['Teste de mechas', 'Consultoria com a especialista', 'Cor', 'Protocolo de cuidado'],
      },
      {
        nome: 'Morena iluminada',
        soAPartir: true,
        fotos: ['/fotos/catalogo/iluminado-1.jpg', '/fotos/catalogo/iluminado-2.jpg', '/fotos/catalogo/iluminado-3.jpg', '/fotos/catalogo/iluminado-4.jpg', '/fotos/catalogo/iluminado-5.jpg', '/fotos/catalogo/iluminado-6.jpg'],
        desc: 'Mechas pensadas para iluminar sem comprometer a saúde e a definição dos cachos.',
        inclui: ['Diagnóstico capilar', 'Técnica de iluminação personalizada', 'Tonalização', 'Protocolo de cuidado', 'Finalização'],
        variantes: [
          { rotulo: 'Curto', painel: 'Morena iluminado curto', reserva: 550 },
          { rotulo: 'Médio', painel: 'Morena iluminado medio', reserva: 650 },
          { rotulo: 'Longo', painel: 'Morena iluminada longo', reserva: 950 },
        ],
      },
      {
        nome: 'Loiro',
        soAPartir: true,
        fotos: ['/fotos/catalogo/loiro-1.jpg', '/fotos/catalogo/loiro-2.jpg', '/fotos/catalogo/loiro-3.jpg', '/fotos/catalogo/loiro-4.jpg', '/fotos/catalogo/loiro-5.jpg'],
        desc: 'Loiro feito com avaliação de estrutura, histórico químico e resistência do fio.',
        inclui: ['Diagnóstico capilar', 'Técnica de iluminação personalizada', 'Tonalização', 'Protocolo de cuidado', 'Finalização'],
        variantes: tamanhos('Loiro', ['curto', 'medio', 'longo'], [650, 750, 950]),
      },
    ],
  },
  {
    id: 'eventos',
    titulo: 'Noivas e eventos',
    itens: [
      {
        nome: 'Dia da Noiva',
        painel: 'Dia da noiva',
        fotos: ['/fotos/catalogo/noiva-1.jpg', '/fotos/catalogo/noiva-2.jpg', '/fotos/catalogo/noiva-3.jpg', '/fotos/catalogo/noiva-4.jpg'],
        modo: 'consulta',
        desc: 'Temos vários pacotes para o seu grande dia. Fale com a gente para montar o seu.',
      },
      {
        nome: 'Debutante',
        painel: 'debutante',
        modo: 'consulta',
        desc: 'Penteado e maquiagem no dia do evento.',
      },
      {
        nome: 'Penteado',
        painel: 'Penteado',
        foto: '/fotos/catalogo/penteado.jpg',
        reserva: 320,
        desc: 'Penteados que valorizam a curvatura natural, sem precisar escovar os cachos.',
      },
      {
        nome: 'Maquiagem',
        painel: 'maquiagem',
        reserva: 180,
      },
      {
        nome: 'Combo maquiagem + penteado',
        painel: 'combo make e penteado',
        foto: '/fotos/catalogo/combo-make-penteado.jpg',
        reserva: 450,
        desc: 'Penteado pensado para cachos naturais e maquiagem resistente à água.',
      },
    ],
  },
];

// Clubes / pacotes (painel: lu:servicos → pacotes). Mesmo esquema: preço e nº de sessões
// vêm do painel pelo nome; "economia" só aparece quando o valor avulso é maior que o do clube.
export interface ClubeCatalogo {
  nome: string;
  painel: string;
  desc?: string;
  reserva: { preco: number; sessoes: number; validade: number; valor_cheio: number };
}

export const CLUBES: ClubeCatalogo[] = [
  { nome: 'Clube 6 meses', painel: 'Clube 6 meses', desc: 'Uma sessão por mês entre cortes e protocolos (Curly Básico, Essencial, Lifting e Vital Curly).', reserva: { preco: 850, sessoes: 6, validade: 6, valor_cheio: 1160 } },
  { nome: 'Clube 1 ano', painel: 'Clube 1 ano', desc: 'Um ano de cuidado: cortes Lu Ribeiro e os protocolos Curly Essencial, Vital Curly, Lifting e Básico.', reserva: { preco: 1750, sessoes: 12, validade: 12, valor_cheio: 2440 } },
  { nome: 'Clube Essencial', painel: 'Clube essencial', desc: '4 sessões de Curly Essencial.', reserva: { preco: 560, sessoes: 4, validade: 2, valor_cheio: 800 } },
  { nome: 'Clube Higieniza', painel: 'Clube higieniza', desc: '4 sessões de Curly Básico.', reserva: { preco: 350, sessoes: 4, validade: 1, valor_cheio: 640 } },
  { nome: 'Clube Color', painel: 'Clube color', desc: 'Coloração com SOS Blonde e Curly Lifting para manter a cor e os cachos saudáveis.', reserva: { preco: 999, sessoes: 6, validade: 6, valor_cheio: 1330 } },
  { nome: 'Clube SOS Curly', painel: 'clube SOS CURLY', desc: 'Curly Lifting e SOS Blonde intercalados, para quem passou por química.', reserva: { preco: 750, sessoes: 6, validade: 6, valor_cheio: 1350 } },
  { nome: 'Hair Recovery', painel: 'clube Hair Recovery', desc: 'Renova Therapy com microagulhamento capilar, para o couro cabeludo.', reserva: { preco: 2800, sessoes: 12, validade: 3, valor_cheio: 3090 } },
];

// ===== Vitta Santé (clínica de estética da Lu, em construção) — aba própria no site: /vitta-sante =====
export const VITTA_CATEGORIAS: Categoria[] = [
  {
    id: 'estetica',
    titulo: 'Estética facial',
    itens: [
      { nome: 'Limpeza de pele', painel: 'Limpeza de pele', reserva: 215 },
      { nome: 'Revitalização facial', painel: 'Revitalização facial', reserva: 120 },
      { nome: 'Hidratação facial', painel: 'Hidratação facial', reserva: 160 },
      { nome: 'Máscara de ouro', painel: 'mascara de ouro', reserva: 140 },
      { nome: 'Peeling de diamante', painel: 'Peeling de diamante', reserva: 120 },
      { nome: 'Peeling de ouro', painel: 'Peeling ouro', reserva: 150 },
      { nome: 'Peeling de glucolactona', painel: 'Peeling glucolactona', reserva: 180, desc: 'Indicado para pele sensível.' },
      { nome: 'Vulcanize', painel: 'vulcanize', reserva: 350 },
      { nome: 'Skinbooster', painel: 'Skinbooster', reserva: 250 },
      { nome: 'Microagulhamento facial', painel: 'Microagulhamento Facial', reserva: 280 },
      { nome: 'Combo peeling de ouro + microagulhamento', painel: 'Combo peeling de ouro+ microagulhamento', reserva: 350 },
      { nome: 'Lip glow', painel: 'Lip glow', reserva: 180 },
    ],
  },
  {
    id: 'corpo',
    titulo: 'Corpo e bem-estar',
    itens: [
      { nome: 'Massagem relaxante', painel: 'Massagem relaxante', reserva: 150 },
      { nome: 'Drenagem linfática', painel: 'Drenagem linfatica', reserva: 150 },
      { nome: 'Tratamento de estrias', painel: 'Tratamento estrias', reserva: 350 },
      { nome: 'Soroterapia', painel: 'soroterapia', reserva: 350 },
      { nome: 'Sobrancelhas', painel: 'Sobrancelhas', reserva: 45 },
      { nome: 'Buço', painel: 'Buço', reserva: 20 },
      { nome: 'Axila', painel: 'Axila', reserva: 30 },
    ],
  },
];

export const VITTA_CLUBES: ClubeCatalogo[] = [
  { nome: 'Skin Reset', painel: 'clube Skin reset', desc: 'Limpeza de pele, peeling de ouro e microagulhamento facial.', reserva: { preco: 850, sessoes: 4, validade: 3, valor_cheio: 1125 } },
  { nome: 'Melasma Essential', painel: 'Melasma Essential', desc: 'Limpeza de pele, vulcanize e revitalização facial.', reserva: { preco: 1990, sessoes: 4, validade: 3, valor_cheio: 1035 } },
];

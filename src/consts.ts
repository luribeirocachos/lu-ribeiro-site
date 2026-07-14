// Dados centrais do site — edite tudo aqui num lugar só.
// (Quando o Keystatic estiver ligado, os posts vêm de lá; estes são os dados fixos.)

export const SITE = {
  nome: 'Espaço Lu Ribeiro',
  slogan: 'Especialistas em cachos, tratamento e terapia capilar',
  cidade: 'Piracicaba, SP',
  descricao:
    'Salão especializado em cabelos cacheados em Piracicaba. Corte, tratamento, terapia capilar e mechas que respeitam o seu cacho.',
};

// Formato internacional, só dígitos: 55 + DDD + número
export const WHATSAPP = {
  numero: '5519996950288',
  mensagemPadrao: 'Oi Lu! Vim pelo site e quero agendar um horário 💛',
};

export function linkWhatsApp(mensagem: string = WHATSAPP.mensagemPadrao) {
  return `https://wa.me/${WHATSAPP.numero}?text=${encodeURIComponent(mensagem)}`;
}

export const CONTATO = {
  instagram: 'https://instagram.com/luribeirocachos',
  instagramHandle: '@luribeirocachos',
  endereco: 'Rua do Rosário, 842 — Piracicaba/SP',
  // Horários de exemplo — ajuste conforme o funcionamento
  horarios: [
    { dia: 'Terça a Sexta', horas: '9h às 18h' },
    { dia: 'Sábado', horas: '8h às 17h' },
    { dia: 'Domingo e Segunda', horas: 'Fechado' },
  ],
};

export const NAV: { label: string; href: string; externo?: boolean }[] = [
  { label: 'Início', href: '/' },
  { label: 'Serviços', href: '/servicos' },
  { label: 'Transformações', href: '/transformacoes' },
  { label: 'Blog', href: '/blog' },
  { label: 'Loja', href: 'https://caracolcachos.lojavirtualnuvem.com.br', externo: true },
  { label: 'Sobre', href: '/sobre' },
  { label: 'Contato', href: '/contato' },
];

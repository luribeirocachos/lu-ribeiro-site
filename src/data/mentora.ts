// Produtos da Lu — FONTE ÚNICA de links de pagamento e preços.
// /lu (site da mentora) e /links (lista para o Instagram) leem daqui: mudou o preço ou o link, muda aqui e
// só aqui. Todo link foi aberto na Hotmart (só leitura) e o valor da página de pagamento conferido.
//
// ⚠️ Usamos o link direto da OFERTA (pay.hotmart.com/...?off=...), não o go.hotmart.com/<ID>: este cai na
// VITRINE, que ainda mostra o preço antigo (Escola R$ 3.997,90; e-book R$ 29,90).

export const PRODUTOS = {
  escola: {
    nome: 'Escola dos Cachos', // na Hotmart o produto se chama "Metodo Lu Ribeiro Cachos"
    link: 'https://pay.hotmart.com/E51115612G?off=hiwd90nu',
    preco: 'R$ 97',
  },
  ebook: {
    nome: 'O Poder dos Cachos',
    link: 'https://pay.hotmart.com/K82077969T?off=8g7d5soj',
    preco: 'R$ 9,90',
  },
  mini: {
    nome: 'Start dos Cachos', // na Hotmart: "Start dos Cachos - Tratamento & Finalização" (com T)
    // ATENÇÃO: este link cobra R$ 29,90; a Lu tinha dito R$ 47 — mostramos o que o pagamento cobra até ela confirmar.
    link: 'https://pay.hotmart.com/U59040980D?off=0gl6g72r',
    preco: 'R$ 29,90',
  },
} as const;

// A Hotmart aceita o parâmetro `src` e mostra a "origem" de cada venda nos relatórios dela
// (ex.: quantas vendas vieram do link do Instagram). Não muda preço nem oferta.
export const comOrigem = (url: string, origem: string) =>
  url + (url.includes('?') ? '&' : '?') + 'src=' + encodeURIComponent(origem);

// Busca os preços ao vivo no painel de gestão (rota pública só de leitura do catálogo).
// Só nome → preço/sessões saem daqui; custo, comissão e afins nem existem nessa rota,
// e mesmo assim a página só usa os campos que precisa.

const URL_PAINEL = 'https://n8n-n8n.gneinp.easypanel.host/webhook/lu2-servicos-get';
const TEMPO_LIMITE_MS = 6000;
const CACHE_MS = 10 * 60 * 1000;

export interface PrecoServico { preco: number; aPartir: boolean }
export interface PrecoClube { preco: number; sessoes: number; validade: number; valor_cheio: number }
export interface Precos {
  aoVivo: boolean;
  servicos: Map<string, PrecoServico>;
  clubes: Map<string, PrecoClube>;
}

export const chave = (s: string) =>
  String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').trim().toLowerCase().replace(/\s+/g, ' ');

let cache: { ate: number; dados: Precos } | null = null;

export async function buscarPrecos(): Promise<Precos> {
  if (cache && cache.ate > Date.now()) return cache.dados;
  const vazio: Precos = { aoVivo: false, servicos: new Map(), clubes: new Map() };
  try {
    const ctl = new AbortController();
    const t = setTimeout(() => ctl.abort(), TEMPO_LIMITE_MS);
    const r = await fetch(URL_PAINEL, { signal: ctl.signal, headers: { accept: 'application/json' } });
    clearTimeout(t);
    if (!r.ok) return vazio;
    const j = await r.json();
    const cfg = (j && j.config) || {};
    const dados: Precos = { aoVivo: true, servicos: new Map(), clubes: new Map() };
    for (const s of Array.isArray(cfg.servicos) ? cfg.servicos : []) {
      const preco = Number(s && s.preco);
      if (s && s.nome && Number.isFinite(preco)) dados.servicos.set(chave(s.nome), { preco, aPartir: !!s.preco_apartir });
    }
    for (const p of Array.isArray(cfg.pacotes) ? cfg.pacotes : []) {
      const preco = Number(p && p.preco);
      if (p && p.nome && Number.isFinite(preco)) {
        dados.clubes.set(chave(p.nome), {
          preco,
          sessoes: Number(p.sessoes) || 0,
          validade: Number(p.validade) || 0,
          valor_cheio: Number(p.valor_cheio) || 0,
        });
      }
    }
    if (!dados.servicos.size) return vazio;
    cache = { ate: Date.now() + CACHE_MS, dados };
    return dados;
  } catch {
    return vazio;
  }
}

export const reais = (v: number) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: Number.isInteger(v) ? 0 : 2 });

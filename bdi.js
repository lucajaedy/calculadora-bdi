/**
 * BDI pela fórmula adotada pelo TCU (Acórdão 2.622/2013 - Plenário):
 *
 *   BDI = ((1 + AC + S + R + G) × (1 + DF) × (1 + L)) / (1 − I) − 1
 *
 * Todas as taxas entram em percentual (ex.: 4 para 4%).
 */
export const CAMPOS = [
  { id: 'ac', nome: 'Administração central', sigla: 'AC' },
  { id: 's', nome: 'Seguros', sigla: 'S' },
  { id: 'r', nome: 'Riscos', sigla: 'R' },
  { id: 'g', nome: 'Garantias', sigla: 'G' },
  { id: 'df', nome: 'Despesas financeiras', sigla: 'DF' },
  { id: 'l', nome: 'Lucro', sigla: 'L' },
  { id: 'pis', nome: 'PIS', sigla: 'PIS' },
  { id: 'cofins', nome: 'COFINS', sigla: 'COFINS' },
  { id: 'iss', nome: 'ISS', sigla: 'ISS' },
  { id: 'cprb', nome: 'CPRB (desoneração)', sigla: 'CPRB' },
];

export function calcularBdi(taxas) {
  const t = {};
  for (const { id } of CAMPOS) {
    const v = Number(taxas[id] ?? 0);
    if (!Number.isFinite(v) || v < 0) {
      throw new RangeError(`Taxa inválida em ${id}: ${taxas[id]}`);
    }
    t[id] = v / 100;
  }
  const tributos = t.pis + t.cofins + t.iss + t.cprb;
  if (tributos >= 1) {
    throw new RangeError('A soma dos tributos precisa ser menor que 100%.');
  }
  const bdi = ((1 + t.ac + t.s + t.r + t.g) * (1 + t.df) * (1 + t.l)) / (1 - tributos) - 1;
  return { bdi: bdi * 100, tributos: tributos * 100 };
}

/** Preço de venda a partir do custo direto e do BDI (em %). */
export function precoDeVenda(custoDireto, bdiPercentual) {
  return custoDireto * (1 + bdiPercentual / 100);
}

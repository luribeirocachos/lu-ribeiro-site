// O fio do cacho: linha em laços usada como divisor decorativo nas páginas da mentora (/lu e /links).
// É uma trocoide — x = a·t − r·sen t, y = r − r·cos t — que faz laço quando r > a. Gerada uma vez no build
// (nada de caminho escrito à mão); cada página a põe num <defs> e a reaproveita com <use>.
export function fioDoCacho(A = 6, R = 10, LACOS = 70, PASSOS = 22) {
  let d = '';
  for (let i = 0; i <= LACOS * PASSOS; i++) {
    const t = (i / (LACOS * PASSOS)) * LACOS * 2 * Math.PI;
    const x = A * t - R * Math.sin(t) + R;
    const y = R - R * Math.cos(t) + 1;
    d += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1);
  }
  return { d, w: Math.round(A * LACOS * 2 * Math.PI + 2 * R), h: 2 * R + 2 };
}

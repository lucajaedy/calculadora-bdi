import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calcularBdi, precoDeVenda } from '../bdi.js';

const perto = (a, b, casas = 4) => assert.ok(Math.abs(a - b) < 10 ** -casas, `${a} ≠ ${b}`);

test('sem taxas, BDI é zero', () => {
  perto(calcularBdi({}).bdi, 0);
});

test('só lucro: BDI igual ao lucro', () => {
  perto(calcularBdi({ l: 8 }).bdi, 8);
});

test('só tributos: divide pelo complemento', () => {
  // 1 / (1 - 0,10) - 1 = 11,1111%
  perto(calcularBdi({ iss: 10 }).bdi, 11.1111, 3);
});

test('exemplo completo', () => {
  const { bdi, tributos } = calcularBdi({
    ac: 4, s: 0.8, r: 1.27, g: 0, df: 1.23, l: 7.4, pis: 0.65, cofins: 3, iss: 2.5,
  });
  // ((1,0607 × 1,0123 × 1,074) / 0,9385) − 1
  const esperado = ((1.0607 * 1.0123 * 1.074) / (1 - 0.0615) - 1) * 100;
  perto(bdi, esperado);
  perto(tributos, 6.15);
});

test('taxa negativa é recusada', () => {
  assert.throws(() => calcularBdi({ l: -1 }), RangeError);
});

test('tributos em 100% são recusados', () => {
  assert.throws(() => calcularBdi({ iss: 60, cofins: 40 }), RangeError);
});

test('preço de venda', () => {
  perto(precoDeVenda(100000, 25), 125000);
});

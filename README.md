# Calculadora de BDI

Calculadora de **BDI (Benefícios e Despesas Indiretas)** para orçamento de obras e serviços, pela fórmula adotada pelo TCU no Acórdão 2.622/2013 – Plenário:

```
BDI = ((1 + AC + S + R + G) × (1 + DF) × (1 + L)) ÷ (1 − I) − 1
```

| Sigla | Componente |
|---|---|
| AC | Administração central |
| S, R, G | Seguros, riscos e garantias |
| DF | Despesas financeiras |
| L | Lucro |
| I | Tributos sobre o preço: PIS, COFINS, ISS e, se houver desoneração, CPRB |

**Use online:** https://lucajaedy.github.io/calculadora-bdi/

HTML, CSS e JavaScript puros, sem build e sem dependências. A página funciona no celular e no modo escuro.

## Rodar localmente

```bash
npx serve .        # ou qualquer servidor estático
npm test           # testes com node:test (Node 20+)
```

O cálculo fica em `bdi.js` e pode ser importado em outro projeto:

```js
import { calcularBdi, precoDeVenda } from './bdi.js';

const { bdi } = calcularBdi({ ac: 4, s: 0.8, r: 1.27, df: 1.23, l: 7.4, pis: 0.65, cofins: 3, iss: 2.5 });
precoDeVenda(100000, bdi);
```

Os valores que vêm preenchidos são só um exemplo. Confira as taxas com o seu contador e com o edital.

Licença MIT.

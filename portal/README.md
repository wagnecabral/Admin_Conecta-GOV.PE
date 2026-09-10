# Portal Conecta GOV.PE — Solicitação de uso de API

## Overview
Protótipo navegável do fluxo de consulta e solicitação de uso de APIs no Conecta GOV.PE, seguindo o padrão visual do Governo de Pernambuco.

## Design Width
1440px desktop, responsive to 430px mobile.

## Screens
1. **Catálogo** — Consulta de categorias e APIs
2. **Detalhamento da API** — Operações, origem, requisitos e contatos
3. **Autenticação GOV.BR** — Simulação da identificação do solicitante
4. **Formulário** — Identificação, escopo técnico, finalidade, LGPD e revisão
5. **Protocolo** — Simulação do envio ao Solicita e encaminhamento ao SEI
6. **Minhas Solicitações** — Registro e acompanhamento do protocolo gerado

## Navegação de demonstração

No Catálogo de APIs, selecione uma categoria, abra o detalhamento de uma API e clique em **Solicitar uso da API**. Para simular a autenticação GOV.BR, utilize o CPF `046.318.094-18` e qualquer senha.

## Files
- `index.html` — Main interactive prototype entry point
- `Components.jsx` — Shared UI components (GovBar, Header, Footer, Cards, Buttons, Inputs)
- `Screens.jsx` — Screen-level compositions

## Font Note
DIN Pro (commercial) is substituted with Barlow Condensed from Google Fonts throughout this kit.

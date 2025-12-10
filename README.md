# Wave Sports Live

Aplicativo desktop Electron + Vite + React focado em transmissões esportivas ao vivo.

## Descrição

Este projeto é uma aplicação Electron com frontend em React (Vite) e integração com utilitários para desenvolvimento e empacotamento. Fornece uma base para criar aplicações desktop modernas com hot-reload em desenvolvimento e empacotamento com `electron-builder` para distribuição.

## Principais tecnologias

- Electron
- Vite
- React 19
- TypeScript
- Tailwind CSS

## Pré-requisitos

- Node.js (recomendado: v18+)
- `pnpm` (o projeto usa `pnpm` como package manager)
- Mac/Windows/Linux com suporte a Electron

Instale o `pnpm` globalmente se necessário:

```bash
npm install -g pnpm
```

## Instalação

No diretório do projeto, instale dependências:

```bash
pnpm install
```

O projeto possui um passo `postinstall` que prepara artefatos de desenvolvimento e instala dependências nativas necessárias para o empacotamento.

## Scripts úteis

- `pnpm dev` — Inicia o modo desenvolvimento com `electron-vite` (hot-reload).
- `pnpm start` — Roda a versão preview (útil para checar build estático com electron-vite preview).
- `pnpm build` — Empacota o app com `electron-builder` (usa configuração do projeto).
- `pnpm release` — Publica o release (usa `electron-builder --publish always`).
- `pnpm compile:app` — Executa o build do app via `electron-vite build`.
- `pnpm make:release` — Script auxiliar para criar releases via scripts em `src/lib/electron-app/release`.

Exemplo (desenvolvimento):

```bash
pnpm dev
```

Exemplo (build e empacotamento):

```bash
pnpm build
pnpm release
```

## Estrutura do projeto (resumo)

- `src/main` — Código do processo principal (main process) do Electron. Arquivo de entrada: `src/main/index.ts`.
- `src/preload` — Script preload exposto para o renderer via `contextBridge`. A API exposta está disponível em `window.App`.
- `src/renderer` — Aplicação React (renderer). Entrada: `src/renderer/index.tsx`.
- `src/lib/electron-app` — Utilitários, factories e scripts relacionados ao bootstrap do app Electron e à criação de janelas.
- `src/resources` — Arquivos estáticos e recursos usados pelo app.
- `trusted-dependencies-scripts.json` — Arquivo usado pelo fluxo de build/instalação.

Arquivos importantes:

- `package.json` — comandos de build, dependências e metadados.
- `electron-builder.ts` / `electron.vite.config.ts` — configurações de build e empacotamento.

## Observações para desenvolvedores

- A aplicação carrega extensões de desenvolvimento (por exemplo React DevTools) quando `ENVIRONMENT.IS_DEV` for verdadeiro. Isso acontece em `src/main/index.ts` e os assets da extensão estão em `src/lib/electron-app/extensions/react-developer-tools`.
- O preload expõe uma API minimal em `window.App` (veja `src/preload/index.ts`). Modifique com cuidado para não expor capacidades perigosas ao renderer.
- Scripts auxiliares de release estão em `src/lib/electron-app/release` e usam `tsx` para execução de scripts TypeScript no Node.

## Contribuição

1. Abra uma issue descrevendo a melhoria/bug.
2. Crie um branch com prefixo `feature/` ou `fix/`.
3. Faça um PR com descrição clara das mudanças.

## Licença

Este projeto está licenciado sob a licença MIT. Veja o `package.json` para os metadados do autor.

## Contato

Autor: Evandro Carvalho Ferreira — `dev.evandro@gmail.com`


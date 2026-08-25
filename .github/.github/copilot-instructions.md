# Princípios Gerais

Gere código consistente com o restante do projeto.

Prioridades:

1. Simplicidade.
2. Legibilidade.
3. Reutilização.
4. Consistência com os padrões existentes.

Antes de criar algo novo, verifique se existe uma implementação semelhante que possa ser reutilizada ou evoluída.

Implemente somente o necessário para atender ao requisito atual.

Não antecipe funcionalidades futuras.

Não crie arquivos, componentes, hooks, funções, módulos ou abstrações sem necessidade real.

Não altere código não relacionado à solicitação.

Se houver dúvida sobre uma regra de negócio, peça esclarecimentos antes de implementar.

# Arquitetura

- Siga a estrutura de pastas existente.
- Organize funcionalidades por domínio de negócio.
- Funcionalidades específicas devem ficar em `modules`.
- Componentes compartilhados devem ficar em `components`.
- Integrações HTTP devem ficar em `services`.
- Utilitários globais devem ficar em `lib`.
- Evite acoplamento desnecessário entre módulos.
- Prefira evoluir implementações existentes antes de criar novas abstrações.
- Crie novas pastas somente quando forem realmente necessárias.
- Não crie pastas vazias.

# Estrutura

src/
├── app/
├── modules/
├── components/
├── services/
└── lib/

Exemplo de módulo:

modules/
└── users/
├── components/
├── hooks/
├── services/
└── types/

# TypeScript

- Nunca utilize `any`.
- Utilize tipos explícitos em funções exportadas, hooks e APIs públicas.
- Declare explicitamente o retorno quando ele não for óbvio.
- Prefira `interface` para contratos de objetos quando apropriado.
- Evite `type assertions` desnecessárias.
- Não duplique tipos existentes.
- Evite valores mágicos.

# React

- Declare componentes utilizando `function`.
- Mantenha componentes focados em renderização e interação do usuário.
- Não coloque regras de negócio diretamente nos componentes.
- Centralize regras de negócio em hooks ou módulos apropriados.
- Mantenha componentes pequenos e coesos.
- Reutilize componentes existentes antes de criar novos.
- Não crie componentes apenas para extrair pequenos trechos de JSX sem benefício claro.

# Next.js

- Utilize App Router.
- Utilize Server Components por padrão.
- Utilize `"use client"` somente quando houver necessidade de estado, eventos, hooks ou APIs do navegador.
- Busque dados no servidor sempre que possível.
- Não utilize Pages Router.

# React Hook Form

- Utilize React Hook Form em todos os formulários.
- Utilize Zod para validação e `zodResolver` para integração.
- Utilize `z.infer<typeof schema>` para obter os tipos dos formulários.
- Reutilize os componentes existentes em `components/form`.
- Esses componentes já encapsulam o `Controller`; prefira utilizá-los em vez de usar `Controller` diretamente nas telas.
- Se não existir um componente adequado, crie um seguindo o padrão existente.
- Mantenha as regras de validação nos schemas Zod.
- Utilize `register` somente para elementos HTML nativos.

# Material UI

- Utilize Material UI como biblioteca de componentes.
- Prefira `sx` para estilização.
- Não utilize CSS Modules.
- Evite estilos duplicados.
- Reutilize componentes compartilhados sempre que possível.

# React Query

- Utilize React Query para integração com APIs.
- Não utilize `useQuery` ou `useMutation` diretamente nos componentes.
- Encapsule React Query em hooks customizados.
- Centralize a lógica de integração e gerenciamento de dados nos hooks apropriados.

# Hooks

- Utilize hooks para centralizar regras de negócio e lógica reutilizável.
- Declare explicitamente o retorno de hooks quando não for óbvio.
- Evite duplicação de lógica entre hooks.
- Não crie hooks apenas para encapsular código sem benefício claro.

# Services

- Utilize services para chamadas HTTP.
- Não coloque regras de negócio nos services.
- Não manipule estado da aplicação nos services.
- Não acesse `localStorage`, `sessionStorage` ou cookies nos services, salvo quando explicitamente exigido pela arquitetura.
- Services podem ser específicos de cada módulo quando necessário.

# Funções

- Prefira declarações `function` para funções nomeadas, componentes e hooks.
- Utilize arrow functions para callbacks e para funções exigidas ou retornadas por APIs de bibliotecas.
- Exemplos comuns: `handleSubmit`, `map`, `filter`, `reduce`, `useMemo`, `useCallback` e callbacks de eventos.
- Declare explicitamente o retorno de funções exportadas e de funções cujo tipo não seja óbvio.
- Nunca utilize `any` como tipo de retorno.

# Exportações

- Utilize named exports para componentes, hooks e funções reutilizáveis.
- Utilize `export default` nos arquivos especiais do Next.js:
  - `page.tsx`
  - `layout.tsx`
  - `loading.tsx`
  - `error.tsx`
  - `not-found.tsx`
- Em outros arquivos, utilize `default export` somente quando houver uma única exportação principal e isso for consistente com o padrão do projeto.

# Nomenclatura

Utilize inglês para todos os identificadores do código:

- módulos
- componentes
- hooks
- services
- funções
- variáveis
- interfaces
- tipos
- enums
- arquivos
- pastas
- rotas

Não misture português e inglês no mesmo identificador.

Utilize nomes claros, descritivos e consistentes.

Evite abreviações desnecessárias.

Sempre que possível, siga a nomenclatura adotada pelo ecossistema React, TypeScript, Next.js e Material UI.

Textos exibidos ao usuário devem utilizar o idioma da aplicação.

# Regra de Decisão

Antes de criar qualquer coisa nova, verifique:

1. Existe código semelhante que possa ser reutilizado?
2. A implementação existente pode ser evoluída?
3. A nova abstração é realmente necessária?
4. Isso é necessário para o requisito atual?

Escolha sempre a solução mais simples que mantenha a arquitetura e os padrões existentes.

# Idea Forge

O Idea Forge segue uma arquitetura incremental.

Implemente apenas o necessário para o requisito atual.

Não antecipe funcionalidades futuras.

Não crie abstrações prematuramente.

Priorize simplicidade, legibilidade, consistência e facilidade de manutenção.

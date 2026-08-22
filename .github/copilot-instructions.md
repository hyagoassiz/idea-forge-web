# Objetivo

Gere código consistente com o restante do projeto.

Sempre priorize:

1. Simplicidade.
2. Legibilidade.
3. Reutilização.
4. Consistência com os padrões existentes.

Nunca implemente soluções mais complexas do que o necessário para atender ao requisito.

---

# Antes de implementar

Antes de escrever qualquer código:

- Analise como funcionalidades semelhantes foram implementadas no projeto.
- Reutilize componentes, hooks, services, tipos e utilitários existentes sempre que possível.
- Mantenha consistência com a nomenclatura e os padrões já existentes no projeto.
- Não crie novos arquivos se a alteração puder ser realizada mantendo a organização do arquivo existente.
- Prefira evoluir arquivos existentes antes de criar novos.
- Não crie componentes, hooks, funções ou abstrações sem necessidade.
- Não altere código não relacionado à solicitação.
- Caso exista dúvida sobre alguma regra de negócio, peça esclarecimentos antes de implementar.

---

# Arquitetura

- Siga a estrutura de pastas existente.
- Organize funcionalidades por domínio de negócio.
- Evite acoplamento entre módulos.
- Crie novos módulos apenas quando houver necessidade real.
- Crie apenas as pastas necessárias para cada módulo.
- Não crie pastas vazias.
- Não antecipe estruturas para funcionalidades futuras.
- Extraia código reutilizável apenas quando houver benefício claro de reutilização ou legibilidade.
- Priorize evoluir implementações existentes antes de criar novas abstrações.

---

# Estrutura do Projeto

Utilize a seguinte organização:

```txt
src
├── app
├── modules
├── components
├── services
└── lib
```

Regras:

- Funcionalidades devem ficar em `modules`.
- Componentes compartilhados devem ficar em `components`.
- Integrações globais devem ficar em `services`.
- Utilitários globais devem ficar em `lib`.

Exemplo de módulo:

```txt
modules
└── users
    ├── components
    ├── hooks
    ├── services
    └── types
```

---

# TypeScript

- Nunca utilize `any`.
- Utilize tipos explícitos em funções públicas.
- Declare explicitamente o tipo de retorno de toda função.
- Não dependa da inferência de retorno.
- Prefira `interface` para DTOs e entidades.
- Evite type assertions desnecessários.
- Não duplique tipos existentes.
- Evite valores mágicos.

---

# React

- Declare componentes utilizando `function`.
- Mantenha componentes focados em renderização e interação do usuário.
- Não coloque regras de negócio dentro de componentes.
- Extraia regras de negócio para hooks customizados.
- Mantenha componentes pequenos e coesos.
- Reutilize componentes existentes antes de criar novos.
- Evite criar componentes apenas para extrair pequenos trechos de JSX que não serão reutilizados.

---

# Next.js

- Utilize App Router.
- Utilize Server Components por padrão.
- Utilize `"use client"` apenas quando necessário.
- Busque dados no servidor sempre que possível.
- Utilize Client Components apenas quando houver estado, eventos ou hooks do React.
- Não utilize Pages Router.

---

# React Hook Form

- Utilize React Hook Form em formulários.
- Utilize `Controller` para componentes do Material UI.
- Utilize `register` apenas para elementos HTML nativos.
- Controle `TextField`, `Select`, `Autocomplete`, `Checkbox`, `RadioGroup` e `Switch` utilizando `Controller`.

---

# Material UI

- Utilize Material UI como biblioteca de componentes.
- Prefira o prop `sx` para estilização.
- Não utilize CSS Modules.
- Evite estilos duplicados.
- Reutilize componentes compartilhados sempre que possível.

---

# React Query

- Utilize React Query para integração com APIs.
- Nunca utilize `useQuery` ou `useMutation` diretamente em componentes.
- Encapsule React Query em hooks customizados.
- Centralize chamadas de API e regras relacionadas nesses hooks.

---

# Hooks

- Declare explicitamente o tipo de retorno dos hooks.
- Centralize regras de negócio.
- Centralize integrações com APIs.
- Evite duplicação de lógica entre hooks.

---

# Services

- Utilize services apenas para chamadas HTTP.
- Não coloque regras de negócio em services.
- Não manipule estado da aplicação em services.
- Não acesse localStorage, sessionStorage ou cookies em services.
- Cada módulo pode possuir seus próprios services quando necessário.

---

# Funções

- Declare funções utilizando `function`.
- Utilize arrow functions apenas quando forem exigidas pela API utilizada ou quando houver ganho claro de legibilidade.
- Declare explicitamente o tipo de retorno de todas as funções, exceto componentes React que retornem `ReactElement` ou `ReactNode`, cujo retorno pode ser inferido pelo TypeScript.
- Não utilize `any` como tipo de retorno.

Exemplo correto:

```ts
function calculateTotal(items: Item[]): number {
  return items.reduce((total, item) => total + item.value, 0);
}
```

Exemplo incorreto:

```ts
const calculateTotal = (items: Item[]) => {
  return items.reduce((total, item) => total + item.value, 0);
};
```

---

### Exportações

- Utilize `export default function` apenas quando exigido pelo framework ou quando o arquivo possuir uma única exportação principal e esse padrão fizer sentido.
- Utilize `export function` para componentes, hooks e funções reutilizáveis.
- Arquivos especiais do Next.js, como `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx` e `not-found.tsx`, devem utilizar `export default`, conforme as convenções do Next.js.

Exemplos:

// Componente reutilizável
export function AuthCard() {
return <div />;
}

// Hook reutilizável
export function useCreateUser() {
// ...
}

// Função utilitária
export function calculateTotal() {
// ...
}

// Arquivo especial do Next.js
export default function RootLayout({
children,
}: Readonly<{ children: React.ReactNode }>) {
return (

<html>
<body>{children}</body>
</html>
);
}

---

# Nomenclatura

Utilize inglês para todos os identificadores do código.

Inclui:

- módulos;

- componentes;

- hooks;

- services;

- funções;

- variáveis;

- interfaces;

- tipos;

- enums;

- arquivos;

- pastas;

- rotas.

- Não misture português e inglês no mesmo identificador.

- Utilize nomes claros, descritivos e consistentes.

- Evite abreviações desnecessárias.

- Sempre que possível, utilize a nomenclatura adotada pelo ecossistema React, TypeScript, Next.js e Material UI.

Os textos exibidos ao usuário devem utilizar o idioma da aplicação.

Exemplos corretos:

- UserService
- CreateUserForm
- useCreateUser
- createUser
- transactionType
- accountBalance
- /users

Exemplos incorretos:

- UsuarioService
- CadastroUsuarioForm
- useCadastrarUsuario
- cadastrarUsuario
- tipoMovimentacao
- saldoConta
- /usuarios
- userSelecionado
- transactionAtual

---

# Cash Control

Este projeto segue uma arquitetura incremental.

- Implemente apenas o necessário para atender ao requisito atual.
- Não antecipe funcionalidades.
- Evolua componentes, módulos e abstrações apenas quando houver necessidade real.
- Sempre priorize simplicidade, legibilidade e facilidade de manutenção.

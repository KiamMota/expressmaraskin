# ExpressMaraskin

ExpressMaraskin é um servidor HTTP construído com Express e TypeScript, projetado para rodar como instância isolada por escola.

Ele foi feito para resolver um problema específico: oferecer um backend simples, previsível e de baixo custo operacional para um domínio pequeno, com leitura frequente e escrita eventual, sem depender de banco de dados.

Não é um framework. Não é um produto genérico. É uma solução objetiva para um escopo controlado.

O projeto foi criado para atender escolas que precisam:

* Expor dados simples via HTTP (ex: cardápio semanal)
* Permitir atualização administrativa protegida
* Rodar de forma independente por instância
* Evitar infraestrutura complexa

Cada escola executa sua própria instância do servidor.

Não há multi-tenant.
Não há compartilhamento de dados entre clientes.
Não há dependência de banco externo.

A prioridade é simplicidade operacional.

---

# Arquitetura

ExpressMaraskin utiliza uma arquitetura orientada a arquivos.

Isso significa que o sistema de arquivos é usado como camada de persistência.

Estrutura esperada:

```
/src        → código-fonte
src/files   → dados persistidos (JSON)
/config     → configuração
```

No startup, o servidor:

1. Garante que os arquivos necessários existem.
2. Lê os arquivos de configuração.
3. Carrega os dados em memória.

Durante a execução:

* Requisições de leitura consultam apenas memória.
* Escritas atualizam memória e depois persistem em disco.
* O disco não é consultado a cada request.

A memória é o estado ativo.
O arquivo é apenas persistência.

---

# Persistência

Os dados são armazenados em arquivos JSON.

Exemplo simplificado:

login.json

```json
{
  "nome": "admin",
  "senha": "123"
}
```

semana.json

```json
{
  "dias": []
}
```

Arquivos são tratados como estado inicial válido quando vazios ou inexistentes.

---

# Autenticação

O sistema possui autenticação baseada em token (JWT).

Fluxo:

1. O cliente envia nome e senha.
2. O servidor valida contra os dados carregados em memória.
3. Se válido, retorna um token.
4. Rotas protegidas exigem envio do token no header Authorization.

A lógica de autenticação é separada da camada HTTP.

---

# Escopo

Este projeto foi feito para:

* Baixo volume de escrita
* Volume moderado de leitura
* Estrutura de dados simples
* Instância isolada por cliente

Ele não tenta resolver problemas de alta concorrência, modelagem complexa ou consistência distribuída.

Ele resolve um problema pequeno com o menor nível de complexidade possível.

---

# Execução

Instalar dependências:

```
npm install
```

Executar em desenvolvimento:

```
npx ts-node src/server/server.ts
```

---

# Consideração

A escolha por arquivos em vez de banco de dados é deliberada.

Menos infraestrutura.
Menos dependências.
Menos superfície de falha.

Enquanto o domínio permanecer pequeno e controlado, essa abordagem é suficiente e operacionalmente eficiente.

Se o domínio crescer em complexidade, a arquitetura deve evoluir junto com ele.

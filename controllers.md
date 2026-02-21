## Controladores do ExpressMaraskin

### Login

#### POST /maraskin/login

* **Descrição:** Autentica o usuário com nome e senha e retorna um token JWT.
* **Parâmetros (body JSON):**

  * `nome` (string) - Nome do usuário.
  * `senha` (string) - Senha do usuário.
* **Resposta:**

  * `200 OK` com JSON `{ data: { token: string }, message: string, sucess: true }` se credenciais estiverem corretas.
  * `401 Unauthorized` se nome ou senha estiverem incorretos.
* **Notas:**

  * Esse endpoint **não requer token**.
  * Todos os endpoints POST/PUT de atualização da semana exigem que um token válido seja obtido a partir deste login.
  * Sem o token retornado aqui, não é possível realizar operações de POST ou PUT na API do Maraskin.

### SemanaController

Responsável por expor os dados da semana e de cada dia, bem como permitir atualizações parciais de dias.

---

### Rotas

#### GET /maraskin/semana (NÃO REQUER TOKEN)

* **Descrição:** Retorna a semana inteira.
* **Autorização:** Não requer token.
* **Parâmetros:** Nenhum.
* **Retorno:** `ResultDto` com o objeto `Semana` completo.

#### GET /maraskin/segunda (NÃO REQUER TOKEN)

* **Descrição:** Retorna os dados do dia segunda-feira.
* **Autorização:** Não requer token.
* **Parâmetros:** Nenhum.
* **Retorno:** `ResultDto` com o objeto `Dia` correspondente.

#### GET /maraskin/terca (NÃO REQUER TOKEN)

* **Descrição:** Retorna os dados do dia terça-feira.
* **Autorização:** Não requer token.
* **Parâmetros:** Nenhum.
* **Retorno:** `ResultDto` com o objeto `Dia` correspondente.

#### GET /maraskin/quarta (NÃO REQUER TOKEN)

* **Descrição:** Retorna os dados do dia quarta-feira.
* **Autorização:** Não requer token.
* **Parâmetros:** Nenhum.
* **Retorno:** `ResultDto` com o objeto `Dia` correspondente.

#### GET /maraskin/quinta (NÃO REQUER TOKEN)

* **Descrição:** Retorna os dados do dia quinta-feira.
* **Autorização:** Não requer token.
* **Parâmetros:** Nenhum.
* **Retorno:** `ResultDto` com o objeto `Dia` correspondente.

#### GET /maraskin/sexta (REQUER TOKEN)

* **Descrição:** Retorna os dados do dia sexta-feira.
* **Autorização:** Não requer token.
* **Parâmetros:** Nenhum.
* **Retorno:** `ResultDto` com o objeto `Dia` correspondente.

#### PUT /maraskin/segunda (REQUER TOKEN)

* **Descrição:** Atualiza os dados da segunda-feira.
* **Autorização:** Requer token JWT no header `Authorization`.
* **Parâmetros:** Body JSON do objeto `Dia` correspondente à segunda.
* **Comportamento:** Atualiza o cache em memória e salva no arquivo `semana.json`.
* **Retorno:** `ResultDto` com a segunda-feira atualizada e mensagem de sucesso.

#### PUT /maraskin/terca (REQUER TOKEN)

* **Descrição:** Atualiza os dados da terça-feira.
* **Autorização:** Requer token JWT.
* **Parâmetros:** Body JSON do objeto `Dia` correspondente à terça.
* **Comportamento:** Atualiza o cache e persiste em arquivo.
* **Retorno:** `ResultDto` com a terça-feira atualizada.

#### PUT /maraskin/quarta (REQUER TOKEN)

* **Descrição:** Atualiza os dados da quarta-feira.
* **Autorização:** Requer token JWT.
* **Parâmetros:** Body JSON do objeto `Dia` correspondente à quarta.
* **Comportamento:** Atualiza cache e arquivo.
* **Retorno:** `ResultDto` com a quarta-feira atualizada.

#### PUT /maraskin/quinta (REQUER TOKEN)

* **Descrição:** Atualiza os dados da quinta-feira.
* **Autorização:** Requer token JWT.
* **Parâmetros:** Body JSON do objeto `Dia` correspondente à quinta.
* **Comportamento:** Atualiza cache e arquivo.
* **Retorno:** `ResultDto` com a quinta-feira atualizada.

#### PUT /maraskin/sexta (REQUER TOKEN)

* **Descrição:** Atualiza os dados da sexta-feira.
* **Autorização:** Requer token JWT.
* **Parâmetros:** Body JSON do objeto `Dia` correspondente à sexta.
* **Comportamento:** Atualiza cache e arquivo.
* **Retorno:** `ResultDto` com a sexta-feira atualizada.

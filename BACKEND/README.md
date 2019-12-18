<h1 align="center">
  <img alt="Gympoint" title="Gympoint" src=".github/logo.png" width="200px" />
</h1>

<h3 align="center" style="color: #888; background: #f8f8f8; font-weight: normal"> 
	Desafio 2: Gympoint, o início</br>
	Desafio 3: Gympoint, continuando a aplicação
</h3>

<div style="margin: 50px 0px 25px 0px">
	<h4 align="left" style="color: #7159C1">Ambiente de Desenvolvimento</h4>
</div>

- [x] Docker Quickstart
- [x] Virtual Box
- [x] Imagem do Redis
- [x] Imagem do Postgres

**_Observações:_** 

Por se tratar de ambiente de desenvolvimento altera os IPs do containers.

1. **Postgres** no arquivo ./src/database.js.
2. **Redis** no arquivo ./src/redis.js

Para o gerenciamento de envio de e-mail foi usado o mailtrap.io

3. **Mailtrap.io** no arquivo ./src/mail.js

<div style="margin: 50px 0px 25px 0px">
	<h4 align="left" style="color: #7159C1">Ferramentas Usadas</h4>
</div>

- [x] NodeJs;
- [x] Yarn;
- [x] Express;
- [x] Sucrase + Nodemon;
- [x] ESLint + Prettier + EditorConfig;
- [x] Sequelize (PostgreSQL);

<div style="margin: 50px 0px 25px 0px">
	<h4 align="left" style="color: #7159C1">Base de Dados</h4>
</div>

<a href="CONTENT.md"><strong>Visualizar as tabelas</strong></a>

<div style="margin: 50px 0px 25px 0px">
	<h1 align="left" style="color: #7159C1">Requisitos</h4>
</div>

<div style="margin: 50px 0px 25px 0px">
	<h4 align="left" style="color: #7159C1">Funcionalidades</h4>
</div>

**1. Autenticação**

- [x] Permita que um usuário se autentique em sua aplicação utilizando e-mail e uma senha.
- [x] Crie um usuário administrador utilizando a funcionalidade de seeds do sequelize.
- [x] A autenticação deve ser feita utilizando JWT.
- [x] Realize a validação dos dados de entrada;  
  

**2. Cadastro de alunos**

- [x] Permita que alunos sejam mantidos (cadastrados/atualizados) na aplicação utilizando nome, email, idade, peso e altura.
- [x] Utilize uma nova tabela no banco de dados chamada **students**.
- [x] O cadastro de alunos só pode ser feito por administradores autenticados na aplicação.
- [x] O aluno não pode se autenticar no sistema, ou seja, não possui senha.

<div style="margin: 50px 0px 25px 0px">
	<h4 align="left" style="color: #7159C1">Funcionalidades do Administrador</h4>
</div>

**1. Gestão de planos**

- [x] Permita que o usuário possa cadastrar planos para matrícula de alunos, o plano deve possuir os seguintes campos:

  - title (nome do plano);
  - duration (duração em número de meses);
  - price (preço mensal do plano);
  - created_at;
  - updated_at;

- [x] Crie alguns planos;:

- [x] Rota para listagem;
- [x] Rota para cadastro;
- [x] Rota para atualização;
- [x] Rota para remoção de planos;


**2. Gestão de Matrículas**

- [x] Nessa funcionalidade criaremos um cadastro de matrículas por aluno, a matrícula possui os campos:

  - student_id (referência ao aluno);
  - plan_id (referência ao plano);
  - start_date (data de início da matrícula);
  - end_date (date de término da matrícula);
  - price (preço total calculado na data da matrícula);
  - created_at;
  - updated_at;

Observação:

​	A **data de início da matrícula** deve ser escolhida pelo usuário.

- [x] A **data de término e preço da matrícula** deve ser calculada com base no plano selecionado;
- [x] Quando um **aluno realiza uma matrícula** ele **recebe um e-mail** com detalhes da sua inscrição na academia como **plano, data de término, valor e uma mensagem de boas-vidas**.

- [x] Rotas para listagem;
- [x] Rota para cadastro;
- [x] Rota para atualização;
- [x] Rota para remoção de matrículas;

<div style="margin: 50px 0px 25px 0px">
	<h4 align="left" style="color: #7159C1">3. Funcionalidades do Aluno</h4>
</div>

**1. Check-In**

- [x] A tabela de **checkins** possui os campos:

  - student_id (referência ao aluno);
  - created_at;
  - updated_at;

- [x] O usuário só pode fazer 5 checkins dentro de um período de 7 dias corridos.  

- [x] Crie uma rota para listagem de todos checkins realizados por um usuário com base em seu ID de cadastro;  

**2. Pedidos de Auxílio**

- [x] A tabela **help_orders** deve conter os seguintes campos:
  - student_id (referência ao aluno);
  - question (pergunta do aluno em texto);
  - answer (resposta da academia em texto);
  - answer_at (data da resposta da academia);
  - created_at;
  - updated_at;

- [x] Crie uma rota para a academia listar todos pedidos de auxílio sem resposta;
- [x] Crie uma rota para o aluno cadastrar pedidos de auxílio apenas informando seu ID de cadastro (ID do banco de dados); 
- [x] Crie uma rota para listar todos pedidos de auxílio de um usuário com base em seu ID de cadastro;  
- [x] Crie uma rota para a academia responder um pedido de auxílio: 
- [x] Quando um pedido de auxílio for respondido, o aluno deve receber um e-mail da plataforma com a pergunta e resposta da academia;

**3. Novas funcionalidades**

- [x] 1. Adicione um campo **boolean true/false** na listagem de matrículas indicando se a matrícula está ativa ou não, ou seja, se a data de término é posterior à atual e a data de início inferior (utilize um campo VIRTUAL).

- [x] 2. Permita que a listagem de alunos (**/users**) seja filtrada por nome recebendo um Query Parameter **?q=Diego** e buscando no banco usuários com esse filtro (utilize o operador like). Caso o parâmetro não seja passado, retorne todos usuários;



## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.
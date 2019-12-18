<h1 align="center">
  <img alt="Gympoint" title="Gympoint" src=".github/logo.png" width="200px" />
</h1>

<h3 align="center" style="color: #888; background: #f8f8f8; font-weight: normal"> 	
	Desafio 9: Gympoint, front-end web
</h3>

<div style="margin: 50px 0px 25px 0px">
	<h4 align="left" style="color: #7159C1">🎨 Layout </h4>
</div>

<a href="CONTENT.md"><strong>Visualizar</strong></a>

<div style="margin: 50px 0px 25px 0px">
	<h1 align="left" style="color: #7159C1">Requisitos</h4>
</div>

<div style="margin: 50px 0px 25px 0px">
	<h4 align="left" style="color: #7159C1">Novas funcionalidades</h4>
</div>

**1. Adicione as seguintes funcionalidades no back-end**

- [x] Adicione um campo boolean `true/false` na listagem de matrículas indicando se a matrícula está ativa ou não;
- [x] Permita que a listagem de alunos (`/users`) seja filtrada por nome recebendo um Query Parameter `?q=Diego` e buscando no banco usuários com esse filtro;

**2. Informações importantes**

- [x] Antes de deletar qualquer registro do banco crie uma verificação adicinal usando a função `confirm` do JavaScript;
- [x] Para formatação de datas utilize sempre a biblioteca `date-fns`;
- [x] Não realize formatações de valores dentro do `return ()` nos componentes React, opte por formatar os dados assim que recebidos da API;
- [x] No cadastro/edição de planos e matrículas os inputs com fundo cinza são calculados automaticamente com base na seleção dos outros valores;
- [x] No cadastro/edição de matrícula deve ser possível buscar o aluno pelo nome, utilize o método `async` da biblioteca [React Select](https://react-select.com/home#async);
- [x]  Os planos devem ser buscados da API assim que a página carregar e não devem possuir filtro;



## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.
const express = require("express");
const bodyParser = require("body-parser");
const { readFileSync, writeFileSync } = require("fs");


const cadastro = require("./cadastro");
const { buscarPessoa, buscarPessoaPorId } = require("./buscar");
const { atualizarPessoa } = require("./atualizar");
const { excluirPorId, excluirPorNome } = require("./excluir");
const { listarOrdemAlfabetica, listarOrdemAlfabeticaInversa } = require("./listar");

const app = express();
app.use(bodyParser.json());


function carregarDados() {
  return JSON.parse(readFileSync("./banco.json", "utf-8"));
}
function salvarDados(data) {
  writeFileSync("./banco.json", JSON.stringify(data, null, 2), "utf-8");
}


app.post("/usuarios", (req, res) => {
  const { nome, email, senha } = req.body;
  cadastro(nome, email, senha);
  res.json({ mensagem: "Usuário cadastrado com sucesso!" });
});


app.get("/usuarios/nome", buscarPessoa);


app.get("/usuarios/id", buscarPessoaPorId);


app.put("/usuarios/:id", atualizarPessoa);


app.delete("/usuarios/:id", (req, res) => {
  const banco = carregarDados();
  const novoBanco = excluirPorId(banco, req.params.id);
  salvarDados(novoBanco);
  res.json({ mensagem: "Usuário excluído por ID." });
});


app.delete("/usuarios/nome/:nome", (req, res) => {
  const banco = carregarDados();
  const novoBanco = excluirPorNome(banco, req.params.nome);
  salvarDados(novoBanco);
  res.json({ mensagem: "Usuário excluído por nome." });
});


app.get("/usuarios/ordem", (req, res) => {
  const banco = carregarDados();
  res.json(listarOrdemAlfabetica(banco));
});


app.get("/usuarios/ordem-inversa", (req, res) => {
  const banco = carregarDados();
  res.json(listarOrdemAlfabeticaInversa(banco));
});


app.listen(3000, () => console.log("Servidor rodando em http://localhost:3000"));

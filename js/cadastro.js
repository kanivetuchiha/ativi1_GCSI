const { readFileSync, writeFileSync } = require("fs");

const carregarDados = () => {
  return JSON.parse(readFileSync("users.json", "utf-8"));
};

const salvarDados = (data) => {
  writeFileSync("users.json", JSON.stringify(data, null, 2), "utf-8");
};

const cadastro = function (nome, email, senha) {
  let data = carregarDados();

  const user = {
    nome: nome,
    email: email,
    senha: senha
  };

  data.users.push(user);
  salvarDados(data);
};

module.exports = cadastro;

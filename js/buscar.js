const { readFileSync } = require('fs');

function carregarDados() {
  return JSON.parse(readFileSync('./banco.json', 'utf-8'));
}

function buscar(banco, nome) {
  return banco.find(user => user.nome.toLowerCase() === nome.toLowerCase());
}

// 🔹 Nova função que busca por ID
function buscarPorId(banco, id) {
  return banco.find(user => user.id === Number(id));
}

function buscarPessoa(req, res) {
  const { nome } = req.query;

  if (!nome) {
    return res.status(400).json({ erro: 'Parâmetro "nome" é obrigatório.' });
  }

  try {
    const banco = carregarDados();
    const resultado = buscar(banco, nome);

    if (resultado) {
      res.json(resultado);
    } else {
      res.status(404).json({ mensagem: `Usuário "${nome}" não encontrado.` });
    }
  } catch (erro) {
    console.error('Erro ao ler ou processar os dados:', erro);
    res.status(500).json({ erro: 'Erro interno no servidor.' });
  }
}

function buscarPessoaPorId(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ erro: 'Parâmetro "id" é obrigatório.' });
  }

  try {
    const banco = carregarDados();
    const resultado = buscarPorId(banco, id);

    if (resultado) {
      res.json(resultado);
    } else {
      res.status(404).json({ mensagem: `Usuário com ID "${id}" não encontrado.` });
    }
  } catch (erro) {
    console.error('Erro ao ler ou processar os dados:', erro);
    res.status(500).json({ erro: 'Erro interno no servidor.' });
  }
}

module.exports = { buscarPessoa, buscarPessoaPorId };

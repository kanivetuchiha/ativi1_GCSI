const { readFileSync, writeFileSync } = require('fs');

function carregarDados() {
  return JSON.parse(readFileSync('./banco.json', 'utf-8'));
}

function salvarDados(banco) {
  writeFileSync('./banco.json', JSON.stringify(banco, null, 2), 'utf-8');
}

function atualizarPorId(banco, id, novosDados) {
  const index = banco.findIndex(user => user.id === Number(id));
  if (index === -1) return null;

  banco[index] = { ...banco[index], ...novosDados };
  return banco[index];
}

function atualizarPessoa(req, res) {
  const { id } = req.params; 
  const novosDados = req.body;

  if (!id) {
    return res.status(400).json({ erro: 'Parâmetro "id" é obrigatório.' });
  }

  try {
    const banco = carregarDados();
    const atualizado = atualizarPorId(banco, id, novosDados);

    if (atualizado) {
      salvarDados(banco);
      res.json({ mensagem: 'Usuário atualizado com sucesso.', usuario: atualizado });
    } else {
      res.status(404).json({ mensagem: `Usuário com ID "${id}" não encontrado.` });
    }
  } catch (erro) {
    console.error('Erro ao atualizar os dados:', erro);
    res.status(500).json({ erro: 'Erro interno no servidor.' });
  }
}

module.exports = { atualizarPessoa };

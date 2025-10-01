function excluirPorId(array, id) {
  return array.filter(item => item.id !== id);
}

function excluirPorNome(array, nome) {
  return array.filter(item => item.nome.toLowerCase() !== nome.toLowerCase());
}

module.exports = { excluirPorId, excluirPorNome };

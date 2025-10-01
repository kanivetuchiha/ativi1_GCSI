function listarOrdemAlfabetica(array) {
  return [...array].sort((a, b) => a.nome.localeCompare(b.nome));
}

function listarOrdemAlfabeticaInversa(array) {
  return [...array].sort((a, b) => b.nome.localeCompare(a.nome));
}

module.exports = { listarOrdemAlfabetica, listarOrdemAlfabeticaInversa };

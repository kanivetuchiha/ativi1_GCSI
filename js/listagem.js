
function listarOrdemAlfabetica(array) {
  return [...array].sort((a, b) => a.nome.localeCompare(b.nome));
}

export { listarOrdemAlfabetica };
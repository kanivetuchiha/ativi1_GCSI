function excluirPorId(array, id) {
  return array.filter(item => item.id !== id);
}


export { excluirPorId };
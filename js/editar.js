import { readFileSync, writeFileSync } from 'fs';

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




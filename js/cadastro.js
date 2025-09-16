const banco= []

const cadastro = function (nome, email, senha) {
    const user = {
        nome: nome,
        email: email,
    senha: senha
}
    banco.push(user)
    console.log(banco)
}

    console.log(banco)
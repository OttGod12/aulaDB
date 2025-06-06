const db = require("../config/database");

// Função responsável por criar um novo produto
exports.cadastrarProduto = async function(novo_produto){

    const extensao_arquivo = novo_produto.imagem.name.split(".").pop();

    const resposta = await db.query(
        'INSERT INTO produto (nome, valor, imagem) VALUES ($1, $2, $3) returning id_produto',
        [novo_produto.nome, novo_produto.valor, extensao_arquivo]
    );
    //console.log(resposta)
    return resposta.rows[0].id_produto;
}

//Função responsável por listar todos os produtos
exports.listarProdutos = async function(){
    const {rows} = await db.query("SELECT * FROM produto")
    return rows;
}

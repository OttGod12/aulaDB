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


// Função responsável por remover um produto
exports.removerProduto = async function(id){
    const resultado = await db.query(`DELETE FROM produto WHERE id_produto = ${id}`)

    return true;
}

//Função responsável por consultar um produto
exports.consultarProduto = async function(id) {
    const {rows} = await db.query(`SELECT * FROM produto WHERE id_produto = ${id}`)

    return rows[0]
}

// Função responsável por atualizr um produto
exports.atualizarProduto = async function(produto){
    if(produto.imagem === null){
        const resposta = await db.query(`UPDATE produto SET nome='${produto.nome}', valor=${produto.valor} WHERE id_produto=${produto.id_produto}`);
    }else{
        const extensao_img = produto.imagem.name.split(".").pop();
        const resposta = await db.query(`UPDATE produto SET nome='${produto.nome}', valor=${produto.valor}, imagem='${extensao_img}' WHERE id_produto=${produto.id_produto}`);
    }
}
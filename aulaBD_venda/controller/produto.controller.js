const produtoDAO = require("../model/produto.dao");
const path = require('path');
const fs = require('fs');

// Função responsável por criar um novo produto
exports.cadastrarProduto = async function(novo_produto){
    const caminho = path.join(__dirname, '..', 'imagens/');
    const id_produto = await produtoDAO.cadastrarProduto(novo_produto);

    extensao_arquivo = novo_produto.imagem.name.split(".");

    novo_produto.imagem.mv(caminho+id_produto+'.'+extensao_arquivo.pop());

    return true;
}

// Função responsável por listar todos os produtos
exports.listarProdutos = async function(){
    return produtoDAO.listarProdutos();
}

// Função responsável por remover um produto
exports.removerProduto = async function(id, imagem) {
    produtoDAO.removerProduto(id);
    
    fs.unlink(path.join(__dirname, '..', '/imagens/'+id+'.'+imagem), (erro) => {
        if(erro){
            console.log('Falha ao remover a imagem.')
        }else{
            console.log('Imagem removida.')
        }
    })

    return true
}

// Função responsável por consultar um produto
exports.consultarProduto = async function(id){
    return produtoDAO.consultarProduto(id);
}

// Função responsável por atualizar um produto
exports.atualizarProduto = async function(produto, extImagem){
    const resposta = await produtoDAO.atualizarProduto(produto);

    if(produto.imagem !== null){
        fs.unlink(path.join(__dirname, '..', '/imagens/'+produto.id_produto+'.'+extImagem), (erro) => {
            if(erro){
                console.log('Falha ao remover a imagem.')
            }else{
                console.log('Imagem removida.')
            }
        })

        const caminho = path.join(__dirname, '..', 'imagens/');

        const extensao_img = produto.imagem.name.split(".").pop();

        produto.imagem.mv(caminho + produto.id_produto + '.' + extensao_img)


    }
}

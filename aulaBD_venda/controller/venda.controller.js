const vendaDAO = require('../model/venda.dao');

//criar nova venda
exports.cadastrarVenda = async function (nova_venda){
    return await vendaDAO.cadastrarVenda(nova_venda)
}
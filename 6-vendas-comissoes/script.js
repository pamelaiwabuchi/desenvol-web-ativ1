let vendas = []

function adicionarVenda() {

    let metaMensal = document.getElementById('metaMensal').value;
    metaMensal = metaMensal.replace(',', '.');
    metaMensal = Number(metaMensal);
    let percentualComissao = document.getElementById('percentualComissao').value;
    percentualComissao = percentualComissao.replace(',', '.');
    percentualComissao = Number(percentualComissao) / 100;
    let codigoVenda = document.getElementById('codigoVenda').value;
    codigoVenda = codigoVenda.replace(',', '.');
    codigoVenda = Number(codigoVenda);
    let codigoVendedor = document.getElementById('codigoVendedor').value;
    codigoVendedor = Number(codigoVendedor);
    let regiao = document.getElementById('regiao').value;
    regiao = Number(regiao);
    let valorVenda = document.getElementById('valorVenda').value;
    valorVenda = valorVenda.replace(',', '.');
    valorVenda = Number(valorVenda);
    let tipoCliente = document.getElementById('tipoCliente').value;

    let comissaoBase = valorVenda * percentualComissao
    
    let codigoRepetido = false
    for (let i = 0; i<vendas.length; i++) {
        if (vendas[i].codigoVenda === codigoVenda) {
            codigoRepetido = true;
            break
        }
    }
    if (codigoRepetido) {
        alert('Este código de venda já existe!')
        return
    }

    let bonusTipo = 0
    if (tipoCliente === 'PF') {
        bonusTipo = valorVenda * 0.02;
    } else if (tipoCliente === 'PJ') {
        bonusTipo = valorVenda * 0.03;
    }

    let bonusRegiao = 0
    if (regiao === 1 || regiao === 2) {
        bonusRegiao = valorVenda * 0.01
    } else if (regiao === 3) {
        bonusRegiao = valorVenda * 0
    } else if (regiao === 4) {
        bonusRegiao = valorVenda * 0.005
    }

    let comissaoTotal = bonusTipo + bonusRegiao + comissaoBase

    const novaVenda = {
        codigoVenda: codigoVenda,
        codigoVendedor: codigoVendedor,
        regiao: regiao,
        valorVenda: valorVenda,
        tipoCliente: tipoCliente,
        comissaoTotal: comissaoTotal
    }

    vendas.push(novaVenda);
    document.getElementById('codigoVenda').value = '';
    document.getElementById('codigoVendedor').value = '';
    document.getElementById('regiao').selectedIndex = 0;
    document.getElementById('valorVenda').value = '';
    document.getElementById('tipoCliente').selectedIndex = 0;

}

function gerarRelatorio() {
    let codigoAtual = document.getElementById('codigoVenda').value
    if (codigoAtual !== '') {
        adicionarVenda()
    }
    if (vendas.length === 0) {
        alert('Nenhum pedido foi adicionado ainda!')
        return
    }

    let metaMensal = Number(document.getElementById('metaMensal').value.replace(',', '.'));
    // crio um dicionario como 102: 435, 40 - codigo: totalVendido, totalComissao
    const totaisPorVendedor = {}
    for (let i=0; i<vendas.length; i++) {
        const vendedor = vendas[i].codigoVendedor;

        if (!totaisPorVendedor[vendedor]) {
            totaisPorVendedor[vendedor] = {
                totalVendido: 0,
                totalComissao:0
            };
        }
        totaisPorVendedor[vendedor].totalVendido += vendas[i].valorVenda;
        totaisPorVendedor[vendedor].totalComissao += vendas[i].comissaoTotal;
    }

    const totalVendas = vendas.length;
    console.log('Total de vendas registradas:', totalVendas)

    let totalNorte = 0
    let totalNordeste = 0
    let totalSul = 0
    let totalSudeste = 0

    for (let i=0; i<vendas.length; i++) {
        if (vendas[i].regiao === 1) {
            totalNorte = totalNorte + vendas[i].valorVenda
        } else if (vendas[i].regiao === 2) {
            totalNordeste = totalNordeste + vendas[i].valorVenda
        } else if (vendas[i].regiao === 3) {
            totalSudeste = totalSudeste + vendas[i].valorVenda
        } else if (vendas[i].regiao === 4) {
            totalSul = totalSul + vendas[i].valorVenda
        }
    }

    let totalPF = 0;
    let totalPJ = 0;
    for (let i=0; i<vendas.length; i++) {
        if (vendas[i].tipoCliente === "PF") {
            totalPF = totalPF + vendas[i].valorVenda
        } else if (vendas[i].tipoCliente === 'PJ') {
            totalPJ = totalPJ + vendas[i].valorVenda
        }
    }

    let vendedorMaisVenda = '';
    let maiorValorVendido = 0;

    for (let i in totaisPorVendedor) {
        if (totaisPorVendedor[i].totalVendido > maiorValorVendido) {
            maiorValorVendido = totaisPorVendedor[i].totalVendido;
            vendedorMaisVenda = i;
        }
    }

    let vendedorMaiorComissao = ''
    let maiorComissao = 0
    for (let i in totaisPorVendedor) {
        if (totaisPorVendedor[i].totalComissao > maiorComissao) {
            maiorComissao = totaisPorVendedor[i].totalComissao;
            vendedorMaiorComissao = i;
        }
    }

    let qtdeBateuMeta = 0
    for (let i in totaisPorVendedor) {
        if (totaisPorVendedor[i].totalVendido >= metaMensal){
            qtdeBateuMeta = qtdeBateuMeta + 1
        }
    }

    let totalComissaoGeral = 0
    for (let i=0;i<vendas.length;i++) {
        totalComissaoGeral += vendas[i].comissaoTotal;
    }
    let mediaComissaoGeral = totalComissaoGeral / vendas.length;

    let comissaoNorte = 0;
    let qtdNorte = 0;

    let comissaoNordeste = 0;
    let qtdNordeste = 0;

    let comissaoSudeste = 0;
    let qtdSudeste = 0;

    let comissaoSul = 0;
    let qtdSul = 0;

    for (let i = 0; i < vendas.length; i++) {
        if (vendas[i].regiao === 1) {
            comissaoNorte = comissaoNorte + vendas[i].comissaoTotal;
            qtdNorte = qtdNorte + 1;
        } else if (vendas[i].regiao === 2) {
            comissaoNordeste = comissaoNordeste + vendas[i].comissaoTotal;
            qtdNordeste = qtdNordeste + 1;
        } else if (vendas[i].regiao === 3) {
            comissaoSudeste = comissaoSudeste + vendas[i].comissaoTotal;
            qtdSudeste = qtdSudeste + 1;
        } else if (vendas[i].regiao === 4) {
            comissaoSul = comissaoSul + vendas[i].comissaoTotal;
            qtdSul = qtdSul + 1;
        }
    }
        let mediaNorte = 0;
        if (qtdNorte > 0) {
            mediaNorte = comissaoNorte / qtdNorte;
        }
        let mediaNordeste = 0;
        if (qtdNordeste > 0) {
            mediaNordeste = comissaoNordeste / qtdNordeste;
        }
        let mediaSudeste = 0;
        if (qtdSudeste > 0) {
            mediaSudeste = comissaoSudeste / qtdSudeste;
        }
        let mediaSul = 0;
        if (qtdSul > 0) {
            mediaSul = comissaoSul / qtdSul;
        }

    document.getElementById('relatorio').innerHTML = `
    <p>Total de vendas registradas: ${totalVendas}</p>
    <p>Valor total vendido na região Norte: R$ ${totalNorte}</p>
    <p>Valor total vendido na região Nordeste: R$ ${totalNordeste}</p>
    <p>Valor total vendido na região Sudeste: R$ ${totalSudeste}</p>
    <p>Valor total vendido na região Sul: R$ ${totalSul}</p>
    <p>Valor total vendido para cliente PF: R$ ${totalPF}</p>
    <p>Valor total vendido para cliente PJ: R$ ${totalPJ}</p>
    <p>Vendedor com maior valor total de vendas: ${vendedorMaisVenda}</p>
    <p>Vendedor com maior comissão Total: ${vendedorMaiorComissao}</p>
    <p>Quantidade de Vendedores que bateram a Meta: ${qtdeBateuMeta}</p>
    <p>Comissão Média Geral: R$ ${mediaComissaoGeral}</p>
    <p>Comissão Média Região Norte: R$ ${mediaNorte}</p>
    <p>Comissão Média Região Nordeste: R$ ${mediaNordeste}</p>
    <p>Comissão Média Região Sudeste: R$ ${mediaSudeste}</p>
    <p>Comissão Média Região Sul: R$ ${mediaSul}</p>
`;
    


}
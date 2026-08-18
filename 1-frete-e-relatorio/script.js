const regiaoValida = [1,2,3]
let pedidos = []

function adicionarPedido() {

    let combustivel = document.getElementById("combustivel").value;
    combustivel = combustivel.replace(",", ".");
    combustivel = Number(combustivel);

    let distancia = document.getElementById("distancia").value;
    distancia = distancia.replace(",",".")
    distancia = Number(distancia)
    let valorFrete = combustivel * distancia

    let codigo = document.getElementById("codigo").value;
    let codigoRepetido = false;
    for (let i=0; i<pedidos.length;i++) {
        if (pedidos[i].codigo === codigo) {
            codigoRepetido = true
        }
    } 
    if (codigoRepetido) {
        alert('Esse código de pedido já existe. Insira outro valor para prosseguir.');
        return;
    }

    let regiao = document.getElementById("regiao").value;
    regiao = Number(regiao)
    while (!regiaoValida.includes(regiao)) {
        regiao = prompt('Região inválida! Digite 1 (sudeste), 2 (sul) ou 3 (Centro-Oeste):')
        regiao = Number(regiao)
    }
    let precoPorPeca;
    switch (regiao) {
        case 1:
            precoPorPeca = 1.20;
            break;
        case 2:
            precoPorPeca = 1.30;
            break;
        case 3:
            precoPorPeca = 1.50;
            break;
    }

    let quantidade = document.getElementById("quantidade").value;
    quantidade = quantidade.replace(",",".")
    quantidade = Number(quantidade)
    let excedente = quantidade - 1000
    let valorPecas;
    if (excedente > 0) {
        valorPecas = (1000*precoPorPeca + 0.88 * excedente * precoPorPeca)        
    } else {
        valorPecas = quantidade * precoPorPeca
    }

    let sim = document.getElementById("sim").checked;
    let valorRastreamento;
    if (sim) { 
        valorRastreamento = 200
    } else {
        valorRastreamento = 0
    }
    
    let somatotal = valorFrete + valorPecas + valorRastreamento

    let pedido = {codigo: codigo, regiao: regiao, totalPago: somatotal}

    pedidos.push(pedido)

    document.getElementById('codigo').value = '';
    document.getElementById('regiao').value = '';
    document.getElementById('distancia').value = '';
    document.getElementById('quantidade').value = '';
    document.getElementById('sim').checked = false;
    document.getElementById('nao').checked = false;
    alert('Pedido adicionado!')

}

function gerarRelatorio() {

    let codigoAtual = document.getElementById('codigo').value;
    if (codigoAtual !== '') {
        adicionarPedido();
    }

    if (pedidos.length === 0) {
        alert('Nenhum pedido foi adicionado ainda!');
        return;
    }

    let totalPedidos = pedidos.length;
    let somaTotalGeral = 0;
    for (let i=0; i<pedidos.length;i++) {
        somaTotalGeral = somaTotalGeral + pedidos[i].totalPago;
    }
    let valorMedio = somaTotalGeral / totalPedidos

    let totalRegiao1 = 0;
    let totalRegiao2 = 0;
    let totalRegiao3 = 0;
    for (let i=0; i<pedidos.length; i++) {
        if (pedidos[i].regiao === 1 ) {
            totalRegiao1 = totalRegiao1 + pedidos[i].totalPago
        } else if (pedidos[i].regiao === 2 ) {
            totalRegiao2 = totalRegiao2 + pedidos[i].totalPago
        } else {
            totalRegiao3 = totalRegiao3 + pedidos[i].totalPago
        }
    }

    let pedidoMaisCaro = pedidos[0]
    let pedidoMaisBarato = pedidos[0]

    for (let i=0; i<pedidos.length; i++) {
        if (pedidos[i].totalPago > pedidoMaisCaro.totalPago) {
            pedidoMaisCaro = pedidos[i]
        } if (pedidos[i].totalPago < pedidoMaisBarato.totalPago){
            pedidoMaisBarato = pedidos[i]
        }
    }

    document.getElementById('relatorio').innerHTML = `
        <p>Total de pedidos: ${totalPedidos}</p>
        <p>Valor médio: ${valorMedio}</p>
        <p>Valor total da Região 1: ${totalRegiao1}</p>
        <p>Valor total da Região 2: ${totalRegiao2}</p>
        <p>Valor total da Região 3: ${totalRegiao3}</p>
        <p>Código do pedido de maior valor: ${pedidoMaisCaro.codigo}</p>
        <p>Valor do pedido de maior valor: ${pedidoMaisCaro.totalPago}</p>
        <p>Código do pedido de menor valor: ${pedidoMaisBarato.codigo}</p>
        <p>Valor do pedido de menor valor: ${pedidoMaisBarato.totalPago}</p>
    `;
}


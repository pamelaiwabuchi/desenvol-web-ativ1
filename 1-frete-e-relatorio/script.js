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


}


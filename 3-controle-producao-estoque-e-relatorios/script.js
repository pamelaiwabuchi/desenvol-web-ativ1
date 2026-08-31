const ordens = []

function adicionarOrdem(){

    let codigoOrdem = document.getElementById('codigoOrdem').value;
    codigoOrdem = Number(codigoOrdem)
    let custoUnit = document.getElementById('custoUnit').value
    custoUnit = Number(custoUnit)
    let tipo = document.getElementById('tipo').value;
    tipo = Number(tipo)
    let qtdeProduzida = document.getElementById('qtdeProduzida').value
    qtdeProduzida = Number(qtdeProduzida)
    let estoqueInicial = document.getElementById('estoqueInicial').value
    estoqueInicial = Number(estoqueInicial)
    let codigoProduto = document.getElementById('codigoProduto').value;
    codigoProduto = Number(codigoProduto)

    // checagem de codigo repetido
    let codigoRepetido = false
    for (let i=0; i<ordens.length;i++) {
        if (ordens[i].codigoOrdem === codigoOrdem){
            codigoRepetido = true
        }
    }
    if (codigoRepetido) {
        alert('Esse código de pedido já existe. Insira outro valor para prosseguir.');
        return;
    }

    // verificar se é padrão, premium ou sob encomenda
    while (tipo < 1 || tipo > 3) {
        tipo = Number(prompt("Tipo inválido! Digite 1 (Padrão), 2 (Premium) ou 3 (Sob encomenda):"));
    }
        
    switch (tipo) {
        case 1:
            break;
        case 2:
            custoUnit = custoUnit*1.10
            break;
        case 3:
            custoUnit = custoUnit*1.20
            break
    }

    let estoqueFinal = estoqueInicial + qtdeProduzida
    let custoTotal = qtdeProduzida * custoUnit

    if (estoqueFinal > 5000) {
        alert('Estoque alto!')
    } else if (estoqueFinal < 500) {
        alert('Estoque crítico!')
    }

    const novaOrdem = {
        codigoOrdem: codigoOrdem,
        codigoProduto: codigoProduto,
        tipo: tipo,
        qtdeProduzida: qtdeProduzida,
        custoUnitario: custoUnit,
        estoqueInicial: estoqueInicial,
        estoqueFinal: estoqueFinal,
        custoTotal: custoTotal
    }

    ordens.push(novaOrdem)

    document.getElementById('codigoOrdem').value = '';
    document.getElementById('codigoProduto').value = '';
    document.getElementById('tipo').value = '';
    document.getElementById('qtdeProduzida').value = '';
    document.getElementById('custoUnit').value = '';
    document.getElementById('estoqueInicial').value = '';
    alert('Ordem adicionada com sucesso!');

}

function gerarRelatorio() {

    const codigoDigitado = document.getElementById('codigoOrdem').value
    if (codigoDigitado !== '') {
        adicionarOrdem()
    }

    if (ordens.length === 0){
        alert("Nenhuma ordem cadastrada ainda!");
        return;
    }

    const totalOrdens = ordens.length

    let estoqueTipo1 = 0; // padrap
    let estoqueTipo2 = 0; // prem
    let estoqueTipo3 = 0; // sob enc

    for (let i = 0; i < ordens.length; i++) {
        if (ordens[i].tipo === 1) {
            estoqueTipo1 = estoqueTipo1 + ordens[i].estoqueFinal;
        } else if (ordens[i].tipo === 2) {
            estoqueTipo2 = estoqueTipo2 + ordens[i].estoqueFinal;
        } else if (ordens[i].tipo === 3) {
            estoqueTipo3 = estoqueTipo3 + ordens[i].estoqueFinal;
        }
    }

    let somaCustoTotal = 0;
    for (let i = 0; i < ordens.length; i++) {
        somaCustoTotal = somaCustoTotal + ordens[i].custoTotal;
    } // somar o custo de todas as ordens 
    let mediaCustoOrdem = somaCustoTotal / ordens.length;

    let ordemMaisCara = ordens[0];
    for (let i = 0; i < ordens.length; i++) {
        if (ordens[i].custoTotal > ordemMaisCara.custoTotal) {
            ordemMaisCara = ordens[i];
        }
    }

    let ordemMaisBarata = ordens[0];
    for (let i = 0; i < ordens.length; i++) {
        if (ordens[i].custoTotal < ordemMaisBarata.custoTotal) {
            ordemMaisBarata = ordens[i];
        }
    }
    let ordensEstoqueAlto = 0;
    let ordensEstoqueCritico = 0;
    for (let i = 0; i < ordens.length; i++) {
        if (ordens[i].estoqueFinal > 5000) {
            ordensEstoqueAlto = ordensEstoqueAlto + 1;
        } else if (ordens[i].estoqueFinal < 500) {
            ordensEstoqueCritico = ordensEstoqueCritico + 1;
        }
    }

    const produtos = {};
    for (let i = 0; i < ordens.length; i++) {
        let codigo = ordens[i].codigoProduto;
        if (!produtos[codigo]) {
            produtos[codigo] = {
                estoqueConsolidado: 0,
                totalInvestido: 0
            };
        }
        produtos[codigo].estoqueConsolidado += ordens[i].estoqueFinal;
        produtos[codigo].totalInvestido += ordens[i].custoTotal;
    }
    let textoProdutos = "";
    for (let cod in produtos) {
        textoProdutos += `<p>Produto ${cod} -> Estoque Final: ${produtos[cod].estoqueConsolidado} | Total Investido: R$ ${produtos[cod].totalInvestido.toFixed(2)}</p>`;
    }
    document.getElementById('relatorio').innerHTML = `
    <p>Total de ordens registradas: ${totalOrdens}</p>
    <p>Estoque total final de produto Padrão: ${estoqueTipo1}</p>
    <p>Estoque total final de produto Premium: ${estoqueTipo2}</p>
    <p>Estoque total final de produto Sob encomenda: ${estoqueTipo3}</p>
    <p>Média de custo total por ordem: R$ ${mediaCustoOrdem}</p>
    <p>Ordem com maior custo total (código e valor): R$ ${ordemMaisCara.custoTotal}, código: ${ordemMaisCara.codigoOrdem}</p>
    <p>Ordem com menor custo total (código e valor): Código ${ordemMaisBarata.codigoOrdem} (R$ ${ordemMaisBarata.custoTotal})</p>
    <p>Ordens com alerta de estoque alto: ${ordensEstoqueAlto}</p>
    <p>Ordens com alerta de estoque crítico: ${ordensEstoqueCritico}</p>
    ${textoProdutos}
    `
    

}
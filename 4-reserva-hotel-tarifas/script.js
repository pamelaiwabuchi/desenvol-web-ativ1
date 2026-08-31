let reservas = []

function adicionarReserva() {

    let valorBaseDiaria = document.getElementById('valorBaseDiaria').value;
    valorBaseDiaria = Number(valorBaseDiaria)
    let valorCafe = document.getElementById('valorCafe').value;
    valorCafe = Number(valorCafe.replace(',', '.'));
    let tipoQuarto = document.getElementById('tipoQuarto').value;
    let temporada = document.getElementById('temporada').value;
    let qtdeDiarias = document.getElementById('qtdeDiarias').value;
    qtdeDiarias = Number(qtdeDiarias)
    let numHospedes = document.getElementById('numHospedes').value;
    numHospedes = Number(numHospedes)
    let cafeIncluso = document.getElementById('cafeIncluso').value;
    let codigoReserva = document.getElementById('codigoReserva').value;

    let codigoRepetido = false
    for (let i=0; i<reservas.length;i++) {
        if (reservas[i].codigoReserva === codigoReserva) {
            codigoRepetido = true
        }
    }
    if (codigoRepetido) {
        alert('Esse código de pedido já existe. Insira outro valor para prosseguir.');
        return;
    }

    let valorDiariaTipo = valorBaseDiaria
    switch (tipoQuarto) {
        case 'S':
            valorDiariaTipo = valorBaseDiaria * 1.0;
            break;
        case 'L':
            valorDiariaTipo = valorBaseDiaria * 1.5; 
            break;
        case 'P':
            valorDiariaTipo = valorBaseDiaria * 2.0;
            break;
    }

    let ajusteTemporada = 0
    switch (temporada) {
        case 'B':
            ajusteTemporada = valorDiariaTipo
            break
        case 'A':
            ajusteTemporada = valorDiariaTipo * 1.25
            break
        case 'F':
            ajusteTemporada = valorDiariaTipo * 1.40
    }

    let cafeTotal = 0
    if (cafeIncluso === 'S') {
        cafeTotal = valorCafe * numHospedes * qtdeDiarias;
    }
    
    let valorTotal = (ajusteTemporada*qtdeDiarias) + cafeTotal

    const novaReserva = {
        valorBaseDiaria:valorBaseDiaria,
        valorCafe: valorCafe,
        tipoQuarto:tipoQuarto,
        temporada:temporada,
        qtdeDiarias:qtdeDiarias,
        numHospedes:numHospedes,
        cafeIncluso:cafeIncluso,
        codigoReserva:codigoReserva,
        valorTotal: valorTotal
    }

    reservas.push(novaReserva)
    document.getElementById('codigoReserva').value = '';
    document.getElementById('tipoQuarto').value = '';
    document.getElementById('temporada').value = '';
    document.getElementById('qtdeDiarias').value = '';
    document.getElementById('numHospedes').value = '';
    document.getElementById('cafeIncluso').value = '';

    alert('Reserva adicionada com sucesso!');

}

function gerarRelatorio() {
    const codigoDigitado = document.getElementById('codigoReserva').value
    if (codigoDigitado !== '') {
        adicionarReserva()
    }

    if (reservas.length === 0){
        alert("Nenhuma reserva cadastrada ainda!");
        return;
    }

    let totalReservasCadastradas = reservas.length
    let totalGeralReservas = 0
    for (let i=0;i<reservas.length;i++) {
        totalGeralReservas = totalGeralReservas + reservas[i].valorTotal
    }
    let mediaReservas = totalGeralReservas / totalReservasCadastradas

    let totalStandard = 0
    let totalLuxo =0
    let totalPremium =0

    for (let i=0;i<reservas.length;i++) {
        if(reservas[i].tipoQuarto === 'S'){
            totalStandard = totalStandard + reservas[i].valorTotal
        } else if (reservas[i].tipoQuarto === 'L'){
            totalLuxo = totalLuxo + reservas[i].valorTotal
        } else if (reservas[i].tipoQuarto === 'P'){
            totalPremium = totalPremium + reservas[i].valorTotal
        }
    }

    let valorBaixa =0
    let valorAlta =0
    let valorFeriado=0

    for (let i=0;i<reservas.length;i++) {
        if(reservas[i].temporada === 'B'){
            valorBaixa = valorBaixa + reservas[i].valorTotal
        } else if (reservas[i].temporada === 'A'){
            valorAlta = valorAlta + reservas[i].valorTotal
        } else if (reservas[i].temporada === 'F'){
            valorFeriado = valorFeriado + reservas[i].valorTotal
        }
    }

    let reservaMaisCara = reservas[0];
    let reservaMaisBarata = reservas[0];

    for (let i = 0; i < reservas.length; i++) {
        let r = reservas[i];
        if (r.valorTotal > reservaMaisCara.valorTotal) {
            reservaMaisCara = r;
        }
        if (r.valorTotal < reservaMaisBarata.valorTotal) {
            reservaMaisBarata = r;
        }
    }

    let reservasComCafe = 0;
    let reservasSemCafe = 0;

    for (let i = 0; i < reservas.length; i++) {
        let r = reservas[i];
        if (r.cafeIncluso === 'S') {
            reservasComCafe = reservasComCafe + 1;
        } else {
            reservasSemCafe = reservasSemCafe +1;
        }
    }

    let ocupacaoTotal = 0;
    let totalHospedes = 0;
    let faturamentoTotal = 0;

    for (let i = 0; i < reservas.length; i++) {
        let r = reservas[i];
        ocupacaoTotal = ocupacaoTotal + (r.qtdeDiarias * r.numHospedes);
        totalHospedes = totalHospedes + r.numHospedes;
        faturamentoTotal = faturamentoTotal + r.valorTotal;
    }

    let mediaPorHospede = faturamentoTotal / totalHospedes;

    document.getElementById('relatorio').innerHTML = `
        <h2>Relatório Consolidado de Reservas</h2>
        <p>Total de reservas cadastradas: ${totalReservasCadastradas}</p>
        <p>Valor médio por reserva: R$ ${mediaReservas.toFixed(2)}</p>
        <h3>Valor Total por Tipo de Quarto:</h3>
        <p>Standard (S): R$ ${totalStandard.toFixed(2)}</p>
        <p>Luxo (L): R$ ${totalLuxo.toFixed(2)}</p>
        <p>Premium (P): R$ ${totalPremium.toFixed(2)}</p>
        <h3>Valor Total por Temporada:</h3>
        <p>Baixa (B): R$ ${valorBaixa.toFixed(2)}</p>
        <p>Alta (A): R$ ${valorAlta.toFixed(2)}</p>
        <p>Feriado (F): R$ ${valorFeriado.toFixed(2)}</p>
        <p><strong>Reserva mais cara:</strong> Código ${reservaMaisCara.codigoReserva} | Tipo: ${reservaMaisCara.tipoQuarto} | Temporada: ${reservaMaisCara.temporada} | Hóspedes: ${reservaMaisCara.numHospedes} | Valor: R$ ${reservaMaisCara.valorTotal.toFixed(2)}</p>
        <p><strong>Reserva mais barata:</strong> Código ${reservaMaisBarata.codigoReserva} | Tipo: ${reservaMaisBarata.tipoQuarto} | Temporada: ${reservaMaisBarata.temporada} | Hóspedes: ${reservaMaisBarata.numHospedes} | Valor: R$ ${reservaMaisBarata.valorTotal.toFixed(2)}</p>
        <p>Reservas com café incluso: ${reservasComCafe}</p>
        <p>Reservas sem café incluso: ${reservasSemCafe}</p>
        <p>Ocupação total (diárias × hóspedes): ${ocupacaoTotal} hóspede-diárias</p>
        <p>Valor médio por hóspede: R$ ${mediaPorHospede.toFixed(2)}</p>
    `;
    
}
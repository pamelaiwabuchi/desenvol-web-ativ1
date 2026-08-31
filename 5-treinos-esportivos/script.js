let treinos = []

function adicionarTreino() {
    let cargaRecomendada = document.getElementById('cargaRecomendada').value
    cargaRecomendada = Number(cargaRecomendada)
    let codigoTreino = document.getElementById('codigoTreino').value
    codigoTreino = Number(codigoTreino)
    let nome = document.getElementById('nome').value.trim().toLowerCase()
    let posicao = document.getElementById('posicao').value
    let tipoTreino = document.getElementById('tipoTreino').value
    let duracao = document.getElementById('duracao').value
    duracao = Number(duracao)
    let intensidade = document.getElementById('intensidade').value

    let multiplicador = 0
    switch (tipoTreino) {
        case 'fisico':
            multiplicador = 1.5
            break
        case 'tecnico':
            multiplicador = 1.2
            break
        case 'estrategico':
            multiplicador = 1.0
            break
    }
    let cargaIndividual = (duracao/10) * intensidade * multiplicador

    const novoTreino = {
        cargaRecomendada:cargaRecomendada,
        codigoTreino:codigoTreino,
        nome:nome,
        posicao:posicao,
        tipoTreino:tipoTreino,
        duracao:duracao,
        intensidade:intensidade,
        cargaIndividual:cargaIndividual
    }

    treinos.push(novoTreino)

    document.getElementById('codigoTreino').value = '';
    document.getElementById('nome').value = '';
    document.getElementById('posicao').value = '';
    document.getElementById('tipoTreino').value = '';
    document.getElementById('duracao').value = '';
    document.getElementById('intensidade').value = '';

    alert('Cadastrado com sucesso!');

}

function gerarRelatorio() {
    const codigoDigitado = document.getElementById('codigoTreino').value
    if (codigoDigitado !== '') {
        adicionarTreino()
    }

    if (treinos.length === 0){
        alert("Nenhum treino cadastrada ainda!");
        return;
    }

    let cargaRecomendada = Number(document.getElementById('cargaRecomendada').value);
    let jogadores = {};
    
    for (let i = 0; i < treinos.length; i++) {
        let nomeJogador = treinos[i].nome;

        if (!jogadores[nomeJogador]) {
            jogadores[nomeJogador] = {
                nome: nomeJogador,
                posicao: treinos[i].posicao,
                cargaTotal: 0,
                qtdTreinos: 0, 
                riscoLesao: false
            };
        }

        jogadores[nomeJogador].cargaTotal = jogadores[nomeJogador].cargaTotal + treinos[i].cargaIndividual;
        jogadores[nomeJogador].qtdTreinos = jogadores[nomeJogador].qtdTreinos + 1;
    }

    let qtdJogadoresComRisco = 0;
    for (let i in jogadores) {
        if (jogadores[i].cargaTotal > cargaRecomendada) {
            jogadores[i].riscoLesao = true;
            qtdJogadoresComRisco = qtdJogadoresComRisco + 1;
        } else {
            jogadores[i].riscoLesao = false;
        }
    }

    let listaValores = Object.values(jogadores);
    let jogadorMaiorCarga = listaValores[0];
    let jogadorMenorCarga = listaValores[0];

    for (let i in jogadores) {
        if (jogadores[i].cargaTotal > jogadorMaiorCarga.cargaTotal) {
            jogadorMaiorCarga = jogadores[i];
        }
        if (jogadores[i].cargaTotal < jogadorMenorCarga.cargaTotal) {
            jogadorMenorCarga = jogadores[i];
        }
    }

    let somaFisico = 0, qtdFisico = 0;
    let somaTecnico = 0, qtdTecnico = 0;
    let somaEstrategico = 0, qtdEstrategico = 0;
    for (let i = 0; i < treinos.length; i++) {
        if (treinos[i].tipoTreino === 'fisico') {
            somaFisico = somaFisico + treinos[i].cargaIndividual;
            qtdFisico = qtdFisico + 1;
        } else if (treinos[i].tipoTreino === 'tecnico') {
            somaTecnico = somaTecnico + treinos[i].cargaIndividual;
            qtdTecnico = qtdTecnico + 1;
        } else if (treinos[i].tipoTreino === 'estrategico') {
            somaEstrategico = somaEstrategico + treinos[i].cargaIndividual;
            qtdEstrategico = qtdEstrategico + 1;
        }
    }
    let mediaFisico = 0;
    if (qtdFisico > 0) {
        mediaFisico = somaFisico / qtdFisico;
    }
    let mediaTecnico = 0;
    if (qtdTecnico > 0) {
        mediaTecnico = somaTecnico / qtdTecnico;
    }
    let mediaEstrategico = 0;
    if (qtdEstrategico > 0) {
        mediaEstrategico = somaEstrategico / qtdEstrategico;
    }

    let somaGoleiro = 0, qtdGoleiro = 0;
    let somaZagueiro = 0, qtdZagueiro = 0;
    let somaMeioCampo = 0, qtdMeioCampo = 0;
    let somaAtacante = 0, qtdAtacante = 0;
    for (let i = 0; i < treinos.length; i++) {
        if (treinos[i].posicao === 'goleiro') {
            somaGoleiro = somaGoleiro + treinos[i].cargaIndividual;
            qtdGoleiro = qtdGoleiro + 1;
        } else if (treinos[i].posicao === 'zagueiro') {
            somaZagueiro = somaZagueiro + treinos[i].cargaIndividual;
            qtdZagueiro = qtdZagueiro + 1;
        } else if (treinos[i].posicao === 'meioCampo') {
            somaMeioCampo = somaMeioCampo + treinos[i].cargaIndividual;
            qtdMeioCampo = qtdMeioCampo + 1;
        } else if (treinos[i].posicao === 'atacante') {
            somaAtacante = somaAtacante + treinos[i].cargaIndividual;
            qtdAtacante = qtdAtacante + 1;
        }
    }
    let mediaGoleiro = 0;
    if (qtdGoleiro > 0) {
        mediaGoleiro = somaGoleiro / qtdGoleiro;
    }
    let mediaZagueiro = 0;
    if (qtdZagueiro > 0) {
        mediaZagueiro = somaZagueiro / qtdZagueiro;
    }
    let mediaMeioCampo = 0;
    if (qtdMeioCampo > 0) {
        mediaMeioCampo = somaMeioCampo / qtdMeioCampo;
    }
    let mediaAtacante = 0;
    if (qtdAtacante > 0) {
        mediaAtacante = somaAtacante / qtdAtacante;
    }
    
    let listaTreinosHTML = '';
    for (let i = 0; i < treinos.length; i++) {
        listaTreinosHTML += `<p>Cód: ${treinos[i].codigoTreino} | Jogador: ${treinos[i].nome} | Posição: ${treinos[i].posicao} | Tipo: ${treinos[i].tipoTreino} | Duração: ${treinos[i].duracao}min | Intensidade: ${treinos[i].intensidade} | Carga: ${treinos[i].cargaIndividual.toFixed(2)} pts</p>`;
    }

    let listaJogadoresHTML = '';
    for (let i in jogadores) {
        let risco = 'Não';
        if (jogadores[i].riscoLesao) {
            risco = 'Sim';
        }
        listaJogadoresHTML += `<p>${jogadores[i].nome} - Carga: ${jogadores[i].cargaTotal.toFixed(2)} - Treinos: ${jogadores[i].qtdTreinos} - Risco: ${risco}</p>`;
    }

    document.getElementById('relatorio').innerHTML = `
    <h2>Relatório Consolidado de Treinos Semanais</h2>
    <p>Total de treinos cadastrados: ${treinos.length}</p>
    <hr>
    <h3>Treinos Registrados:</h3>
    ${listaTreinosHTML}
    <hr>
    <h3>Lista de Jogadores:</h3>
    ${listaJogadoresHTML}
    <hr>
    <p><strong>Jogador com maior carga semanal:</strong> ${jogadorMaiorCarga.nome.toUpperCase()} (${jogadorMaiorCarga.posicao}) - ${jogadorMaiorCarga.cargaTotal.toFixed(2)} pts</p>
    <p><strong>Jogador com menor carga semanal:</strong> ${jogadorMenorCarga.nome.toUpperCase()} (${jogadorMenorCarga.posicao}) - ${jogadorMenorCarga.cargaTotal.toFixed(2)} pts</p>
    <p><strong>Quantidade de jogadores com risco de lesão:</strong> ${qtdJogadoresComRisco}</p>
    <hr>
    <h3>Carga Média por Tipo de Treino:</h3>
    <p>Físico: ${mediaFisico.toFixed(2)} pts (Total: ${qtdFisico})</p>
    <p>Técnico: ${mediaTecnico.toFixed(2)} pts (Total: ${qtdTecnico})</p>
    <p>Estratégico: ${mediaEstrategico.toFixed(2)} pts (Total: ${qtdEstrategico})</p>
    <hr>
    <h3>Estatísticas por Posição:</h3>
    <p>Goleiro: Total ${qtdGoleiro} treinos | Média: ${mediaGoleiro.toFixed(2)} pts</p>
    <p>Zagueiro: Total ${qtdZagueiro} treinos | Média: ${mediaZagueiro.toFixed(2)} pts</p>
    <p>Meio-campo: Total ${qtdMeioCampo} treinos | Média: ${mediaMeioCampo.toFixed(2)} pts</p>
    <p>Atacante: Total ${qtdAtacante} treinos | Média: ${mediaAtacante.toFixed(2)} pts</p>
`;
}
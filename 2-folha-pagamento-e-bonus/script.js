let funcionarios = []
let totalFunc = funcionarios.length
let salario_minimo = 0

function adicionarFuncionario() {

    let codigo = document.getElementById('codigo').value;
    codigo = Number(codigo)
    let codigoRepetido = false;
    for (let i=0; i<funcionarios.length;i++) {
        if (funcionarios[i].codigo === codigo) {
            codigoRepetido = true
        }
    }
    if (codigoRepetido) {
        alert('Esse código de pedido já existe. Insira outro valor para prosseguir.');
        return;
    }

    let salario_minimo = document.getElementById('salario_minimo').value;
    salario_minimo = salario_minimo.replace(',', '.');
    salario_minimo = Number(salario_minimo);

    let horas = document.getElementById('horas').value;
    horas = horas.replace(',', '.');
    horas = Number(horas);

    let turno = document.getElementById('turno').value
    let categoria = document.getElementById('categoria').value
    let percentual;
    
    // para o valor da hora trabalhada.. (em % do salario minimo)
    if (categoria === 'func_operacional') {
        switch (turno) {
            case 'matutino':
                percentual = 0.10;
                break;
            case 'vespertino':
                percentual = 0.15;
                break;
            case 'noturno':
                percentual = 0.20
                break;
        } 
    } else if (categoria === 'gerente') {
        switch (turno) {
            case 'matutino':
                percentual = 0.30;
                break
            case 'vespertino':
                percentual = 0.35;
                break;
            case 'noturno':
                percentual = 0.40;
                break;
        }                
    }
    let valorHoraTrabalhada = salario_minimo * percentual

    let valorSalario = valorHoraTrabalhada * horas

    let auxilio;
    if (valorSalario <= 800.00) {
        auxilio = 0.25 * valorSalario
    } else if (valorSalario > 800.00 && valorSalario <= 1200.00) {
        auxilio = 0.20 * valorSalario
    } else if (valorSalario > 1200) {
        auxilio = 0.15 * valorSalario
    }

    let desempenho = document.getElementById('desempenho').value
    desempenho = Number(desempenho)
    let bonusDesempenho;
    let porcentagemBonus = 0
    if (desempenho >= 9) {
        bonusDesempenho = 0.10 * valorSalario;
        porcentagemBonus = 10
    } else if (desempenho >= 7) {
        bonusDesempenho = 0.05 * valorSalario;
        porcentagemBonus = 5
    } else if (desempenho >= 5) {
        bonusDesempenho = 0.02 * valorSalario;
        porcentagemBonus = 2
    } else {
        bonusDesempenho = 0;
        porcentagemBonus = 0
    }

    let salarioFinal = valorSalario + auxilio + bonusDesempenho

    document.getElementById('codigo').value = '';
    document.getElementById('horas').value = '';
    document.getElementById('categoria').value = '';
    document.getElementById('turno').value = '';
    document.getElementById('desempenho').value = '';
   

    funcionarios.push({
        codigo: codigo,
        categoria: categoria,
        turno: turno,
        desempenho: desempenho,
        valorSalario: valorSalario,
        auxilio: auxilio,
        bonusDesempenho: bonusDesempenho,
        porcentagemBonus: porcentagemBonus,
        salarioFinal: salarioFinal
    })
 }

function gerarRelatorio() {
    let codigoAtual = document.getElementById('codigo').value;
    if (codigoAtual !== '') {
        adicionarFuncionario();
    }

    if (funcionarios.length === 0) {
        alert('Nenhum pedido foi adicionado ainda!');
        return;
    }

    let totalFunc = funcionarios.length 

    let somaSalarios=0;
    for (let i=0;i<totalFunc;i++) {
        somaSalarios = somaSalarios + funcionarios[i].salarioFinal
    }   
    let mediaSalarialGeral = somaSalarios / totalFunc;
    let qtdeFuncOperacional = 0
    let totalSalarialFunc = 0
    for (let i=0; i<totalFunc; i++) {
        if (funcionarios[i].categoria==='func_operacional') {
            totalSalarialFunc = totalSalarialFunc + funcionarios[i].salarioFinal
            qtdeFuncOperacional = qtdeFuncOperacional + 1
        }
    }
    let mediaSalarialFunc = 0;
    if (qtdeFuncOperacional > 0) {
        mediaSalarialFunc = totalSalarialFunc / qtdeFuncOperacional;
    }
    let qtdeFuncGerente = 0
    let totalSalarialGerente = 0
    for (let i=0; i<totalFunc; i++) {
        if (funcionarios[i].categoria==='gerente') {
            totalSalarialGerente = totalSalarialGerente + funcionarios[i].salarioFinal
            qtdeFuncGerente = qtdeFuncGerente + 1
        }
    }
    let mediaSalarialGerente = 0;
    if (qtdeFuncGerente > 0) {
        mediaSalarialGerente = totalSalarialGerente / qtdeFuncGerente;
    }

    let funcionarioMaiorSalarioFinal = funcionarios[0]
    for (let i=0; i<funcionarios.length; i++) {
        if (funcionarios[i].salarioFinal > funcionarioMaiorSalarioFinal.salarioFinal) {
            funcionarioMaiorSalarioFinal = funcionarios[i]
        }
    }

    let funcionarioMenorSalarioFinal = funcionarios[0]
    for (let i=0; i<funcionarios.length; i++) {
        if (funcionarios[i].salarioFinal < funcionarioMenorSalarioFinal.salarioFinal) {
            funcionarioMenorSalarioFinal = funcionarios[i]
        }
    }

    let qtdebonus10 = 0
    let qtdebonus5 = 0
    let qtdebonus2 = 0
    let qtdebonus0 = 0

    let QtdeFuncBonusDesempenho = 0
    for (let i = 0;i < funcionarios.length; i++) {
        if (funcionarios[i].porcentagemBonus === 10) {
            qtdebonus10 = qtdebonus10 + 1
        } else if (funcionarios[i].porcentagemBonus === 5) {
            qtdebonus5 = qtdebonus5 + 1
        } else if (funcionarios[i].porcentagemBonus === 2) {
            qtdebonus2 = qtdebonus2 + 1
        } else if (funcionarios[i].porcentagemBonus === 0) {
            qtdebonus0 = qtdebonus0 + 1
        }
    }

    document.getElementById('relatorio').innerHTML = `
        <p>Total de funcionários: ${totalFunc}</p>
        <p>Média Salarial Geral: ${mediaSalarialGeral} </p>
        <p>Média Salarial de Funcionários: ${mediaSalarialFunc} </p>
        <p>Média Salarial de Gerentes: ${mediaSalarialGerente} </p>
        <p>Maior Salário Final: R$ ${funcionarioMaiorSalarioFinal.salarioFinal}, Código: ${funcionarioMaiorSalarioFinal.codigo}, Categoria: ${funcionarioMaiorSalarioFinal.categoria}, Turno: ${funcionarioMaiorSalarioFinal.turno}, Valor Recebido: R$ ${funcionarioMaiorSalarioFinal.salarioFinal} </p>
        <p>Menor Salário Final: R$ ${funcionarioMenorSalarioFinal.salarioFinal}, Código: ${funcionarioMenorSalarioFinal.codigo}, Categoria: ${funcionarioMenorSalarioFinal.categoria}, Turno: ${funcionarioMenorSalarioFinal.turno}, Valor Recebido: R$ ${funcionarioMenorSalarioFinal.salarioFinal} </p>
        <p>Quantidade de Funcionários que receberam bônus de 10%: ${qtdebonus10}</p>
        <p>Quantidade de Funcionários que receberam bônus de 5%: ${qtdebonus5}</p>
        <p>Quantidade de Funcionários que receberam bônus de 2%: ${qtdebonus2}</p>
        <p>Quantidade de Funcionários que receberam bônus de 0%: ${qtdebonus0}</p>
        `
}

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
    let bonusDesempenho;
    if (desempenho >= 9) {
        bonusDesempenho = 0.10 * valorSalario;
    } else if (desempenho >= 7) {
        bonusDesempenho = 0.05 * valorSalario;
    } else if (desempenho >= 5) {
        bonusDesempenho = 0.02 * valorSalario;
    } else {
        bonusDesempenho = 0;
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
        salarioFinal: salarioFinal
    })
 }

function gerarRelatorio() {
    let codigoAtual = document.getElementById('codigo').value;
    if (codigoAtual !== '') {
        adicionarPedido();
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

    let totalSalarialFunc = 0
    for (let i=0; i<totalFunc.length; i++) {
        if (funcionarios[i].categoria==='func_operacional') {
            totalSalarialFunc = totalSalarialFunc + funcionarios[i].salarioFinal
        }
    }
    let mediaSalarialFunc = totalSalarialFunc / funcionarios.length;

    let totalSalarialGerente = 0
    for (let i=0; i<totalFunc.length; i++) {
        if (funcionarios[i].categoria==='gerente') {
            totalSalarialGerente = totalSalarialGerente + funcionarios[i].salarioFinal
        }
    }
    let mediaSalarialGerente = totalSalarialGerente / funcionarios.length;

    for (i=0;i<funcionarios.length;i++) {
        
    }

    let maiorSalarioFinal = 
    let menorSalarioFinal = 
    let qtdebonus10 = 
    let qtdebonus5 = 
    let qtdebonus2 =
    let qtdebonus0 =
    
    
 /* relatorio: Quantidade total de funcionários cadastrados.
Média salarial geral dos funcionários cadastrados (salário final).
Média salarial por categoria (Funcionários e Gerentes).
Maior e menor salário final, exibindo código, categoria, turno e valor recebido.
Quantidade de funcionários que receberam cada faixa de bônus (10%, 5%, 2% e nenhum bônus).
 */

    document.getElementById('relatorio').innerHTML = `
        <p>Total de funcionários: ${totalFunc}</p>
        <p>Média Salarial Geral: ${mediaSalarialGeral} </p>
        <p>Média Salarial de Funcionários: ${mediaSalarialFunc} </p>
        <p>Média Salarial de Gerentes: ${mediaSalarialGerente} </p>
        <p>Maior Salário Final: ${maiorSalarioFinal}, Código: ${} </p>
        <p>Menor Salário FInal: ${menorSalarioFinal} </p>
        <Quantidade de Funcionários que receberam bônus de 10%: ${qtdebonus10}</p>
        <Quantidade de Funcionários que receberam bônus de 5%: ${qtdebonus5}</p>
        <Quantidade de Funcionários que receberam bônus de 2%: ${qtdebonus2}</p>
        <Quantidade de Funcionários que receberam bônus de 0%: ${qtdebonus0}</p>
        `
}

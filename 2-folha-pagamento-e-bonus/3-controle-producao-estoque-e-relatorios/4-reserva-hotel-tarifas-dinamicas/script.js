// 1 cadaastrar multiplos func ate que o usuario decida parar

/* 5 Cálculo do Bônus por desempenho:
Nota 9 a 10 → bônus de 10% sobre o salário inicial
Nota 7 a 8,99 → bônus de 5% sobre o salário inicial
Nota 5 a 6,99 → bônus de 2% sobre o salário inicial
Nota abaixo de 5 → sem bônus
 */
// 6 Salário Final = Salário Inicial + Auxílio-Alimentação + Bônus de desempenho
 /* relatorio: Quantidade total de funcionários cadastrados.
Média salarial geral dos funcionários cadastrados (salário final).
Média salarial por categoria (Funcionários e Gerentes).
Maior e menor salário final, exibindo código, categoria, turno e valor recebido.
Quantidade de funcionários que receberam cada faixa de bônus (10%, 5%, 2% e nenhum bônus).
 */

let totalFunc = 0
let funcionarios = []
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
    }

    // falta adicionar o push

    funcionarios.push({
    codigo: codigo,
    categoria: categoria,
    turno: turno,
    desempenho: desempenho,
    valorSalario: valorSalario,
    auxilio: auxilio,
    bonusDesempenho: bonusDesempenho,
    salarioFinal: salarioFinal
});

totalFunc++;


function gerarRelatorio() {}
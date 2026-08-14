console.log(document.getElementById("combustivel").value);

console.log(document.getElementById("combustivel").value);

function adicionarPedido() {
    let combustivel = document.getElementById("combustivel").value;
    combustivel = combustivel.replace(",", ".");
    combustivel = Number(combustivel);

    let codigo = document.getElementById("codigo").value;
    let regiao = document.getElementById("regiao").value;

    let distancia = document.getElementById("distancia").value;
    distancia = distancia.replace(",",".")
    distancia = Number(distancia)

    let quantidade = document.getElementById("quantidade").value;
    quantidade = quantidade.replace(",",".")
    quantidade = Number(quantidade)

    let sim = document.getElementById("sim").checked;

}

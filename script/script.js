import selecionaCotacao from "./imprimeCotacao.js";

function geraHorario() {
    const data = new Date()
    let hora = data.getHours()
    let minuto = data.getMinutes()
    let segundo = data.getSeconds()
    hora = (hora < 10) ? '0' + hora : hora
    minuto = (minuto < 10) ? '0' + minuto : minuto
    segundo = (segundo < 10) ? '0' + segundo : segundo
    let horario = hora + ":" + minuto + ":" + segundo
    return horario
}
function adicionarDados(grafico, legenda, dados) {
    grafico.data.labels.push(legenda)
    grafico.data.datasets.forEach((dataset) => {
        dataset.data.push(dados)
    })
    grafico.update()
}

const graficoDolar = document.getElementById('graficoDolar')

const graficoParaDolar = new Chart(graficoDolar, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Dolar',
            data: [],
            borderWidth: 1
        }]
    }
});

let workerDolar = new Worker('./script/workers/workerDolar.js')
workerDolar.postMessage('USD-BRL')

workerDolar.addEventListener("message", event => {
    let tempo = geraHorario()
    let valor = event.data.ask
    selecionaCotacao("dolar", valor)
    adicionarDados(graficoParaDolar, tempo, valor)
})

const graficoIene = document.getElementById('graficoIene')

const graficoParaIene = new Chart(graficoIene, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Iene',
            data: [],
            borderWidth: 1
        }]
    }
});

let workerIene = new Worker('./script/workers/workerIene.js')
workerIene.postMessage('JPY-BRL')

workerIene.addEventListener("message", event => {
    let tempo = geraHorario()
    let valor = event.data.ask
    selecionaCotacao("iene", valor)
    adicionarDados(graficoParaIene, tempo, valor)
})

const graficoEuro = document.getElementById('graficoEuro')

const graficoParaEuro = new Chart(graficoEuro, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Euro',
            data: [],
            borderWidth: 1
        }]
    }
});

let workerEuro = new Worker('./script/workers/workerEuro.js')
workerEuro.postMessage('EUR-BRL')

workerEuro.addEventListener("message", event => {
    let tempo = geraHorario()
    let valor = event.data.ask
    selecionaCotacao("euro", valor)
    adicionarDados(graficoParaEuro, tempo, valor)
})
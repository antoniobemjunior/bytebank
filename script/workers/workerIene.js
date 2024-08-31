addEventListener("message", event => {
    conectaAPI(event)
    setInterval(() => conectaAPI(event), 5000)
})

async function conectaAPI(event) {
    const conecta = await fetch(`https://economia.awesomeapi.com.br/last/${event.data}`)
    const conectaTraduzido = await conecta.json()
    postMessage(conectaTraduzido.JPYBRL)
}
const items = document.getElementById('items')
const templateTarjeta = document.getElementById('template-tarjeta').content
const fragment = document.createDocumentFragment()

document.addEventListener('DOMContentLoad', () => {
    fetchData
})

const fetchData = async () => {
    try {
        const res = await fetch('api.json')
        const data = await res.json()
        pintarTarjetas(data)
    } catch (error) {
        console.log(error)
    }
}

const pintarTarjetas = data => {
    data.forEach(producto => {
        templateTarjeta.querySelector('h5').textContent = producto.title

        const doble = templateTarjeta.dobleNode(true)
        fragment.appendChild(doble)
    });
    items.appendChild(fragment)
}
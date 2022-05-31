const items = document.getElementById('items')
const templateTarjeta = document.getElementById('template-tarjeta').content
const fragment = document.createDocumentFragment()

document.addEventListener('DOMContentLoad', () => {
    fetchData
})
items.addEventListener('click', e => {
    agregarAlCarrito(e)
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
    console.log(data)
    data.forEach(producto => {
        templateTarjeta.querySelector('h5').textContent = producto.title
        templateTarjeta.querySelector('p').textContent = producto.precio
        templateTarjeta.querySelector('img').setAttribute("src", producto.url)
        templateTarjeta.querySelector('.btn-dark').dataset.id = producto.id
        const doble = templateTarjeta.dobleNode(true)
        fragment.appendChild(doble)
    });
    items.appendChild(fragment)
}

const agregarAlCarrito = e => {
    console.log(e.target)
}
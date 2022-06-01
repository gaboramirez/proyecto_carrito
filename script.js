const cards = document.getElementById('cards')
const templateTarjeta = document.getElementById('template-tarjeta').content
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const items = document.getElementById('items')
const footer = document.getElementById('footer')
const fragment = document.createDocumentFragment()

let carrito = {}

document.addEventListener('DOMContentLoad', () => {
    fetchData
})
cards.addEventListener('click', e => {
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
    cards.appendChild(fragment)
}

const agregarAlCarrito = e => {
    if (e.target.classList.contains('btn-dark')){
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
}

const setCarrito = objeto => {
    const producto = {
        id: objeto.querySelector('.dark').dataset.id,
        title: objeto.querySelector('h5').textContent,
        precio: objeto.querySelector('p').textContent,
        cantidad: 1
    }

    if(carrito.hasOwnProperty(producto.id)){
        producto.cantidad = carrito[producto.id].cantidad + 1
    }

    carrito[producto.id] = {...producto}
    pintarCarrito()
}

const pintarCarrito = () => {
    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.id
        templateCarrito.querySelectorAll('td')[0].textContent = producto.title
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
        templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio

        const doble = templateCarrito.dobleNode(true)
        fragment.appendChild(doble)
    })
    items.appendChild(fragment)
}
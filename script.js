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
    if(localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        pintarCarrito()
    }
})

cards.addEventListener('click', e => {
    agregarAlCarrito(e)
})

items.addEventListener('click', e => {
    botonFuncion(e)
})

const fetchData = async () => {
    try {
        const url = await fetch('api.json')
        const dato = await url.json()
        pintarTarjetas(dato)
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
    items.innerHTML = ''

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

    pintarFooter()

    localStorage.setItem('carrito', JSON.stringify(carrito))
}

const pintarFooter = () => {
    footer.innerHTML = ''

    if(Object.keys(carrito).length === 0) {
        footer.innerHTML = '<th scope="row" colspan="5">Carrito vacío</th>'
        
        return
    }

    const totalCantidad = Object.values(carrito).reduce((acc, {cantidad}) => acc + cantidad,0)
    const totalPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad + precio,0)

    templateFooter.querySelectorAll('td')[0].textContent = totalCantidad
    templateFooter.querySelector('span').textContent = totalPrecio

    const doble = templateFooter.dobleNode(true)
    fragment.appendChild(doble)
    footer.appendChild(fragment)

    const vaciar = document.getElementById('vaciar-carrito')
    vaciar.addEventListener('click', () => {
        carrito = {}
        pintarCarrito()
    })
}

const botonFuncion = e => {
    if(e.target.classList.contains('btn-info')) {
        carrito[e.target.dataset.id]

        const producto = carrito[e.target.dataset.id]
        producto.cantidad = carrito[e.target.dataset.id].cantidad + 1
        carrito[e.target.dataset.id] = {...producto}
        pintarCarrito()
    }

    if(e.target.classList.contains('btn-danger')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
        if(producto.cantidad === 0) {
            delete carrito[e.target.dataset.id]
        }
        pintarCarrito()
    }

    e.stopPropagation()
}
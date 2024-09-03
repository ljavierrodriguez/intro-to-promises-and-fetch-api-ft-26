function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function countdown(segundos) {
    return new Promise((resolve, reject) => {
        const spanTime = document.querySelector('#time')
        spanTime.innerHTML = segundos
        const interval = setInterval(() => {
            spanTime.innerHTML = segundos
            //console.log(segundos)
            segundos--
            if (segundos < 0) {
                clearInterval(interval)
                resolve('Se ha acabado el tiempo')
            }
        }, 1000)
    })
}

function buscarUsuarios() {
    /*  
    GET
    POST
    PUT
    DELETE

    MIME = Multipurpose Internet Mail Extensions

    HTTP Status
    1xx
    2xx
    3xx
    4xx
    5xx

    fetch(uri, options)
        .then(() => {})
        .then(() => {})
        .catch(() => {})

    */
    return fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'GET', /* GET, POST, PUT, DELETE => CRUD */
        //body: info, /* POST, PUT */
        headers: {
            'Content-Type': 'application/json'
        }
    })
}


delay(3000)
    .then(() => console.log("Parason 3 segundos! La tarea ha sido resuelta!"))
    .catch((error) => console.log("La tarea ha fallado"))
    .finally(() => console.log("Finalizando tarea"))


getCurrentPosition()
    .then((position) => {
        const latitud = document.querySelector('#latitud')
        const longitud = document.querySelector('#longitud')

        latitud.innerHTML = position.coords.latitude
        longitud.innerHTML = position.coords.longitude
    })
    .catch((error) => {
        console.log("Error al obtener la posicion: " + error.message)
    })

countdown(10).then((message) => {
    const h3Message = document.querySelector('#message')
    h3Message.innerHTML = message
})


buscarUsuarios()
    .then((response) => {
        console.log(response)
        console.log(response.ok)
        console.log(response.status)

        return response.json()
    })
    .then((responseJson) => {
        //console.log(responseJson)
        responseJson.map((user) => console.log(user.name))
    })
    .catch(() => { })
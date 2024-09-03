import React, { useEffect, useState } from 'react'

const App = () => {

    const [users, setUsers] = useState(null)
    const [posts, setPosts] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        obtenerUsuarios()
        obtenerPublicaciones()
    }, [])

    const obtenerUsuarios = () => {
        fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'GET', /* GET, POST, PUT, DELETE => CRUD */
            //body: info, /* POST, PUT */
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                console.log(response)
                console.log(response.ok)
                console.log(response.status)

                //if(!response.ok) throw new Error('Ha ocurrido un error')
                if (!response.ok && response.status === 404) throw new Error('El recurso que esta buscando no existe!')
                return response.json()
            })
            .then((responseJson) => {
                console.log(responseJson)
                setError(null)
                setUsers(responseJson)
                //responseJson.map((user) => console.log(user.name))
            })
            .catch((error) => {
                console.log(error.message)
                setError(error.message)
            })
    }

    const obtenerPublicaciones = () => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(datosJson => setPosts(datosJson))
            .catch(error => console.log(error))
    }


    return (
        <div>
            <button onClick={obtenerUsuarios}>
                Buscar Usuarios
            </button>
            {
                !!error && (
                    <h3 style={{ color: 'red' }}>{error}</h3>
                )
            }
            <ul>
                {
                    Array.isArray(users) &&
                    users.map((user) => <li>{user.name}</li>)
                }
            </ul>
        </div>
    )
}

export default App
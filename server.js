const cors = require("cors")
const db = "teste" 
const express = require('express')
const res = require("express/lib/response")
const app = express()
app.use(express.json())
app.use(cors())
// app.use('/api', (request, response) => {
//     response.send('~Welcome to our API')
// })
let users = [
    {
        id : 1,
        nome: 'Joao',
        email: 'joao@email.com'
    },
    {
        id : 2,
        nome: 'Paulo', 
        email: 'paulo@email.com'
    },
    {   
        id : 3, 
        nome: 'Paulo',
        email: 'martins@email.com'
    }
]

//usar filter
// app.get( '/api/users', (request, response) => {
//     const filters = request.query
//     const novoArray = []
//     for( let i = 0; i < users.length; i++){
//         if(filters.nome == users[i].nome ){
//             novoArray.push(users[i])
//         }
//         console.log(novoArray)
//     }
    
//     response.send(novoArray)
// })
app.get( '/api/users', (request, response) => {
    const filters = request.query
    function buscarNome(item){
        if(filters.nome == item.nome) 
        {
            return true
        }
    }
    const buscarNomes = users.filter(buscarNome)
    response.send(buscarNomes)
})

app.post( '/api/users' , (request, response) => {
    const newUser = request.body 
    users.push(newUser)
    response.send('usuario criado com sucesso')
})

//map
app.put('/api/users/:id', (request, response) => {
    const userId = request.params.id;
    const data = request.body;
    for ( let i = 0; i < users.length ; i++ ){
        if(userId == users[i].id ){
            users[i] = data
        }
    }
    response.send('usuario atualizado')
})

//filter
app.delete('/api/users/:id', (request, response) => {
    const userID = request.params.id
    
    for ( let i = 0; i < users.length; i++ ) {
        if(userID == users[i].id) {
            users.splice(i, 1)
        }
    }   
    response.send('usuario excluido com sucesso')
})


app.listen(3000, () => {
    console.log(`App rodando na porta 3000`)
} )
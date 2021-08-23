const { request, response } = require('express')
const express = require('express')
const app = express()

app.use(express.json())

let phonebooks = 
[
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
  response.send("<h1>Hello</h1>")
})

app.get('/api/persons', (request, response) => {
  response.json(phonebooks)
})

// app.get('/api/persons/:id', (request, response) => {
//   const id = Number(request.params.id)
//   const phone = phonebooks.find(phone => phone.id === id)
//   if(phone) {
//     response.json(phone)
//   } else {
//     response.status(404).end()
//   }
// })

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  phonebooks = phonebooks.filter(phone => phone.id !== id)

  response.status(204).end()
})

app.get('/info', (request, response) => {
  const time = new Date().toUTCString()
  const length = phonebooks.length;
  response.send(`<div>
    <p>Phonebook has been send info for ${length} people</p>
    <p>${time}</p>
  </div>`)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
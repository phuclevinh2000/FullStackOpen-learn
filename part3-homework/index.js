const { request, response } = require('express')
const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(express.json())

morgan.token('data', (request, response) => {
  if(request.method=='POST') 
    return " " + JSON.stringify(request.body)
  else return " "
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

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

//Function
const generateId = () => {    //generate new ID base on max ID +1 
  const maxId = phonebooks.length > 0
  ? Math.max(...phonebooks.map(n => n.id))
  : 0

  return maxId + 1 
}

// GET method
app.get('/', (request, response) => {
  response.send('<h1>Part 3</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(phonebooks)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const phone = phonebooks.find(phone => phone.id === id)
  if(phone) {
    response.json(phone)
  } else {
    response.status(404).end()
  }
})

app.get('/info', (request, response) => {
  const time = new Date().toUTCString()
  const length = phonebooks.length;
  response.send(`<div>
    <p>Phonebook has been send info for ${length} people</p>
    <p>${time}</p>
  </div>`)
})


// Delete method
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  phonebooks = phonebooks.filter(phone => phone.id !== id)

  response.status(204).end()
})


// POST method
app.post('/api/persons', (request, response) => {
  const body = request.body

  //check error input
  if(!body.number && body.name) {
    return response.status(400).json({
      error: 'number missing'
    })
  } else if (!body.name && body.number) {
    return response.status(400).json({
      error: 'name missing'
    })
  } else if (!body.name && !body.number) {
    return response.status(400).json({
      error: 'name and number missing'
    })
  } 

  const findName = phonebooks.find(phone => phone.name === body.name)
  if(findName) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  //make new id and customer
  const phone = {
    "id": generateId(),
    "name": body.name,
    "number": body.number
  }

  //add the new contact to the end of the current phonebooks
  phonebooks = phonebooks.concat(phone)

  response.json(phone)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
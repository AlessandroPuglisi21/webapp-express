const express = require ('express')
const app = express()
const port = 3000
const notFound = require('./middlewares/notFound')
const errorsHandler = require ('./middlewares/errorsHandler')

app.use(express.static('public'))

app.get('/',(req,res) => {
    res.send('Server Attivo')
})

app.use(errorsHandler)

app.use(notFound)

app.listen(port,() => {
    console.log(`Server attivo sulla porta ${port}`)
}) 
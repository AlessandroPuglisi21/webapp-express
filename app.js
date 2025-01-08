const express = require ('express')
const app = express()
const port = 3000

app.use(express.static('public'))

app.get('/',(req,res) => {
    res.send('Server Attivo')
})

app.listen(port,() => {
    console.log(`Server attivo sulla porta ${port}`)
})
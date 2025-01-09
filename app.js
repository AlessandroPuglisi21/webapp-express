const express = require ('express')
const cors = require ('cors')
const app = express()
const port = 3000
const notFound = require('./middlewares/notFound')
const errorsHandler = require ('./middlewares/errorsHandler')
const moviesRouter = require ('./routers/moviesRouters')

app.use(
    cors({
        origin: 'http://localhost:5173',
    })
);


app.use(express.static('public'))

app.get('/',(req,res) => {
    res.send('Server Attivo')
})

app.use('/api/movies',moviesRouter)

app.use(errorsHandler)

app.use(notFound)

app.listen(port,() => {
    console.log(`Server attivo sulla porta ${port}`)
}) 
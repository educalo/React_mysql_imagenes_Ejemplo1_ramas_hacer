const express = require('express')
const mysql = require('mysql')
const myconn = require('express-myconnection')
const path = require('path')

const cors = require('cors')

const app = express()

app.use(myconn(mysql, {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'images'
}))
app.use(cors())
//ruta estatica a mi carpeta dbimagenes para que pueda ser accedido desde mi navegador
app.use(express.static(path.join(__dirname, 'dbimages')))

app.use(require('./routes/routes'))

app.listen(3000, () => {
    console.log('server running on', 'http://localhost:' + 3000)
})
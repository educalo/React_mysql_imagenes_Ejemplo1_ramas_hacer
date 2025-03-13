const express = require('express')
const mysql = require('mysql')
//para establecer una conexion a mysql utilizo este modulo
const myconn = require('express-myconnection')

const cors = require('cors')

const app = express()

//le paso un objeto con las propiedades de la conexion
app.use(myconn(mysql, {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'images'
}))
app.use(cors())

//enlazo la carpeta routes y fichero routes.js
app.use(require('./routes/routes'))

app.listen(9000, () => {
    console.log('server running on', 'http://localhost:' + 9000)
})
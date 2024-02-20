const express = require('express')
//me permite gestionar imagenes para subirlas a un servidor
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const router = express.Router()

//para almacenar la imagen temporalmente en una carpeta de mi servidor
const diskstorage = multer.diskStorage({
    //se crea esta carpeta
    //ruta principal de proyecto esta en __dirname
    //destination es donde se va a dejar la imagen de forma temporal
    destination: path.join(__dirname, '../images'),
    //arrow function que recibe requerimiento, fichero y callback
    filename: (req, file, cb) => {
        //nombre que le queremos pasar al archivo
        cb(null, Date.now() + '-monkeywit-' + file.originalname)
    }
})
//storage seria lo mismo que he hecho anteriormente 
//se va a recibiir solo una imagen con single y image es el nombre que le di en el app.jsx de formdata
const fileUpload = multer({
    storage: diskstorage
}).single('image')

router.get('/', (req, res) => {
    res.send('Welcome to my image app')
})

router.post('/images/post', fileUpload,(req, res) => {
    //console.log(req.file)
    //para recibir una conexion
    req.getConnection((err, conn) => {
        if(err) return res.status(500).send('server error')

        const type = req.file.mimetype
        const name = req.file.originalname
        //fs me permite leer un archivo
        const data = fs.readFileSync(path.join(__dirname, '../images/' + req.file.filename))

        //si pasar los nombres diferentes a los de la tabla tendria que pasarlos como type:nombre, donde type es el nombre de la tabla y nombre el nombre de la variable req.file...
        conn.query('INSERT INTO image set ?', [{type, name, data}], (err, rows) => {
            if(err) return res.status(500).send('server error')

            res.send('image saved!')
        })
    })
    
})

module.exports = router
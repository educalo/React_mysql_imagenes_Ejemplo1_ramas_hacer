const express = require('express')
//me permite gestionar imagenes para subirlas a un servidor
const multer = require('multer')
const path = require('path')
//para leer un fichero
const fs = require('fs')

const router = express.Router()

//para almacenar la imagen temporalmente en una carpeta de mi servidor
//se le pasa un objeto
const diskstorage = multer.diskStorage({
    //se crea esta carpeta
    //ruta principal de proyecto esta en __dirname
    //destination es donde se va a dejar la imagen de forma temporal
    destination: path.join(__dirname, '../images'),
    //filename que se le asigna arrow function que recibe requerimiento, fichero y callback
    //esto se puede ver en la documentación de Multer
    //callback: función que se pasa a otra función como argumento, que luego se invoca dentro de la función externa para completar algún tipo de rutina
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

//req: requerimiento o lo que le llega y res: respuesta
router.post('/images/post', fileUpload,(req, res) => {
    //para obtener informacion de la imagen subida puedo utilizar el siguiente comando
    //console.log(req.file)
    //para crear una conexion
    req.getConnection((err, conn) => {
        if(err) return res.status(500).send('server error')
        
        //voy a enviar la imagen guardaa en la carpeta images
        //obtengo propiedad de la imagen
        const type = req.file.mimetype
        const name = req.file.originalname
        //fs me permite leer un archivo
        const data = fs.readFileSync(path.join(__dirname, '../images/' + req.file.filename))

        //si pasar los nombres diferentes a los de la tabla tendria que pasarlos como type:nombre, donde type es el nombre de la tabla y nombre el nombre de la variable req.file...
        //estoy añadiendo 3 campos a la tabla imagen, tipo, nombre y la imagen en si
        conn.query('INSERT INTO image set ?', [{type, name, data}], (err, rows) => {
            if(err) return res.status(500).send('server error')

            res.send('image saved!')
        })
    })
    
})

module.exports = router
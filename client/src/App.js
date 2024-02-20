//voy a utilizar un fragment para añadir varios etiquetas en mi return del componente App
import React, {Fragment, useState, useEffect} from 'react';
//para manejar formularios modales
import Modal from 'react-modal'

function App() {

  const [file, setFile] = useState(null)
  //lista del nombre de las imagenes que estan en el banco de imagenes y estan siendo servidas por el servidor
  const [imageList, setImageList] = useState([])

  //estado para conseguir que una imagen cargada se muestre directamente en la parte cliente
  const [listUpodated, setListUpdate] = useState(false)

  //estado para manejar el formulario modal
  const [modalIsOpen, setModalIsOpen] = useState(false)

  //estado de la imagen para abrir en el modal
  const [currentImage, setCurrentImage] = useState(null)

  //para mostar las imagenes del estado imageList
  useEffect (()=>{

    //lo voy asociar al body del documento html
    Modal.setAppElement('body')

    fetch('http://localhost:3000/images/get')
    .then(res => res.json())
    .then(res => setImageList(res))
    .catch(err => {
      console.error(err)
    })  
    setListUpdate(false)
  },[listUpodated])


  //array con todos los archivos seleccionados, en nuestro caso solo uno, el primero
  const selectedHandler = e => {
    //console.log(e.target.file[0])
    //para colocarlo en el estado de mi componente
    setFile(e.target.files[0])
  }

  //funcion para el envio del fichero seleccionado
  const sendHandler = () => {
    if(!file){
      alert('you must upload file')
      return
    }

    //clase de js para formatear un archivo (estado del componente) en nuestro caso de imagen
    const formdata = new FormData()
    formdata.append('image', file)

    fetch('http://localhost:3000/images/post', {
      method: 'POST',
      body: formdata
    })
    .then(res => res.text())
    .then(res => {
        console.log(res)
        //como el estado esta cambiado realiza de nuevo el useffect
        setListUpdate(true)
    })
    .catch(err => {
      console.error(err)
    })

    document.getElementById('fileinput').value = null

    setFile(null)
  }

  const modalHandler = (isOpen, image) => {
    setModalIsOpen(isOpen)
    setCurrentImage(image)
  }

  const deleteHandler = () =>{
    
    let imageID = currentImage.split('-')
    //para comprobar si tengo el numero del id en la descripcion de la imagen
    console.log(imageID[0])
    
    //fetch('http://localhost:3000/images/delete')
  }

  //nav es un navegador
  //href="#!" no apunta a ningun lado
  //input de tipo file para cargar un archivo
  //haga una rejilla de datos y no lo amontone en una misma fila, sino utilice mas de una
  //onRequestClose se va a activar cuando hagamos click fuera del modal
  return (
    <Fragment>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <a href="#!" className="navbar-brand">Image App</a>
        </div>
      </nav>

      <div className="container mt-5">
        <div className="card p-3">
          <div className="row">
            <div className="col-10">
              <input id="fileinput" onChange={selectedHandler} className="form-control" type="file"/>
            </div>
            <div className="col-2">
              <button onClick={sendHandler} type="button" className="btn btn-primary col-12">Upload</button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-3" style={{display:"flex", flexWrap: "wrap"}}>

        {imageList.map(image => (
          <div key={image} className="card m-2">
          <img src={'http://localhost:3000/'+ image} alt="..." className="card-img-top" styte={{height: "200px", with: "300px"}}/>
          <div classNmae="card-body">
            <button onClick={()=> modalHandler(true, image)} className='btn btn-dark'>Click para ver</button>
          </div>
        </div>

        ))}
      </div>

          <Modal style={{content:{right: "20%", left: "20%"}}} isOpen={modalIsOpen} onRequestClose={()=>modalHandler(false, null)}>
              <div className="card"></div>
              <img src={'http://localhost:3000/'+ currentImage}  alt="..."/>
                <div className='card-body'>
                  <button onClick={() => deleteHandler()}       className='btn btn-danger'>Delete</button>
                </div>
          </Modal>

    </Fragment>
  );
}

export default App;

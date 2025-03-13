//voy a utilizar un fragment para añadir varios etiquetas en mi return del componente App
//fragment nos permite exportar varios elementos de HTML
import React, {Fragment, useState} from 'react';

function App() {

  const [file, setFile] = useState(null)

  //array con todos los archivos seleccionados, en nuestro caso solo uno, el primero
  const selectedHandler = e => {
    //para mostrar las propiedades de la imagen seleccionada
    //console.log(e.target.file[0])
    //para colocarlo en el estado de mi componente
    setFile(e.target.files[0])
  }

  //funcion para el envio del fichero seleccionado al servidor en la carpeta imagenes
  const sendHandler = () => {
    if(!file){
      alert('you must upload file')
      return
    }

    //clase de js para formatear un archivo (estado del componente) en nuestro caso de imagen
    const formdata = new FormData()
    //agrego un elemento que lo voy a llamar image y el archivo a enviar file
    formdata.append('image', file)

    //se podria hacer con axios tambien
    //paso la direccion y luego un objeto
    fetch('http://localhost:9000/images/post', {
      method: 'POST',
      body: formdata
    })
    .then(res => res.text())
    .then(res => console.log(res))
    .catch(err => {
      console.error(err)
    })

    document.getElementById('fileinput').value = null

    setFile(null)
  }

  //nav es un navegador
  //href="#!" no apunta a ningun lado
  //input de tipo file para cargar un archivo
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
    </Fragment>
  );
}

export default App;

//voy a utilizar un fragment para añadir varios etiquetas en mi return del componente App
import React, {Fragment, useState} from 'react';

function App() {

  const [file, setFile] = useState(null)

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

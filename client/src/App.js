//voy a utilizar un fragment para añadir varios etiquetas en mi return del componente App
import React, {Fragment, useState, useEffect} from 'react';

function App() {

  const [file, setFile] = useState(null)
  //lista del nombre de las imagenes que estan en el banco de imagenes y estan siendo servidas por el servidor
  const [imageList, setImageList] = useState([])

  //estado para conseguir que una imagen cargada se muestre directamente en la parte cliente
  const [listUpodated, setListUpdate] = useState(false)

  //para mostar las imagenes del estado imageList
  useEffect (()=>{
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

  //nav es un navegador
  //href="#!" no apunta a ningun lado
  //input de tipo file para cargar un archivo
  //haga una rejilla de datos y no lo amontone en una misma fila, sino utilice mas de una
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
        </div>

        ))}

      </div>
    </Fragment>
  );
}

export default App;

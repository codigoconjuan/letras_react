import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Cancion from './components/Cancion';
import Info from './components/Info';
import axios from 'axios';

function App() {

  // definir el state
  const [ busquedaletra, guardarBusquedaLetra ] = useState({});
  const [ letra, guardarLetra] = useState('');
  const [info, guardarInfo] = useState({});

  useEffect(() => {
    if(Object.keys(busquedaletra).length === 0 ) return;

    const consultarApiLetra = async () => {
      const { artista, cancion } = busquedaletra;
      const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
      const url2 = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;
      //permite realizar ambos request al tiempo
      axios.all([
        axios.get(url),
        axios.get(url2)
      ])
      //Actualizamos los states
        .then(response => {
          guardarLetra(response[0].data.lyrics);
          guardarInfo(response[1].data.artists[0]);
        })
      //
        .catch(err => {
          /*Este lo use moviendo el estado del error al app.js en lugar de tenerlo en el formulario
          setError(true);
          setErrorText("No se encontro información");
          */
          setLetra("");
          setInfo([]);
        })
    }
    consultarApiLetra();
  }, [busquedaletra]);

  return (
      <Fragment>
          <Formulario 
            guardarBusquedaLetra={guardarBusquedaLetra}
          />

          <div className="container mt-5">
            <div className="row">
              <div className="col-md-6">
                <Info 
                  info={info}
                />
              </div>
              <div className="col-md-6">
                  <Cancion 
                    letra={letra}
                  />
              </div>
            </div>
          </div>
      </Fragment>
  );
}

export default App;

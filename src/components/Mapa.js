import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import { flushSync } from 'react-dom';
import { Map, TileLayer, ZoomControl } from "react-leaflet";

import Table from '../components/Table/table';
import '../css/Mapa.css';
import HeatmapLayer from './HeatmapLayer';
import ModalNuevaDenuncia from './ModalNuevaDenuncia';
import VenueMarkers from './VenueMarkers';
import Control from 'react-leaflet-control';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLayerGroup, faMapMarker, faSync, faPlus } from '@fortawesome/free-solid-svg-icons'
import { Button, Modal, ModalFooter, ModalHeader, ModalBody, FormGroup, Input, Label } from 'reactstrap';

const baseUrl = "https://denuncias-api-posadas.herokuapp.com/denuncias?size=5000";


var idPersonas = [];
var marcas = []
var marcasHeat = []




const Mapa = (props) => {

  const [show, setShow] = useState(false);
  const handleShow = () => { setShow(true); }
  const [visible, setVisible] = useState(true);
  const [heat, setHeat] = useState(false);
  const posicion2 = [-27.4038, -55.8830]

  const [state, setState] = useState({
    longitude: 0,
    latitude: 0,
    posiciones: [],
    
  });

  const [busquedaMotivo,setBusquedaMotivo]=useState('')

  const[busqueda,setBusqueda]=useState({
    motivo:'',
    tipoDenuncia:' '
  })
    

  function cargar(lat, lon, descripcion) {
    var marca = {
      venue: '',
      description: '',
      name: descripcion,
      geometry: [lat, lon]
    }
    marcas.push(marca)
  }

  function cargarHeat(lat, lon, descripcion) {
    var marcaHeat = [lat, lon, 500]
    marcasHeat.push(marcaHeat)
  }


  async function cargarUbicaciones() {
    await axios.get(baseUrl)
      .then(response => {
        return response.data._embedded.denuncias;
      })
      .then(response => {

        if (response.length > 0) {
          idPersonas = response;
          idPersonas.map((id) => (

            cargar(id.lat, id.lon, id.motivo),
            cargarHeat(id.lat, id.lon, id.motivo)

          ));
        } else {
          alert('Error');
        }
      })
      .catch(error => {
        console.log(error);
      })

  }





  useEffect(() => {
    ver()
    cargarUbicaciones();
    setState({
      longitude: 27.3769,
      latitude: -55.9213,
      posiciones: marcas
    });


  }, []);

  async function ver() {
    setHeat(false)
    await setVisible(false);
    await setVisible(true);
    cargarUbicaciones();
    setState({
      longitude: 27.3769,
      latitude: -55.9213,
      posiciones: marcas
    });

  }

  async function verHeat() {
    setHeat(true);
  }

  

const changeHandler = e => {
  setBusqueda({ [e.target.name]: e.target.value })
  ver()
    
}


  return (

    <div className='pagina'>
      <div>
          <Button color="info" onClick={ver} ><FontAwesomeIcon icon={faSync} size="1x" /></Button>
      </div>
      <div className='tabla'>

       
        <div> <ModalNuevaDenuncia initialModalState={show} lat={-27.3769} lon={-55.9213} /></div>

        <div className="panelBusqueda">
          
          <Label for="tipoDenuncia">Tipo Denuncia</Label>
          <div>
            <select id="selectlang" className="select" name="tipoDenuncia" onChange={changeHandler} value={busqueda.tipoDenuncia}  >
              <option value="ELEGIR">ELEGIR</option>
              <option value="VIOLENCIA_DE_GENERO">VIOLENCIA_DE_GENERO</option>
              <option value="ROBO">ROBO</option>
              <option value="NARCOTRAFICO">NARCOTRAFICO</option>
              <option value="HOMICIDIO">HOMICIDIO</option>
              <option value="FEMICIDIO">FEMICIDIO</option>
              <option value="PARRICIDIO">PARRICIDIO</option>
            </select>
          </div>
        </div>
        {visible ? <Table tipoDenuncia={busqueda.tipoDenuncia} /> : <div></div>}
        
      </div>
      
      <div className='mapa'>

        <Map center={posicion2} zoom={13} scrollWheelZoom={true}>

          {heat ? <HeatmapLayer
            fitBoundsOnLoad
            fitBoundsOnUpdate
            points={marcasHeat}
            longitudeExtractor={m => m[1]}
            latitudeExtractor={m => m[0]}
            intensityExtractor={m => parseFloat(m[2])} /> : <div></div>}
          <ZoomControl position="topright" />
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {visible && !heat ? <VenueMarkers venues={state.posiciones} /> : <div></div>}
          <Control position="topleft" >
            <button
              onClick={() => verHeat()}
            >
              <FontAwesomeIcon icon={faLayerGroup} size="3x" />
            </button>
            <div>
              <button
                onClick={() => ver()}
              >
                <FontAwesomeIcon icon={faMapMarker} size="3x" />

              </button>
            </div>
          </Control>

        </Map>


      </div>

    </div>

  );
};

export default Mapa;




import React, { useState, useEffect,Button } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import '../css/Mapa.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from '../components/Table/table';
import ModalNuevaDenuncia from './ModalNuevaDenuncia';
import MarkersMapa from './MarkersMapa';
import { VenueLocationIcon } from "./VenueLocationIcon";




import "leaflet/dist/leaflet.css";






const Mapa = (props) => {

  const [show, setShow] = useState(false);

  
  const handleShow = () => {setShow(true);console.log(show)}

  const [state, setState] = useState({
    longitude: 0,
    latitude: 0,
  });


  const posicion = [state.latitude, state.longitude]
  
  const posicion2 = [-27.9143, -55.7547]
  const posicion3 = [-27.9143, -55.7547]

  const posicion4={lat:-27.9143, lng:-55.7547};

  var posiciones =[{posicion4}];

 






  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        setState({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });
      },
      function (error) {
        console.error("Error Code = " + error.code + " - " + error.message);
      },
      {
        enableHighAccuracy: true,
      }
    );
  }, []);
  
  

  return (

    <div className='pagina'>
      <div className='tabla'>                     
        <ModalNuevaDenuncia initialModalState={show} />
        <Table />
      </div>
      <div className='mapa'>
        <Map center={posicion2} zoom={9} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

                <MarkersMapa />
      

        </Map>
        
      </div>
    </div>
  );
};

export default Mapa;




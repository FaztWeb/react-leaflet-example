import React, { useState, useEffect } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import '../css/Mapa.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from '../components/Table/table';
import ModalNuevaDenuncia from './ModalNuevaDenuncia';
import MarkersMapa from './MarkersMapa';
import { VenueLocationIcon } from "./VenueLocationIcon";
import { Button } from 'reactstrap';




import "leaflet/dist/leaflet.css";






const Mapa = (props) => {

  const [show, setShow] = useState(false);

  
  const handleShow = () => {setShow(true);console.log(show)}

  const [state, setState] = useState({
    longitude: 0,
    latitude: 0,
  });

  const [visible, setVisible] =useState(true);


  const posicion = [state.latitude, state.longitude]
  
  const posicion2 = [-26.741, -54.3137]
  

  const posicion4={lat:-27.9143, lng:-55.7547};

  

 




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
  
  


async function ver() {
   await setVisible(false);
   await setVisible(true);
};


  return (

    <div className='pagina'>
      
      <div className='tabla'> 
        <Button color="info" onClick={ver} >ACTUALIZAR</Button>                    
        <ModalNuevaDenuncia initialModalState={show} />
        {visible? <Table  />:<div></div>}
        
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




import React, { useState, useEffect } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import '../css/Mapa.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from '../components/Table/table';
import ModalNuevaDenuncia from './ModalNuevaDenuncia';
import MarkersMapa from './MarkersMapa';
import Heat from './Map';
import VenueMarkers from './VenueMarkers';
import { VenueLocationIcon } from "./VenueLocationIcon";
import { Button } from 'reactstrap';
import axios from 'axios';



import "leaflet/dist/leaflet.css";

const baseUrl="http://denuncias-api-posadas.herokuapp.com/denuncias";


var idPersonas =[];
var ubicaciones =[];
var url='';
var marcas =[]



const Mapa = (props) => {

  const [show, setShow] = useState(false);

  
  const handleShow = () => {setShow(true);console.log(show)}

  const [state, setState] = useState({
    longitude: 0,
    latitude: 0,
    posiciones:[]
  });

   function cargar(lat,lon,descripcion){
      
      var marca ={
        venue:'',     
        description:'',       
        name:descripcion,
        geometry:[lat,lon]      
        }    
        marcas.push(marca)
    }
   
  
  async function  cargarUbicaciones(){
    await axios.get(baseUrl)
    .then(response=>{            
        return response.data._embedded.denuncias;
    })
    .then(response=>{
        
        if(response.length>0 ){  
          idPersonas=response;              
          idPersonas.map((id) => (
           
            cargar(id.lat,id.lon,id.motivo)
            
            ));
        }else{
            alert('Error');
        }
    })
    .catch(error=>{
        console.log(error);
    })
  
  }

  const [visible, setVisible] =useState(true);
  const posicion2 = [-27.4038, -55.8830]
  


  useEffect(() => {
    cargarUbicaciones();
    navigator.geolocation.getCurrentPosition(
      function (position) {
        
        setState({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
          posiciones:marcas
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
}


  return (

    <div className='pagina'>
     
      <div className='tabla'> 
        <Button color="info" onClick={ver} >ACTUALIZAR</Button>                    
        <ModalNuevaDenuncia initialModalState={show} />
        {visible? <Table  />:<div></div>}
        
      </div>
      <div className='mapa'>
      {visible?<Map center={posicion2} zoom={13} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

                <VenueMarkers venues={state.posiciones} />
      

        </Map>:<div></div>}
        
       
      </div>
      
    </div>
    
  );
};

export default Mapa;




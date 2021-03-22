import React,{useState,useEffect} from 'react';
import { Link } from "react-router-dom";
import '../css/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Input from '../components/Input/input';
import Title from '../components/Title/title';
import Label from '../components/Label/label';
import axios from 'axios';
import Cookies from 'universal-cookie';

const baseUrl="https://denuncias-api-posadas.herokuapp.com/personas";
const cookies = new Cookies();

const  Login=()=> {

   
    
      

    const [user,setUser]=useState('');
    const [pass,setPass]=useState('');

    function handleChange(name,value){
        if (name=='usuario'){
                setUser(value);                
        }else if (name=='contrasenia'){
            setPass(value);
        }
    }

    function match(username,password){        
        return username===user && password==pass;
    }


    async function  iniciarSesion(){
        await axios.get(baseUrl)
        .then(response=>{            
            return response.data._embedded.personae;
        })
        .then(response=>{
            
            if(response.length>0 ){                
               let existe = response.some(function (el){               
                        setUser(el.apellido);
                        setPass(el.dni)  ;  
                        console.log(match(el.apellido,el.dni))                
                        return match(el.apellido,el.dni);
                } );
                
                if (existe){
                        cookies.set('usuario', user, {path: "/"});
                        cookies.set('contrasenia', pass, {path: "/"});                    
                        alert(`Bienvenido ${user} ${pass}`);
                        window.location.href="./mapa";
                }else{
                    cookies.set('usuario', '', {path: "/"});
                        cookies.set('contrasenia', '', {path: "/"});
                    alert('El usuario o la contraseña no son correctos');
                }
                
            }else{
                alert('Error');
            }
        })
        .catch(error=>{
            console.log(error);
        })

    }

    function  handleSubmit(){
        iniciarSesion();
    }

    return (
      <div className="containerPrincipal">
        <div className="containerSecundario">  
            <div className="form-group">          
                <Title text={'DENUNCIAS'}/>
                <Label text={'Ingrese el nombre de usuario'}/>
                
                <Input 
                    className="form-control"
                    atributte={{
                        id:'usuario',
                        name:'usuario',
                        type:'text',
                        placeholder:'Ingrese su usuario'
                    }}
                    handleChange={handleChange}
                />
                <Label text={'Ingrese la Contraseña'}/>
                <Input 
                    className="form-control"
                    atributte={{
                        id:'contrasenia',
                        name:'contrasenia',
                        type:'password',
                        placeholder:'Ingrese su Contraseña'
                    }}
                    handleChange={handleChange}                    
                />  
                <button className="btn btn-primary" onClick={handleSubmit}>Ingresar</button>        
            </div>            
        </div>
       

      </div>
    );
  }
  
  export default Login;
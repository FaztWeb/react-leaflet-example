import React, { useState, useEffect } from 'react'
import { Button } from 'reactstrap';
import axios from 'axios'
import '../../css/Table.css';





const Table = ({tipoDenuncia}) => {
  
    let URL = 'https://denuncias-api-posadas.herokuapp.com/denuncias?size=5000'
    
    
    const [denuncias, setDenuncias] = useState([])

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {

        const response = await axios.get(URL)
        
        setDenuncias(tipoDenuncia=='ELEGIR'?response.data._embedded.denuncias:
                                            tipoDenuncia==' '?
                                            response.data._embedded.denuncias:
                                            response.data._embedded.denuncias.filter(d=>d.tipoDenuncia==tipoDenuncia))
        
        
    }

    const removeData = (id) => {

        axios.delete(`${URL}/${id}`).then(res => {
            const del = denuncias.filter(denuncia => id !== denuncia.id)
            setDenuncias(del)
        })
    }

    const renderHeader = () => {
        let headerElement = ['id', 'motivo', 'fecha','tipoDenuncia','Acción']
        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    const renderBody = () => {
        return denuncias && denuncias.map(({ id, motivo, fecha, tipoDenuncia }) => {
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{motivo}</td>
                    <td>{fecha}</td>    
                    <td>{tipoDenuncia}</td>                
                    <td><Button color="danger" onClick={() => removeData(id)}>ELIMINAR</Button></td>
                </tr>
            )
        })
    }

    return (
        <>
            
            <table id='tabla_denuncias' className="table">
                <thead>
                    <tr>{renderHeader()}</tr>
                </thead>
                <tbody>
                    {renderBody()}
                </tbody>
            </table>
        </>
    )
}


export default Table
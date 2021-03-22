import React, { useState, useEffect } from 'react'
import axios from 'axios'




const Table = ({descripcion}) => {
  
    let URL = 'https://denuncias-api-posadas.herokuapp.com/denuncias'
    
    
    const [denuncias, setDenuncias] = useState([])

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {

        const response = await axios.get(URL)
        setDenuncias(response.data._embedded.denuncias)
    }

    const removeData = (id) => {

        axios.delete(`${URL}/${id}`).then(res => {
            const del = denuncias.filter(employee => id !== employee.id)
            setDenuncias(del)
        })
    }

    const renderHeader = () => {
        let headerElement = ['id', 'motivo', 'fecha','tipoDenuncia']
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
                    
                </tr>
            )
        })
    }

    return (
        <>
            <p className="flow-text">Denuncias</p>
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
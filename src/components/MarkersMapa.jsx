import React, { useState, useEffect } from 'react'
import { Marker } from "react-leaflet";
import { VenueLocationIcon } from "./VenueLocationIcon";




const MarkersMapa = () => {

    const posicion2 = [-27.3636, -55.8996]
    //const posicion3 = [-27.3640, -55.8996,-27.3640, -55.8996]
    const posicion4 = [-27.3656, -55.8996]


    const posicion5 = [-27.3670, -55.8996]

    const posicion3=({lat:-27.3636,lon:-55.8996,lat:-27.3650,lon:-55.8996})

    
    return (
        <>


            {/* <Marker position={posicion2} icon={VenueLocationIcon} />
            <Marker position={posicion3} icon={VenueLocationIcon} />
            <Marker position={posicion4} icon={VenueLocationIcon} /> */}
            <Marker position={posicion3} icon={VenueLocationIcon} />


        </>
    )




}
export default MarkersMapa;
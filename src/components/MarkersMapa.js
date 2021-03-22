import React, { useState, useEffect } from 'react'
import {Marker } from "react-leaflet";
import { VenueLocationIcon } from "./VenueLocationIcon";




const MarkersMapa = () => {

    const posicion2 = [-27.9143, -55.7547]
    const posicion3 = [-27.9144, -55.7547]
    const posicion4 = [-27.9145, -55.7547]

    return (
        <>
            <Marker position={posicion2} icon={VenueLocationIcon}  />
            <Marker position={posicion3} icon={VenueLocationIcon}  />
            <Marker position={posicion4} icon={VenueLocationIcon}  />
        </>
    )


}
export default MarkersMapa;
import React from 'react';
import {Input} from 'reactstrap'

const input=({atributte, handleChange, param}) =>{
    return(
        <div>
            <Input 
                id={atributte.id}
                name={atributte.name}
                placeholder={atributte.placeholder}
                type={atributte.type}
                onChange={(e) => handleChange(e.target.name,e.target.value)}
                className='regular-style'
            />
        </div>    
            
            )


};


export default input;
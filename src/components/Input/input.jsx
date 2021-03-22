import React from 'react';


const Input=({atributte, handleChange, param}) =>{
    return(
        <div>
            <input 
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


export default Input;
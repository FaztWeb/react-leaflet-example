import React from 'react';
import {Spinner} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Load.css';

function Loading(){
    return(
        <div className='divPadre'>
            <div className='divHijo'>
                <Spinner color='info' />
            </div>
        </div>
    );
}

export default Loading;
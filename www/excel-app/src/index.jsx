import React from 'react';
import ReactDOM from 'react-dom';
import "./css/app.css";
import Route from './router';

const render = Component => {
    ReactDOM.render( 
        <Component /> ,
        document.getElementById('root'),
    )
}

render(Route);
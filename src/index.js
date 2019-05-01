import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Overtime from './Overtime';
import * as serviceWorker from './serviceWorker';

const docRoot = document.getElementById('root');

const getScheme = (id) => {
  return (
    id === 1 ?
      { 
        element: <App />, 
        name: App.name
      } :
      { 
        element: <Overtime />, 
        name: Overtime.name 
      }
  );
};

const renderStuff = (component) => ReactDOM.render(component.element, docRoot);

const chooseWisely = () => 
  <React.Fragment>
    <button className="button-entry" onClick={() => renderStuff(getScheme(1))}>Calcular PPR</button>
    <button className="button-entry" onClick={() => renderStuff(getScheme(2))}>Calcular Sobreaviso</button>
  </React.Fragment>

ReactDOM.render(chooseWisely(), docRoot);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

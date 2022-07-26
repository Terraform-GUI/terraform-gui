import React from 'react';
import logo from './logo.svg';
import './App.css';

import SchemaUI from './SchemaUI';

function App() {
  return (
    <div className="wrapper">
      <div className="one">One</div>
      <div className="two">
        <SchemaUI/>
      </div>
      <div className="three">Trois</div>
      <div className="four">Quatre</div>
    </div>
  );
}

export default App;

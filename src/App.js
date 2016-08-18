import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Lib from './Lib';

import './App.scss';


export default class App extends Component {
  render() {

    return (
      <div className="App">
        <Lib
          width="100"
          height="200"
          rotate={90}
          src="http://i.telegraph.co.uk/multimedia/archive/03570/potd-grass_3570487k.jpg"
          headers={{'Access-Control-Allow-Origin': '*'}}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

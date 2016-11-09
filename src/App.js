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
          src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQQtPiYYqfwdb4-JHHtYjT8mnO42yIpQ1d2o8rz2zE3-ZQOi9y3"
          onLoading={() => console.log('on loading')}
          onLoad={() => console.log('on load')}
          onFail={(err) => console.log('on fail', err)}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

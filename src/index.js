import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
//cc
//global.name="";
global.backend="https://shoppingsitebackend3-env.eba-v8yecz8b.us-east-2.elasticbeanstalk.com";
global.backendSoket="http://shoppingsitebackend3-env.eba-v8yecz8b.us-east-2.elasticbeanstalk.com:3030";
//console.log("this is name"+global.name)
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


// fetch('/main')
//   .then(res => res.json())
//   .then(response => this.setState({ message: response.message }));
// fetch('/authorize');


ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();

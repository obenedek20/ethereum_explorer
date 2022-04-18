import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MoralisProvider } from 'react-moralis';
ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider
      serverUrl="https://yrn62hmc7zs8.usemoralis.com:2053/server"
      appId="aqQl8GZn5KY36wVDNiyC0afvjHYVbpWJO3KeFu8w"
    >
    <App />
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

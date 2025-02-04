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
      serverUrl="https://lzzwbsobsuau.usemoralis.com:2053/server"
      appId="jcbRMWiQBnDL5KK8IqlIJy56G1yTdgonpkHeTe7r"
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

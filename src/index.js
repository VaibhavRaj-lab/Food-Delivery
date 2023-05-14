import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { StateProvider } from "./context/StateProvider";
import { initialState } from "./context/initalState";
import reducer from "./context/reducer";
import { BrowserRouter as Router } from "react-router-dom";
import Footer from './components/Footer';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <StateProvider initialState={initialState} reducer={reducer}>
    <App />
    <Footer></Footer>
  </StateProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

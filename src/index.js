import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/AppIndex';
import {Provider} from "react-redux"
import {createStore, compose} from "redux"
import reducers from "./reducers"
import { devToolsEnhancer } from 'redux-devtools-extension';



ReactDOM.render(
    <Provider store={createStore(reducers,devToolsEnhancer())}>
            <App style={{fontSize: "100%"}}/>
    </Provider>
    , document.getElementById('root'));
import React from 'react'
import { createStore } from 'redux'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import paperApp from './reducer/reducer'
import App from './containers/App'
import 'bootstrap/dist/css/bootstrap.css'
import './home.css'

const initialState = {
    paper: {
        title: 'asd',
        time: "2016-7-19",
        author: "Ruiming",
    },
    questions: [{
        title: '',
        type: 'radio',
        content: ['', '', '', '']
    }, {
        title: '',
        type: 'checkbox',
        content: ['','','','']
    }]
};

let store = createStore(paperApp, initialState);
let rootElement = document.getElementById('index');
render (
    <Provider store={store}>
        <App />
    </Provider>,
    rootElement
);

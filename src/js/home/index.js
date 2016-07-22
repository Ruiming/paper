import React from 'react'
import { createStore } from 'redux'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import paperApp from './reducer/reducer'
import App from './containers/App'

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
/**
 * redux主要围绕store进行，只能有一个store，但作为reducer的paperApp可以合并多个reducer
 * 每个reducer控制store不同部分,
 * createStore传入两个参数，分别是reducer和初始对象，初始对象应该和reducer匹配
 */
let store = createStore(paperApp, initialState);
let rootElement = document.getElementById('index');
render (
    <Provider store={store}>
        <App />
    </Provider>,
    rootElement
);

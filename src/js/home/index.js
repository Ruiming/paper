var React = require('react');
var Header = require('./components/Header');
var NewQuestionBar = require('./components/NewQuestionBar');
var OptionsBar = require('./components/OptionsBar');

import { createStore } from 'redux'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import paperApp from './reducer/reducer'
import App from './containers/App'

let store = createStore(paperApp);
let rootElement = document.getElementById('index');
render (
    <Provider store={store}>
        <App />
    </Provider>,
    rootElement
);

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import Index from './view/index'
import 'nprogress/nprogress.css'
import './style/common.css'
import './style/font/css/font-awesome.min.css'
import registerServiceWorker from './registerServiceWorker';
import storeData from './store/reducers'

let store = createStore(storeData);
ReactDOM.render(
    <Provider store={store}>
        <Index/>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();

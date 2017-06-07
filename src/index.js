import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Root from './components/Root';
import CreateStore from './store/CreateStore';

const store = CreateStore();

ReactDOM.render(
    <Provider store={store}>
        <Root/>
    </Provider>,
    document.getELementById('root')
);

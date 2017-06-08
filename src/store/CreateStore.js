import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import Thunk from 'redux-thunk';

import MakeRootReducer from '../reducers/Root';

function _createStore() {

    const store = createStore(
        MakeRootReducer(),
        composeWithDevTools( applyMiddleware(Thunk) )
    );

    return store;
}

export default _createStore;

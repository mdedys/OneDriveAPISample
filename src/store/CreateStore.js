import { createStore, applyMiddleware } from 'redux';
import Thunk from 'redux-thunk';

import MakeRootReducer from '../reducers/Root';

function _createStore() {

    const store = createStore(
        MakeRootReducer,
        applyMiddleware(Thunk)
    );

    return store;
}

export default _createStore;

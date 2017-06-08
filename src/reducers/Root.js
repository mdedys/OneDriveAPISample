import { combineReducers } from 'redux';

import users from './Users';
import oneDrive from './OneDrive';

function makeRootReducer() {

    const rootReducer = combineReducers({
        users,
        oneDrive
    });

    return rootReducer;
}

export default makeRootReducer;

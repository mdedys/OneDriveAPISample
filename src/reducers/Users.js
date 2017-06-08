import Actions from '../actions/ActionNames';

const defaultState = {
    loggedIn: false,
    id: null,
    email: null,
    accessToken: null,
    expiry: null
};

function users(state = defaultState, action) {
    switch (action.type) {

        case Actions.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                accessToken: action.token,
                expiry: action.expiry,
                id: action.id,
                email: action.email
            }

        default:
            return state;
    };
}

export default users;

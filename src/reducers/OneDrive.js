import Actions from '../actions/ActionNames';

const defaultState = {
    files: {
        ids: []
    },
    folders: {
        ids: []
    },
    fetching: false
};

function users(state = defaultState, action) {
    switch (action.type) {

        case Actions.LOGIN_SUCCESS:
            return {
                ...state,
                fetching: true
            };

        case Actions.ROOT_FOLDER_LOADED:
            return {
                folders: action.folders,
                files: action.files,
                fetching: false
            };

        default:
            return state;
    };
}

export default users;

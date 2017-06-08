import Actions from './ActionNames';
import OneDriveActions from './OneDrive';
import OneDriveAPI from '../services/OneDriveAPI';
import OneDriveAuth from '../services/OneDriveAuth';

function receiveLogin(user, auth) {
    return {
        type: Actions.LOGIN_SUCCESS,
        token: auth.token,
        expiry: auth.expiry,
        id: user.id,
        email: user.userPrincipalName
    }
}

function login() {
    return dispatch => {
        return OneDriveAuth
            .challengeForAuth()
            .then( auth => {
                return [auth, OneDriveAPI.getUser(auth.token)];
            })
            .spread( (auth, user) => {

                dispatch(receiveLogin(user,auth));

                return OneDriveAPI.getRootFolder(auth.token);
            })
            .then( rootFolder => {
                dispatch(OneDriveActions.receiveRootFolder(rootFolder));
            })
            .catch( error => console.log(error) );
    };
}

export default {
    login: login
};

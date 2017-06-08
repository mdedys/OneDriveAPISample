import Promise from 'bluebird';
import Request from 'superagent';

const msGraphApiRoot = 'https://graph.microsoft.com/v1.0';

function getUser(token) {

    return new Promise( (resolve, reject) => {
        Request
            .get( `${msGraphApiRoot}/me` )
            .set( 'Authorization', `Bearer ${token}` )
            .end( (err, res) => {

                if (err) {
                    return reject({ error: err });
                }

                resolve(res.body || {});
            });
    });
}

function getRootFolder( token ) {

    return new Promise( (resolve, reject) => {
        Request
            .get( `${msGraphApiRoot}/me/drive/root/children` )
            .set( 'Authorization', `Bearer ${token}` )
            .end( (err, res) => {

                if (err) {
                    return reject({ error: err });
                }

                resolve(res.body || {});
            });
    });

}

export default {
    getUser: getUser,
    getRootFolder: getRootFolder
}

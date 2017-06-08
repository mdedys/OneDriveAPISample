import Promise from 'bluebird';

let authEventHandlerAttached = false;

function popup(url) {

    const width = 525,
        height = 525,
        screenX = window.screenX,
        screenY = window.screenY,
        outerWidth = window.outerWidth,
        outerHeight = window.outerHeight;

    const left = screenX + Math.max(outerWidth - width, 0) / 2;
    const top = screenY + Math.max(outerHeight - height, 0) / 2;

    const features = [
              "width=" + width,
              "height=" + height,
              "top=" + top,
              "left=" + left,
              "status=no",
              "resizable=yes",
              "toolbar=no",
              "menubar=no",
              "scrollbars=yes"];

    const popup = window.open(url, "oauth", features.join(","));

    if (!popup) {
        alert("failed to pop up auth window");
    }

    popup.focus();
}

function challengeForAuth() {

    return new Promise( (resolve, reject) => {

        const appInfo = {
            clientId: '79878dd4-12f4-48ff-9267-904c4ef43624',
            scopes: 'user.read files.read files.read.all files.readwrite.all',
            redirectUri: 'http://mdedys.github.io/OneDriveAPISample/callback.html',
            authServiceUri: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize'
        };

        const url = appInfo.authServiceUri +
            '?client_id=' + appInfo.clientId +
            '&response_type=token' +
            '&redirect_uri=' + encodeURIComponent(appInfo.redirectUri) +
            '&scope=' + encodeURIComponent(appInfo.scopes);

        popup(url);

        const onAuthenticated = evt => {

            const { token, expiry, authWindow } = evt.detail;

            authWindow.close();

            if (!token) {
                return reject({ error: 'Failed to authenticate' });
            }

            resolve({
                token: token,
                expiry: expiry
            });
        }

        if ( !authEventHandlerAttached ) {
            document.addEventListener('authCompleted', onAuthenticated);
            authEventHandlerAttached = true;
        }
    });
}

export default {
    challengeForAuth: challengeForAuth
};

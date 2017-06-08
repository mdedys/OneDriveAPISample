function onAuthComplete(token, expiry, authWindow) {
    var authEvent = new CustomEvent(
        'authCompleted',
        {
            detail: {
                token: token,
                expiry: expiry,
                authWindow: authWindow
            },
            bubbles: true,
            cancelable: true
        }
    );
    document.body.dispatchEvent(authEvent);
}

function onAuthCallback() {
    var authInfo = getAuthInfoFromUrl();

    if ( !authInfo ) {
        return window.opener.onAuthComplete(null, null, window);
    }

    var token = authInfo['access_token'];
    var expiry = parseInt(authInfo['expires_in']);

    window.opener.onAuthComplete(token, expiry, window);
}

function getAuthInfoFromUrl() {
  if (window.location.hash) {
    var authResponse = window.location.hash.substring(1);
    var authInfo = JSON.parse(
      '{' + authResponse.replace(/([^=]+)=([^&]+)&?/g, '"$1":"$2",').slice(0,-1) + '}',
      function(key, value) { return key === "" ? value : decodeURIComponent(value); });
    return authInfo;
  }
  else {
    alert("failed to receive auth token");
  }
}

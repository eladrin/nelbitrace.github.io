var CLIENT_ID = '1089456215638-k5k1a0gptju5o8dcm3urhg82uloihc7o.apps.googleusercontent.com';
var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
//var SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";
var SCOPES = "https://www.googleapis.com/auth/spreadsheets"; //수정 가능 이경우 readonly 시트는 조회도 안됨

document.addEventListener("onOverlayDataUpdate", onOverlayDataUpdate);
window.addEventListener("message", function(e) {
	if (e.data.type === 'onOverlayDataUpdate') onOverlayDataUpdate(e.data);
});

function onOverlayDataUpdate(e) {
	var dead = (e.detail.Encounter.kills > 0);

	var name = e.detail.Encounter.title;
	var zone = e.detail.Encounter.CurrentZoneName;
	if (dead == false) return;
	
	console.log(zone + " -> " + name + " : " + dead);	
	
}

function handleClientLoad() {
	gapi.load('client:auth2', initClient);
}

function initClient() {
	gapi.client.init({
		discoveryDocs: DISCOVERY_DOCS,
		clientId: CLIENT_ID,
		scope: SCOPES
	}).then(function () {
		// Listen for sign-in state changes.
		gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
	
		// Handle the initial sign-in state.
		updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
		//authorizeButton.onclick = handleAuthClick;
		//signoutButton.onclick = handleSignoutClick;
		//testButton.onclick = handleTestClick;
	});
}

function updateSigninStatus(isSignedIn) {
	if (isSignedIn) {
		//logged in
		loadMamulList();
	} else {
		//set screen login
		gapi.auth2.getAuthInstance().signIn();
	}
}

function loadMamulList() {
	
}
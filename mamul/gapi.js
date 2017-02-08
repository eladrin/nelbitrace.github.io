var CLIENT_ID = '1089456215638-k5k1a0gptju5o8dcm3urhg82uloihc7o.apps.googleusercontent.com';
var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
//var SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";
var SCOPES = "https://www.googleapis.com/auth/spreadsheets"; //수정 가능 이경우 readonly 시트는 조회도 안됨

function handleClientLoad() {
	gapi.load('client:auth2', initClient);
}

function initClient() {
	gapi.client.init({
		discoveryDocs: DISCOVERY_DOCS,
		clientId: CLIENT_ID,
		scope: SCOPES
	}).then(function () {
		gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
		updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
	});
}

function updateSigninStatus(isSignedIn) {
	if (isSignedIn) {
		//logged in
		loadMamulListFromSheet();
	} else {
		//set screen login
		gapi.auth2.getAuthInstance().signIn();
	}
}

//https://docs.google.com/spreadsheets/d/10wH2_hjnP-08xuVTPFp6h7IF5Fo9H2e3IQnm7ghOsBM/edit?pref=2&pli=1#gid=234086343
function loadMamulListFromSheet() {
	gapi.client.sheets.spreadsheets.values.get({
		spreadsheetId: '10wH2_hjnP-08xuVTPFp6h7IF5Fo9H2e3IQnm7ghOsBM',
		range: 'Test',
		dateTimeRenderOption: "SERIAL_NUMBER",
		valueRenderOption: "UNFORMATTED_VALUE"
	}).then(function(response) {
		var range = response.result;
		$("#contents table tbody").empty();
		if (range.values.length > 0) {
/*
			for (i = 0; i < range.values.length; i++) {
				var row = range.values[i];
				//appendPre(row[0] + ', ' + row[1] + ", " + row[2]);
				$("#contents table tbody").append("<tr><td>" + row[0] + "</td><td>test</td></tr>");
			}
*/
			importMamul(range.values);
			renderList();
		} else {
			//appendPre('No data found.');
		}
	}, function(response) {
		//appendPre('Error: ' + response.result.error.message);
		$("#contents table tbody").empty();
	});
}
function convert2jsDate( value ) {
	var jsDate = new Date();  // default to now
	if (value) {
		// If we were given a date object, use it as-is
		if (typeof value === 'date') {
			jsDate = value;
		} else {
			if (typeof value === 'number') {
				// Assume this is spreadsheet "serial number" date
				var daysSince01Jan1900 = value;
				var daysSince01Jan1970 = daysSince01Jan1900 - 25569 // 25569 = days TO Unix Time Reference
				var msSince01Jan1970 = daysSince01Jan1970 * 24 * 60 * 60 * 1000; // Convert to numeric unix time
				var timezoneOffsetInMs = jsDate.getTimezoneOffset() * 60 * 1000;
				jsDate = new Date( msSince01Jan1970 + timezoneOffsetInMs );
			} else if (typeof value === 'string') {
				// Hope the string is formatted as a date string
				jsDate = new Date( value );
			}
		}
	}
	return jsDate;
}

var mamulZone = {
	"못생긴 보가쟈": "중부라노",
	"웅크테히": "저지라노",
	"마도 지옥손아귀": "동부라노",
	"난": "서부라노",
	"마베리": "고지라노",
	"콘누": "외지라노",
	"포르네우스": "중부삼림",
	"녹아내리는 젤리": "동부삼림",
	"게데": "남부삼림",
	"기르타브": "북부삼림",
	"알렉트리온": "서부다날",
	"사보텐더 무희": "중부다날",
	"마헤스": "동부다날",
	"자니고": "남부다날",
	"마지막 투혼": "북부다날",
	"쿠레아": "모르도나",
	"머라쿠": "커르중앙",
	"류바": "커르서부",
	"미르카": "커르서부",
	"시시우틀": "아발구름",
	"엔켈라도스": "아발구름",	
	"악취화": "아지스라",
	"캠파크티": "아지스라",
	"스톨라스": "저지드라",
	"기계병정 슬립킨크스": "저지드라",
	"와이번 로드": "고지드라",
	"파일라스터": "고지드라",
	"부네": "드라구름",
	"아가토스": "드라구름",
	
	"크로크 미테느": "중부라노",
	"개굴개로스": "저지라노",
	"갈록": "동부라노",
	"보나콘": "서부라노",
	"난디": "고지라노",
	"체르노보그": "외지라노",
	"레드로네트": "중부삼림",
	"울가루": "동부삼림",
	"정신지배자": "남부삼림",
	"천갈래덩굴 세다": "북부삼림",
	"조나 시커": "서부다날",
	"브론테스": "중부다날",
	"발라우르": "동부다날",
	"느뉴느위": "남부다날",
	"미뇨카온": "북부다날",
	"아그리파": "모르도나",
	"사파트": "커르중앙",
	"카이저 베히모스": "커르서부",
	"극락조": "아발구름",
	"레우크로타": "아지스라",
	"창백의 기수": "저지드라",
	"센무르": "고지드라",
	"간다르바": "드라구름",
	
	"베히모스": "커르중앙",
	"알테마": "아지스라",
	"오딘": "삼림전체",
	"레기나 1단계": "고지드라",
	"레기나 2단계": "고지드라",
	"레기나 3단계": "고지드라",
};

var engZone = {
	"Middle La Noscea": "중부라노", 	"중부 라노시아": "중부라노",
	"Lower La Noscea": "저지라노", 	"저지 라노시아": "저지라노",
	"Eastern La Noscea": "동부라노",	"동부 라노시아": "동부라노",
	"Western La Noscea": "서부라노",	"서부 라노시아": "서부라노",
	"Upper La Noscea": "고지라노",		"고지 라노시아": "고지라노",
	"Outer La Noscea": "외지라노",		"외지 라노시아": "외지라노",
	
	"Central Shroud": "중부삼림",		"검은장막 숲 중부삼림": "중부삼림",
	"East Shroud": "동부삼림",			"검은장막 숲 동부삼림": "동부삼림",
	"South Shroud": "남부삼림",		"검은장막 숲 남부삼림": "남부삼림",
	"North Shroud": "북북삼림",		"검은장막 숲 북부삼림": "북부삼림",
	
	"Western Thanalan": "서부다날",	"서부 다날란": "서부다날",
	"Central Thanalan": "중부다날",	"중부 다날란": "중부다날",
	"Eastern Thanalan": "동부다날",	"동부 다날란": "동부다날",
	"Southern Thanalan": "남부다날",	"남부 다날란": "남부다날",
	"Northern Thanalan": "북부다날",	"북부 다날란": "북부다날",
	
	"Coerthas Central Highlands": "커르중앙", 	"커르다스 중앙고지": "커르중앙",
	
	"The Dravanian Forelands": "고지드라",		"고지 드라바니아": "고지드라",
	"The Dravanian Hinterlands": "저지드라",	"저지 드라바니아": "저지드라",
	
	"Coerthas Western Highlands": "커르서부",	"커르다스 서부고지": "커르서부",
	"Abalathia's Spine: The Sea Of Clouds": "아발구름", "아발라시아 구름바다": "아발구름",
	"Azys Lla": "아지스라", "아지스 라": "아지스라",
	"The Churning Mists": "드라구름", 	"드라바니아 구름바다": "드라구름",
	"Mor Dhona": "모르도나", "모르도나": "모르도나"
};

function convertEngToKorZone(eng) {
	return engZone[eng] == null ? eng : engZone[eng];
}

function timeToString(diff) {
	diff /= 1000;
	
	if (diff < 60) return Math.floor(diff) + "초";
	
	diff /= 60;
	if (diff < 60) return Math.floor(diff) + "분";

	diff /= 60;
	if (diff < 24) return Math.floor(diff) + "시간";
	
	diff /= 24;
	return Math.floor(diff) + "일";
}

function getParameterByName(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}

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
		initMain();
		
		$("#login").hide();
		$("#special").hide();
		$("#contents").show();
	} else {
		//set screen login
		//gapi.auth2.getAuthInstance().signIn();
		
		$("#login").show();
		$("#special").hide();
		$("#contents").hide();
		
	}
}

function doLoginGoogle() {
	gapi.auth2.getAuthInstance().signIn();
}

//https://docs.google.com/spreadsheets/d/10wH2_hjnP-08xuVTPFp6h7IF5Fo9H2e3IQnm7ghOsBM/edit?pref=2&pli=1#gid=234086343
function loadMamulListFromSheet() {
	gapi.client.sheets.spreadsheets.values.get({
		spreadsheetId: '10wH2_hjnP-08xuVTPFp6h7IF5Fo9H2e3IQnm7ghOsBM',
		range: 'Act',
		dateTimeRenderOption: "SERIAL_NUMBER",
		valueRenderOption: "UNFORMATTED_VALUE"
	}).then(function(response) {
		var range = response.result;
		$("#contents table tbody").empty();
		if (range.values.length > 0) {
			importMamul(range.values);
		}
		renderList();
	}, function(response) {
		//appendPre('Error: ' + response.result.error.message);
		rendarList();
	});
}

function appendRowSheet(values, callback) {
	gapi.client.sheets.spreadsheets.values.append({
    	spreadsheetId: '1uxXDxWAnFx1_YzHhTtUXEBwT2Rl_jLyaDpOWr_MV8MA',
		range: getParameterByName("admin") == null ? "일반용" : "관리용",
		valueInputOption: "USER_ENTERED", 
		resource: { 
			"majorDimension": "ROWS", 
			values: [ values ] 
		}
	}).then(function(res) { 
		callback();
	});
}


var mamulList = {
	A: [],
	S: [],	
	E: [],
	ES: []
};

function renderList() {
	render(mamulList.A, $("#contents table"));
	render(mamulList.ES, $("#special table"));
	//render(mamulList.E, $("#other table"));
}

var zoneColor = [
	["라노", "lano"],
	["삼림", "sanlim"],
	["다날", "danal"],
	["모르도나", "mordona"],
	["커르", "curu"],
	["아발", "abal"],
	["아지스", "abal"],
	["드라", "dura"]
];

function getZoneColorclass(zone) {
	if (zone == null) return null;
	for (var i = 0; i < zoneColor.length; i++) {
		if (zone.indexOf(zoneColor[i][0]) != -1) return zoneColor[i][1];
	}
	return null;
}

function render(list, $table) {
	$table.find("tbody").empty();
	
	var now = new Date();
	
	for (var i = 0; i < list.length; i++) {
		var mamul = list[i];
		var $row = $table.find(".rowTemplate").clone().removeClass("rowTemplate");
		$row.find(".zone").text(mamulZone[mamul.name]);
		var zoneClass = getZoneColorclass(mamulZone[mamul.name]);
		
		$row.find(".name").text(mamul.name);
		
		var time = "";
		var barWidth = 0;
		var barColor = "";
		if (mamul.s.getTime() > now.getTime()) {
			//노 젠
			time = timeToString(mamul.s.getTime() - now.getTime()) + " 남음";
			$row.addClass("nojen");

			//6시간 미만 일때 바 생성
			if (mamul.s.getTime() - now.getTime() < 21600000) {
				var div = (mamul.s.getTime() - now.getTime()) / 21600000;
				barWidth = Math.round(div * 100);
			}

			barColor = "rgba(128, 128, 128, 0.5)";
		} else if (mamul.e.getTime() < now.getTime()) {
			//풀 젠
			time = timeToString(now.getTime() - mamul.e.getTime()) + " 경과";
			$row.find(".time").addClass("full");
			$row.find(".name").addClass("glow");

			barWidth = 100;
			barColor = "rgba(46, 204, 113, 0.5)";

			if (zoneClass != null) $row.find(".zone").addClass(zoneClass);
		} else {
			//초 젠과 풀젠 사이
			time = timeToString(mamul.e.getTime() - now.getTime()) + " 남음";
			$row.find(".time").addClass("mid");
			$row.find(".name").addClass("glow");

			var div = (mamul.e.getTime() - now.getTime()) / (mamul.e.getTime() - mamul.s.getTime());
			div = div >= 0.05 ? div : 0.05; //최소 5%
			var blend = blend_colors('#f1c40f', '#2ecc71', div);

			barWidth = Math.round(div * 100);
			barColor = "rgba(" + blend.join(', ') + ", 0.5)";

			if (zoneClass != null) $row.find(".zone").addClass(zoneClass);
		}

		$row.find(".time .text").html(time);
		$row.find(".time .timebar").css({"width": barWidth + "%", "background-color": barColor});

		$table.find("tbody").append($row);
	}

}

function initMain() {
	loadMamulListFromSheet();
	setInterval(loadMamulListFromSheet, 30000);

	$("#naviButton").click(onClickNavi);
	screenChange();
}

//var screen = localStorage.getItem("screen");
//if (screen == null) screen = 0;

var screen = 0;

function onClickNavi() {
	screen++;
	screen %= 3;
	screenChange();
}

function screenChange() {
	if (screen == 0) {
		$("#special").hide();
		$("#contents").show();
		$("#other").hide();
		$("#headerTitle span").text("A급 마물 시간표 (카벙클)");
	} else if (screen == 1) {
		$("#special").show();
		$("#contents").hide();
		$("#other").hide();
		$("#headerTitle span").text("S급/특수 돌발 시간표 (카벙클)");
	} else if (screen == 2) {
		$("#special").hide();
		$("#contents").hide();
		$("#other").hide();
		$("#other").hide();
		$("#headerTitle span").text("카벙클 마물 시간표");
	}
	localStorage.setItem("screen", screen);
}

var scales = [ "scale1", "scale2", "scale3", "scale4" ];
var scaleIndex = localStorage.getItem("scaleIndex");
if (scaleIndex == null) scaleIndex = 0;

function onScaleChange() {
	var $html = $("html");
	for (var i = 0; i < scales.length; i++) $html.removeClass(scales[i]);
	$html.addClass(scales[scaleIndex]);
	localStorage.setItem("scaleIndex", scaleIndex);
}


function onOverlayDataUpdate(e) {
	try {
		var dead = (e.detail.Encounter.kills > 0);
		var name = e.detail.Encounter.title;
		var zone = e.detail.Encounter.CurrentZoneName;
		
		//console.log(zone + " -> " + name + " : " + dead);
		
		if (name == null || name === "Encounter") return;
		
		if (isMamul(name, zone) == false) return;
		if (checkIfReported(name)) return;
		
		var info = combatInfo(e.detail);
		
		doReport(name, info, dead);
	} catch (ex) {
		
	}
}

function importMamul(rows) {
	var a = [], s = [], e = [];
	var r = s;
	for (i = 0; i < rows.length; i++) {
		var row = rows[i];
		//appendPre(row[0] + ', ' + row[1] + ", " + row[2]);
		//$("#contents table tbody").append("<tr><td>" + row[0] + "</td><td>test</td></tr>");
		
		a.push({
			name: row[0],
			s: convert2jsDate(row[1]),
			e: convert2jsDate(row[2])
		});
		
		if (row[3] === "" || row[3] == null) {
			r = e;
			continue;
		} 
		
		r.push({
			name: row[3],
			s: convert2jsDate(row[4]),
			e: convert2jsDate(row[5])
		});
	}
	
	var es = [];
	for (var i = 0; i < e.length; i++) es.push(e[i]);
	for (var i = 0; i < s.length; i++) es.push(s[i]);
	mamulList.A = a;
	mamulList.S = s;
	mamulList.E = e;
	mamulList.ES = es;
}

function isMamul(name, zone) {
	zone = convertEngToKorZone(zone);
	return (mamulZone[name] === zone); 
}

function combatInfo(data) {
	var info = {
		duration: data.Encounter['DURATION'],
		demage: data.Encounter['denage'],
		encdps: data.Encounter['encdps'],
		combat: {}
	};
	for (var k in data.Combatant) info.combat[k] = data.Combatant[k].Job;
	return info;
}

function checkIfReported(name) {
	var date = localStorage.getItem("report." + name);
	if (date == null) return false;
	date = new Date(date);
	return (new Date().getTime() - date.getTime()) <= (1000 * 60 + 60);
}

function markReported(name) {
	localStorage.setItem("report." + name, (new Date().getTime()));
}

var rTimeout = 0;
function doReport(name, info, dead) {
	var run = function() {
		appendRowSheet([ name, JSON.stringify(info), new Date(), new Date().getTime() ], function() {
			markReported(name);
		});	
	};
	if (rTimeout != 0) {
		clearTimeout(rTimeout);
		rTimeout = 0;
	}
	if (dead) return run();
	
	setTimeout(run, 10000);
}


$(function() {
	
	$("#toggleBtn").click(function() {
		scaleIndex++;
		scaleIndex %= scales.length;
		onScaleChange();
	});
	onScaleChange();
})

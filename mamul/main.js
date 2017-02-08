var mamulList = {
	A: [],
	S: [],	
	E: []
};

function renderList() {
	render(mamulList.A, $("#contents table"));
	render(mamulList.S, $("#special table"));
	render(mamulList.E, $("#other table"));
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
		if (mamul.s.getTime() > now.getTime()) {
			//노 젠
			time = timeToString(mamul.s.getTime() - now.getTime()) + " 남음";
			$row.addClass("nojen");
		} else if (mamul.e.getTime() < now.getTime()) {
			//풀 젠
			time = timeToString(now.getTime() - mamul.e.getTime()) + " 경과";
			$row.find(".time").addClass("full");
			if (zoneClass != null) $row.find(".zone").addClass(zoneClass);
		} else {
			//초 젠과 풀젠 사이
			time = timeToString(mamul.e.getTime() - now.getTime()) + " 남음";
			$row.find(".time").addClass("mid");
			if (zoneClass != null) $row.find(".zone").addClass(zoneClass);
		}
		
		$row.find(".time").html(time);
		
		$table.find("tbody").append($row);
	}
	
}

function initMain() {
	loadMamulListFromSheet();
	setInterval(loadMamulListFromSheet, 30000);
	
	$("#naviButton").click(onClickNavi);
	$("#toggleBtn").click(function() {
		scaleIndex++;
		scaleIndex %= scales.length;
		onScaleChange();
	});
	onScaleChange();
}

var screen = 0;
function onClickNavi() {
	screen++;
	screen %= 3;
	if (screen == 0) {
		$("#special").hide();
		$("#contents").show();
		$("#other").hide();
		$("#headerTitle").text("A급 마물 시간표 (카벙클)");
	} else if (screen == 1) {
		$("#special").show();
		$("#contents").hide();
		$("#other").hide();
		$("#headerTitle").text("S급 마물 시간표 (카벙클)");
	} else if (screen == 2) {
		$("#special").hide();
		$("#contents").hide();
		$("#other").show();
		$("#headerTitle").text("특수 돌발 시간표 (카벙클)");
		
	}
}

var scales = [ "scale1", "scale2", "scale3", "scale4" ];
var scaleIndex = 0;
function onScaleChange() {
	var $html = $("html");
	for (var i = 0; i < scales.length; i++) $html.removeClass(scales[i]);
	$html.addClass(scales[scaleIndex]);
}

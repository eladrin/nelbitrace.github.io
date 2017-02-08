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

function render(list, $table) {
	$table.find("tbody").empty();
	
	var now = new Date();
	
	for (var i = 0; i < list.length; i++) {
		var mamul = list[i];
		var $row = $table.find(".rowTemplate").clone().removeClass("rowTemplate");
		$row.find(".zone").text(mamulZone[mamul.name]);
		$row.find(".name").text(mamul.name);
		
		var time = "";
		if (mamul.s.getTime() > now.getTime()) {
			//노 젠
			time = timeToString(mamul.s.getTime() - now.getTime()) + " 남음";
		} else if (mamul.e.getTime() < now.getTime()) {
			//풀 젠
			time = timeToString(now.getTime() - mamul.e.getTime()) + " 경과";
			$row.find(".time").addClass("full");
		} else {
			//초 젠과 풀젠 사이
			time = timeToString(mamul.e.getTime() - now.getTime()) + " 남음";
			$row.find(".time").addClass("mid");
		}
		
		$row.find(".time").html(time);
		
		$table.find("tbody").append($row);
	}
	
}

function initMain() {
	loadMamulListFromSheet();
	setInterval(loadMamulListFromSheet, 30000);
	
	$("#naviButton").click(onClickNavi);
}

var screen = 0;
function onClickNavi() {
	screen++;
	screen %= 2;
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

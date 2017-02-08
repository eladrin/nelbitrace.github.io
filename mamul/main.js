var mamulList = {
	A: [],
	S: [],	
	E: []
};

function renderList() {
	var $table = $("#contents table tbody").empty();
	
	var now = new Date();
	
	for (var i = 0; i < mamulList.A.length; i++) {
		var mamul = mamulList.A[i];
		var $row = $(".rowTemplate").clone().removeClass("rowTemplate");
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
		
		$table.append($row);
	}
	
}

function initMain() {
	loadMamulListFromSheet();
	setInterval(loadMamulListFromSheet, 30000);
	
	$("#nav-icon").click(onClickNavi);
}

var screen = 0;
function onClickNavi() {
	screen++;
	screen %= 2;
	if (screen == 0) {
		$("#special").hide();
		$("#contents").show();
	} else if (screen == 1) {
		$("#special").show();
		$("#contents").hide();
	}
}

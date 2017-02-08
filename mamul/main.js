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
			time = "초젠까지 " + timeToString(mamul.s.getTime() - now.getTime()) + " 남음";
		} else if (mamul.e.getTime() < now.getTime()) {
			//풀 젠
			time = "풀젠 " + timeToString(now.getTime() - mamul.e.getTime()) + " 초과";
			$row.addClass("full");
		} else {
			//초 젠과 풀젠 사이
			time = "풀젠까지 " + timeToString(mamul.e.getTime() - now.getTime()) + " 남음";
		}
		
		$row.find(".time").html(time);
		
		$table.append($row);
	}
	
}

function initMain() {
	loadMamulListFromSheet();
	setInterval(loadMamulListFromSheet, 30000);
}
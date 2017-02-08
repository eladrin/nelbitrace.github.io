var mamulList = {
	A: [],
	S: [],	
	E: []
};

function renderList() {
	var $table = $("#contents table tbody").empty();
	
	for (var i = 0; i < mamulList.A.length; i++) {
		var mamul = mamulList.A[i];
		var $row = $(".rowTemplate").clone().removeClass("rowTemplate");
		$row.find(".zone").text(mamulZone[mamul.name]);
		$row.find(".name").text(mamul.name);
		$table.append($row);
	}
	
}
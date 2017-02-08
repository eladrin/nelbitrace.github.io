var mamulList = {
	A: [],
	S: [],	
	E: []
};

function renderList() {
	var $table = $("#contents table tbody").empty();
	
	for (var i = 0; i < mamulList.A.length; i++) {
		var $row = $(".rowTemplate").clone().removeClass("rowTemplate");
		$row.find(".name").text(mamulList.A[i].name);
		$table.append($row);
	}
	
}
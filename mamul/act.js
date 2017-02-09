document.addEventListener("onOverlayDataUpdate", onOverlayDataUpdate);
window.addEventListener("message", function(e) {
	if (e.data.type === 'onOverlayDataUpdate') onOverlayDataUpdate(e.data);
});

function onOverlayDataUpdate(e) {
	var dead = (e.detail.Encounter.kills > 0);
	var name = e.detail.Encounter.title;
	var zone = e.detail.Encounter.CurrentZoneName;
	
	//console.log(zone + " -> " + name + " : " + dead);
	
	if (name == null || name === "Encounter") return;
	
	console.log(JSON.stringify(e));
	
	console.log(JSON.stringify(e.detail));
	
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
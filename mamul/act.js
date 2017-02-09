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
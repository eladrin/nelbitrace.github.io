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
	"간다르바": "드라구름"
};

var engZone = {
	"Middle La Noscea": "중부라노",
	"Lower La Noscea": "저지라노",
	"Eastern La Noscea": "동부라노",
	"Western La Noscea": "서부라노",
	"Upper La Noscea": "고지라노",
	"Outer La Noscea": "외지라노",
	
	"Central Shroud": "중부삼림",
	"East Shroud": "동부삼림",
	"South Shroud": "남부삼림",
	"North Shroud": "북북삼림",
	
	"Western Thanalan": "서부다날",
	"Central Thanalan": "중부다날",
	"Eastern Thanalan": "동부다날",
	"Southern Thanalan": "남부다날",
	"Northern Thanalan": "북부다날",
	
	"Coerthas Central Highlands": "커르중앙",
	
	"The Dravanian Forelands": "고지드라",
	"The Dravanian Hinterlands": "저지드라",
	
	"Coerthas Western Highlands": "커르서부",
	"Abalathia's Spine: The Sea Of Clouds": "아발구름",
	"Azys Lla": "아지스라",
	"The Churning Mists": "드라구름",
	"Mor Dhona": "모르도나"
};

function convertEngToKorZone(eng) {
	return engZone[eng] == null ? eng : engZone[eng];
}

function timeToString(diff) {
	diff /= 1000;
	
	var text = "초";
	if (diff > 60) {
		diff /= 60;
		text = "분";
	} 
	if (diff > 60) {
		diff /= 60;
		text = "시간";
	}
	if (diff > 24) {
		diff /= 24;
		text = "일";
	}
	return diff + text;
}
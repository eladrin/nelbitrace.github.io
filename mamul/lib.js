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
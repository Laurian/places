var Papa = require('papaparse');
var fs = require('fs');
const jsonfile = require('jsonfile');

var csv = fs.readFileSync(__dirname + '/whib-20170917-20230106.csv', 'utf8');


Papa.parse(csv, {
	complete: function(parsedCsv) {
		// console.log(parsedCsv);
		const geojson = {
		    "type": "FeatureCollection",
		    "features": [
		        {
		            "type": "Feature",
		            "geometry": {
		                "type": "LineString",
		                "coordinates": [
		                    // [
		                    //     139.606225,
		                    //     35.6732312,
		                    //     47
		                    // ],
						],
					},
		            "properties": {
		                "coordTimes": [
		                    // "2018-01-24T09:46:00Z",
						]
					}
				}
			]
		};
		parsedCsv.data.forEach(([
			crumb,
			localDate, // 17/09/2017
			localTime, // 09:34
			latitude,
			longitude,
			altitude,
			accuracy
		], i) => {
			if (i === 0) return;
			
			const [dd, mm, yyyy] = localDate?.split('/') ?? ['01', '01', '1900'];
			const [hh, mm2] = localTime?.split(':') ?? ['00', '00'];
			
			
			const date = `${yyyy}-${mm}-${dd}T${hh}:${mm2}:00Z`;
			
			geojson.features[0].geometry.coordinates.push([longitude, latitude]);
			geojson.features[0].properties.coordTimes.push(date);
			
			// console.log(geojson);
			jsonfile.writeFileSync(__dirname + '/whib-20170917-20230106.geojson', geojson);
			
		});
	},
});
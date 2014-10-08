$( document ).ready(function() {
	//on page load, graph by time is showing
	getData(crimesByTime, '');

	$('.js-filter-auto-thefts').click(function(){
		if($(this).hasClass('is-active')){
			$(this).removeClass('is-active');
		}
		else{
			$(this).addClass('is-active');
		}
	});


	$('.js-show-day').click(function(){
		$('.js-show-time').removeClass('is-active');
		$(this).addClass('is-active');
		if($('.js-filter-auto-thefts').hasClass('is-active')){
			getData(crimesByWeekday, '&event_clearance_group=Auto%20Thefts');
		}
		else{
			getData(crimesByWeekday, '');
		}
	});

	$('.js-show-time').click(function(){
		$('.js-show-day').removeClass('is-active');
		$(this).addClass('is-active');
		if($('.js-filter-auto-thefts').hasClass('is-active')){
			getData(crimesByTime, '&event_clearance_group=Auto%20Thefts');
		}
		else{
			getData(crimesByTime, '');
		}
	});

});

var getData = function(graphType, endpoint){
	$('#loader').removeClass('is-hidden');
	$('#chartdiv').addClass('is-hidden');
	$.ajax({
		type: "GET",
		cache: true,
		url: "https://data.seattle.gov/resource/3k2p-39jp.json?$where=within_circle(incident_location, 47.595146, -122.331601, 1609.34)" + endpoint,

		})
	.done(function(data){
		$('#loader').addClass('is-hidden');
		$('#chartdiv').removeClass('is-hidden');
		//send data from api to either the weekday or time bar graphs
		graphType(data);
	});
}

var crimesByWeekday = function(data){
	var dayOfWeek = {
		'Mon': 0,
		'Tue': 0,
		'Wed': 0,
		'Thu': 0,
		'Fri': 0,
		'Sat': 0,
		'Sun': 0,
	};
	for(var i=0; i<data.length; i++){
		var thisDate = (data[i].event_clearance_date);
		if(typeof thisDate != 'undefined'){
			//separate date from date and time
			var thisDay = thisDate.substring(0, 10);
			//get day of week name from date
			var dayName = String(Date.parse(thisDay)).substring(0, 3);

			dayOfWeek[dayName]++;
		}
	}

	getValues(dayOfWeek, 'day');

	//AMChart for day of week
	var chart = AmCharts.makeChart("chartdiv", {
	  "type": "serial",
		"theme": "dark",
	    "dataProvider": [
	{
	        "day": "Monday",
	        "crime": dayOfWeek['Mon']
	    },
	{
	        "day": "Tuesday",
	        "crime": dayOfWeek['Tue']
	    }, {
	        "day": "Wednesday",
	        "crime": dayOfWeek['Wed']
	    }, {
	        "day": "Thursday",
	        "crime": dayOfWeek['Thu']
	    }, {
	        "day": "Friday",
	        "crime": dayOfWeek['Fri']
	    }, {
	        "day": "Saturday",
	        "crime": dayOfWeek['Sat']
	    }, {
	        "day": "Sunday",
	        "crime": dayOfWeek['Sun']
	    }],
	    "valueAxes": [{
      "gridColor":"#FFFFFF",
			"gridAlpha": 0.2,
			"dashLength": 0
	    }],
	    "gridAboveGraphs": true,
	    "startDuration": 1,
	    "graphs": [{
	        "balloonText": "[[category]]: <b>[[value]]</b>",
	        "fillAlphas": 0.8,
	        "lineAlpha": 0.2,
	        "type": "column",
	        "valueField": "crime"
	    }],
	    "chartCursor": {
	        "categoryBalloonEnabled": false,
	        "cursorAlpha": 0,
	        "zoomable": false
	    },
	    "categoryField": "day",
	    "categoryAxis": {
	        "gridPosition": "start",
	        "gridAlpha": 0,
	         "tickPosition":"start",
	         "tickLength":20
	    },
		"exportConfig":{
		  "menuTop": 0,
		  "menuItems": [{
	      "icon": '/lib/3/images/export.png',
	      "format": 'png'
	      }]
		}
	});
}


var crimesByTime = function(data){
	var timeOfDay = {
		'00': 0,
		'01': 0,
		'02': 0,
		'03': 0,
		'04': 0,
		'05': 0,
		'06': 0,
		'07': 0,
		'08': 0,
		'09': 0,
		'10': 0,
		'11': 0,
		'12': 0,
		'13': 0,
		'14': 0,
		'15': 0,
		'16': 0,
		'17': 0,
		'18': 0,
		'19': 0,
		'20': 0,
		'21': 0,
		'22': 0,
		'23': 0
	};
	for(var i=0; i<data.length; i++){
		var thisDate = (data[i].event_clearance_date);
		//separate time from date and time
		if(typeof thisDate != 'undefined'){
			var thisTime = thisDate.substring(11, 13);

			timeOfDay[thisTime]++;
		}

	}

	getValues(timeOfDay, 'time');

	//AMChart for time
	var chart = AmCharts.makeChart("chartdiv", {
	  "type": "serial",
		"theme": "dark",
	    "dataProvider": [
	{
	        "time": "12am",
	        "crime": timeOfDay['00']
	    },
	{
	        "time": "1am",
	        "crime": timeOfDay['01']
	    }, {
	        "time": "2am",
	        "crime": timeOfDay['02']
	    }, {
	        "time": "3am",
	        "crime": timeOfDay['03']
	    }, {
	        "time": "4am",
	        "crime": timeOfDay['04']
	    }, {
	        "time": "5am",
	        "crime": timeOfDay['05']
	    }, {
	        "time": "6am",
	        "crime": timeOfDay['06']
	    }, {
	        "time": "7am",
	        "crime": timeOfDay['07']
	    }, {
	        "time": "8am",
	        "crime": timeOfDay['08']
	    },
	    {
	        "time": "9am",
	        "crime": timeOfDay['09']
	    },
	    {
	        "time": "10am",
	        "crime": timeOfDay['10']
	    },
	    {
	        "time": "11am",
	        "crime": timeOfDay['11']
	    },
	    {
	        "time": "12pm",
	        "crime": timeOfDay['12']
	    },
	    {
	        "time": "1pm",
	        "crime": timeOfDay['13']
	    },
	    {
	        "time": "2pm",
	        "crime": timeOfDay['14']
	    },
	    {
	        "time": "3pm",
	        "crime": timeOfDay['15']
	    },
	    {
	        "time": "4pm",
	        "crime": timeOfDay['16']
	    },
	    {
	        "time": "5pm",
	        "crime": timeOfDay['17']
	    },
	    {
	        "time": "6pm",
	        "crime": timeOfDay['18']
	    },
	    {
	        "time": "7pm",
	        "crime": timeOfDay['19']
	    },
	    {
	        "time": "8pm",
	        "crime": timeOfDay['20']
	    },
	    {
	        "time": "9pm",
	        "crime": timeOfDay['21']
	    },
	    {
	        "time": "10pm",
	        "crime": timeOfDay['22']
	    },
	    {
	        "time": "11pm",
	        "crime": timeOfDay['23']
	    }],
	    "valueAxes": [{
      "gridColor":"#FFFFFF",
			"gridAlpha": 0.2,
			"dashLength": 0
	    }],
	    "gridAboveGraphs": true,
	    "startDuration": 1,
	    "graphs": [{
	        "balloonText": "[[category]]: <b>[[value]]</b>",
	        "fillAlphas": 0.8,
	        "lineAlpha": 0.2,
	        "type": "column",
	        "valueField": "crime"
	    }],
	    "chartCursor": {
	        "categoryBalloonEnabled": false,
	        "cursorAlpha": 0,
	        "zoomable": false
	    },
	    "categoryField": "time",
	    "categoryAxis": {
	        "gridPosition": "start",
	        "gridAlpha": 0,
	         "tickPosition":"start",
	         "tickLength":20
	    },
		"exportConfig":{
		  "menuTop": 0,
		  "menuItems": [{
	      "icon": '/lib/3/images/export.png',
	      "format": 'png'
	      }]
		}
	});
}

var getValues = function(thisObj, objType){
	var max = 0;

	if(objType === 'day'){var min = thisObj['Mon'];}else{var min = thisObj['00'];}

	for (var prop in thisObj) {
		if(thisObj[prop] > max){
			var max = thisObj[prop];
			var maxProp = prop;
		}
	}
	for (var prop in thisObj) {
		if(thisObj[prop] < min){
			var min = thisObj[prop];
			var minProp = prop;
		}
	}
	if(objType === 'time'){
		var valueMost = convertTime(maxProp);
		var valueMin = convertTime(minProp);
	} else {
		var valueMost = maxProp;
		var valueMin = minProp;
	}

	//replace spans in second div with relevant information
	$('.js-type').text(objType);
	$('.js-d-most').text(valueMost);
	$('.js-d-least').text(valueMin);

}

var convertTime = function(tProperty){
	if(tProperty === 0){
		return "12am";
	} else if(tProperty > 12){
		return tProperty - 12 + "pm";
	}else{
		return tProperty + "am";
	}
}
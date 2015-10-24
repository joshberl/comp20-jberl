var request = new XMLHttpRequest();
var mylat = 0;
var mylong = 0;
var mymessage = "Hello!"
var me = new google.maps.LatLng(mylat, mylong);
var myOptions = {
	zoom: 13,
	center: me,
	mapTypeId: google.maps.MapTypeId.ROADMAP
};
var map;
var marker;
var infowindow = new google.maps.InfoWindow();
var lat = 0;
var lng = 0;
var message = "Howdy!";

function init() {
	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	getMyLocation();
}

function getMyLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function (position) {
			mylat = position.coords.latitude;
			mylong = position.coords.longitude;
			renderMap();
		});
	} else {
		alert("Geolocation is not supported by your web browser. What a shame!")
	}
}

function renderMap() {
	me = new google.maps.LatLng(mylat, mylong, message);
	map.panTo(me);
	marker = new google.maps.Marker({
		position: me,
		title: "RichRumfelt" + message,
		icon: 'chimp.png'
	});
	marker.setMap(map);
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.setContent(marker.title);
		infowindow.open(map, marker);
	});
	post(mylat, mylong, "RichRumfelt", "Howdy!")
}

function post(lat, lng, login, message) {
	var url = "https://secret-about-box.herokuapp.com/sendLocation";
	var params = "login=" + login + "&lat=" + lat + "&lng=" + lng + "&message=" + message;
	request.open("POST", url, true);
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status == 200) {
			data = JSON.parse(request.responseText);
			for (i = 0; i < data.length; i++) {
				new_marker(data[i], login);
			}
		}
	}
	request.send(params);
}

function new_marker(data, myname) {
	username = data["login"];
	if (username != myname) {	
		lat = data["lat"];
		lng = data["lng"];
		message = data["message"];
		pos = new google.maps.LatLng(lat, lng);
		marker = new google.maps.Marker({
			position: pos,
			title: username + " " + message,
			map: map
		});
		var distance = dist(mylat, mylong, lat, lng);
		var distance_string = '<h1>' + username + '</h1><h2>' + message +'</h2><p>' + distance + ' miles from me.</p>';
		marker.content = distance_string;
		infowindow = new google.maps.InfoWindow();
		google.maps.event.addListener(marker, 'click', function() {
			infowindow.setContent(this.content);
			infowindow.open(map, this);
		});
	} else {
		var my_string = '<h1>' + myname + '</h1><h2>' + message + '</h2>';
		marker.content = my_string;
		infowindow = new google.maps.InfoWindow();
		google.maps.event.addListener(marker, 'click', function() {
			infowindow.setContent(this.content);
			infowindow.open(map, this);
		});
	}
}

function dist(mylat, mylong, lat, lng) {
	Number.prototype.toRad = function() {
		return this * Math.PI / 180;
	}
	var R = 6371;
	var x1 = lat - mylat;
	var dlat = x1.toRad();
	var x2 = lng - mylong;
	var dlon = x2.toRad();
	var a = Math.sin(dlat/2) * Math.sin(dlat/2) + 
            Math.cos(x1.toRad()) * Math.cos(x2.toRad()) * 
            Math.sin(dlon/2) * Math.sin(dlon/2);  
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c; 
	return d;
}
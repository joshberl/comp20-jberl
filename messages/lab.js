function parse() {
	var xhr = new XMLHttpRequest()
	xhr.open('GET', 'http://messagehub.herokuapp.com/messages.json');
	xhr.onreadystatechange = function() {
		if (xhr.ReadyState = 4) 
			jsondata = JSON.parse(xhr.responseText)
			elem = document.getElementById("messages");
			elem.innerHTML = ""
			for (i = 0; i < jsondata.length; i++) {
				elem.innerHTML += "<p>" + jsondata[i]["username"] + ": " + jsondata[i]["content"] + "</p>";
			}
	}
	xhr.send();
}
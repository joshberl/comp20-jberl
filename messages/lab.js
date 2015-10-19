function parse() {
	var xhr = new XMLHttpRequest()
	xhr.open('GET', '/data.json');
	xhr.onreadystatechange = function() {
		if (xhr.ReadyState = 4) 
			jsondata = JSON.parse(xhr.responseText)
			//console.log(jsondata);
			elem = document.getElementById("messages");
			elem.innerHTML = ""
			for (i = 0; i < jsondata.length; i++) {
				//console.log(Object.keys(jsondata[i]));
				elem.innerHTML += "<p>" + jsondata[i]["username"] + ": " + jsondata[i]["content"] + "</p>";
			}
	}
	xhr.send();
}
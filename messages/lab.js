function parse() {
	var xhr = new XMLHttpRequest()
	xhr.open('GET', 'http://messagehub.herokuapp.com/messages.json', true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			if (xhr.status === 200) {
				data = JSON.parse(xhr.responseText);
				elem = document.getElementById("messages");
				//elem.innerHTML = "";
				for (i = 0; i < data.length; i++) {
					elem.innerHTML += "<p>" + data[i]["username"] + ": " + data[i]["content"] + "</p>";
				}
			}
		}
	};
	xhr.send(null);
}
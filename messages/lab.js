// Your JavaScript goes here...
function parse() {
	jsondata = data.json;
	parsedMessages = JSON.parse(jsondata);
	elem = document.geElementByID("messages");
	for (i = 0l i < parsedMessages.length; i++) {
		console.log(Object.keys(parsedMessages[i]));
		elem.innterHTML += "<p>" + parseObjects[i]["username"] + ": " parsedObjects[i]["content"] + "</p>";
	}
}
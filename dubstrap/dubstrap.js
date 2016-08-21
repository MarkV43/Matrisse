document.getElementsByTagName("head")[0].innerHTML += '<link rel="stylesheet" type="text/css" href="dubstrap/dubstrap.css">';
document.getElementsByTagName("head")[0].innerHTML += '<link href="https://fonts.googleapis.com/css?family=Bitter" rel="stylesheet">';
document.getElementsByTagName("head")[0].innerHTML += '<link href="https://fonts.googleapis.com/css?family=Cabin" rel="stylesheet">';
document.getElementsByTagName("head")[0].innerHTML += '<link href="https://fonts.googleapis.com/css?family=Arvo" rel="stylesheet"> ';
document.getElementsByTagName("head")[0].innerHTML += '<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet"> ';
setTimeout(function () {
	var classes = {
		'span': ['btn-animated']
	};
	for (var key1 in classes) {
		for (var key2 in classes[key1]) {
			var elemento = document.getElementsByClassName(classes[key1][key2]);
			for (var key3 in elemento) {
				elemento[key3].innerHTML = "<" + key1 + ">" + elemento[key3].innerHTML + "</" + key1 + ">";
			}
		}
	}
}, 0);
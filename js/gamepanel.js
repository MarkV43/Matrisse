var table = [0, 1, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0];

tLen = table.length;

for (i = 0; i <= tLen; i++) {
	if (table[i] == 1) {

	}
}
var tirar = null;
setTimeout(function () {
		var table = document.querySelector("table.gameTable"),
			trs = document.querySelectorAll("table.gameTable tr"),
			p1vez = true,
			obj,
			p1 = 0,
			p2 = 0,
			p1Placar = document.querySelector("#p1Placar"),
			p2Placar = document.querySelector("#p2Placar");
		const SIZE = trs[0].childNodes.length;
		for (var k1 = 0; k1 < trs.length; k1++) {
			for (var k2 = 0; k2 < trs[k1].childNodes.length; k2++) {
				trs[k1].childNodes[k2].onclick = function () {
					if (!this.className) {
						var id = this.id,
							row = id.substr(0, 1),
							col = id.substr(1, 1),
							i0 = row - 1,
							i6 = i0 + 2,
							j0 = col - 1,
							j6 = j0 + 2;
						if (i0 < 0)
							i0 = 0;
						else if (i6 >= SIZE)
							i6 = SIZE - 1;
						if (j0 < 0)
							j0 = 0;
						else if (j6 >= SIZE)
							j6 = SIZE - 1;
						console.log("i0: "+i0+"\ni6: "+i6+"\nj0: "+j0+"\nj6: "+j6);
						for (var i = i0; i <= i6; i++) {
							for (var j = j0; j <= j6; j++) {
								obj = trs[i].childNodes[j];
								if (obj.className == "p1") {
									obj.className = "";
									p1--;
								} else if (obj.className == "p2") {
									obj.className = "";
									p2--;
								} else if (p1vez) {
									obj.className = "p1";
									p1++;
								} else {
									obj.className = "p2";
									p2++
								}
							}
						}
						if (tirar != null) {
							var tmp = document.getElementById(tirar);
							tmp.className = tmp.className.replace(/click/g, "");
						}
						this.className = this.className + " click";
						tirar = this.id;
						p1vez = !p1vez;
						p1Placar.innerHTML = p1;
						p2Placar.innerHTML = p2;
						if (p1vez) {
							p1Placar.className = "vez";
							p2Placar.className = "";
						} else {
							p1Placar.className = "";
							p2Placar.className = "vez";
						}
					}
				}
			}
		}
	},
	0
)
;
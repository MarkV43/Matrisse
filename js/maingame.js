var tirar    = null,
    linha    = document.querySelectorAll("table.gameTable tr"),
    tamLinha = linha.length,
    p1vez    = true,
    p1       = 0,
    p2       = 0,
    p1placar = document.querySelector("#p1Placar"),
    p2placar = document.querySelector("#p2Placar"),
    pause    = false,
    id, row, col, i0, i6, j0, j6;

const SIZE = linha[0].childNodes.length,
      WIN  = Math.floor(SIZE * SIZE / 2) + 1;

function pintaCasas(name) {
	for (var i = i0; i <= i6; i++) {
		for (var j = j0; j <= j6; j++) {
			obj = linha[i].childNodes[j];
			if (obj.className.indexOf("p1") !== -1) {
				obj.className = "";
				p1--;
			} else if (obj.className.indexOf("p2") !== -1) {
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
		var tmp       = document.getElementById(tirar);
		tmp.className = tmp.className.replace(/click/g, "");
	}
	name.className = name.className + " click";
	tirar          = name.id;
	p1vez          = !p1vez;
	atualizaPlacar();
}

function atualizaPlacar() {
	p1Placar.innerHTML = p1;
	p2Placar.innerHTML = p2;
	if (p1vez) {
		p1Placar.className = "vez";
		p2Placar.className = "";
	} else {
		p1Placar.className = "";
		p2Placar.className = "vez";
	}
	pause = analisaPlacar();
	if (pause == 1) {
		p1placar.className = "ganha";
		p2placar.className = "perde";
	} else if (pause == 2) {
		p1placar.className = "perde";
		p2placar.className = "ganha";
	}
	if (pause)
		setTimeout("pintaJogo(0,0)", 2000);
}

function analisaPlacar() {
	return p1 >= WIN ? 1 : (p2 >= WIN ? 2 : 0);
}

function pintaJogo(num1, num2) {
	console.warn("num1: " + num1 + "\nnum2: " + num2);
	document.getElementById(num1 + "" + num2).className = "p" + pause;
	num2++;
	if (num2 >= SIZE) {
		num2 = 0;
		num1++;
	}
	if (num1 < SIZE)
		setTimeout("pintaJogo(" + num1 + "," + num2 + ")", 100);
}

function verificaLivre(name) {
	id  = name.id;
	row = id.substr(0, 1);
	col = id.substr(1, 1);
	i0  = row - 1;
	i6  = i0 + 2;
	j0  = col - 1;
	j6  = j0 + 2;
	if (i0 < 0)
		i0 = 0;
	else if (i6 >= SIZE)
		i6 = SIZE - 1;
	if (j0 < 0)
		j0 = 0;
	else if (j6 >= SIZE)
		j6 = SIZE - 1;
	if (!name.className)
		pintaCasas(name);
}

function botaoClique(name) {
	if (!pause && p1vez) {
		verificaLivre(name);
		callAI();
	}
}

function getMax(arr) {
	return Math.max.apply(undefined, arr);
}

function callAI() {
	if (!pause) {
		var tempos = [1000, 2000, 2500];
		setTimeout("ai()", tempos[Math.floor(Math.random() * tempos.length)]);
		//setTimeout("callAI()", 2500);
	}
}

function ai() {
	analisarTabuleiro();
	/*while (!p1vez) {
	 verificaLivre(fuck);
	 }*/
}

function analisarTabuleiro() {
	var i0,
	    ganha       = [],
	    vantagem    = [],
	    perde       = [],
	    melhorPos   = [],
	    melhorPosX  = [],
	    melhorPosY  = [],
	    maxGanha    = 0,
	    maxVantagem = 0,
	    minPerde    = 0;

	for (var i = 0; i < SIZE; i++) {
		ganha[i]    = [];
		vantagem[i] = [];
		perde[i]    = [];
		for (var j = 0; j < SIZE; j++) {
			if (!document.getElementById(i + "" + j).className) {
				ganha[i][j]    = 0;
				vantagem[i][j] = 0;
				perde[i][j]    = 0;
				i0             = i - 1;
				i6             = i0 + 2;
				j0             = j - 1;
				j6             = j0 + 2;
				if (i0 < 0)
					i0 = 0;
				else if (i6 >= SIZE)
					i6 = SIZE - 1;
				if (j0 < 0)
					j0 = 0;
				else if (j6 >= SIZE)
					j6 = SIZE - 1;
				for (var x = i0; x <= i6; x++) {
					for (var y = j0; y <= j6; y++) {
						var tmpObj = document.getElementById(x + "" + y).className;
						if (!tmpObj)
							ganha[i][j]++;
						else if (tmpObj.indexOf("p1") !== -1)
							vantagem[i][j]++;
						else
							perde[i][j]++;
					}
				}

				if (ganha[i][j] + p2 - perde[i][j] >= WIN) {
					maxGanha  = 666;
					melhorPos = i + "" + j;
				}


				var jogada = ganha[i][j] - perde[i][j] + vantagem[i][j] / getRandomInt(1, 4);
				if (ganha[i][j] > perde[i][j] && jogada >= maxGanha) {
					maxGanha  = jogada;
					melhorPos = i + "" + j;
				}
			}
		}
	}
	verificaLivre(document.getElementById(melhorPos));

	console.warn("ganha:");
	console.warn(ganha);
	console.warn("vantagem:");
	console.warn(vantagem);
	console.warn("perde:");
	console.warn(perde);

}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
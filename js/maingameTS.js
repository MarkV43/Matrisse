var clicado = null, linha = document.querySelectorAll("table.gameTable tr"), tamLinha = linha.length, whiteTurn = true, white = 0, black = 0, whiteScore = document.querySelector("#p1Placar"), blackScore = document.querySelector("#p2Placar"), end = 0, gamemode = "pc", aiTurn = gamemode.substr(0, 1) == "c", whiteLast = "666", blackLast = "666", difficulty = 2;
// difficulties are still Work In Progress, but can change the game
// 0: easy
// 1: medium
// 2: hard
// 3: impossible (WIP)
var SIZE = linha[0].childElementCount, WIN = Math.floor(SIZE * SIZE / 2) + 1, INF = Number.NEGATIVE_INFINITY;
function pintaQuadrado(id, whiteC) {
    var pos = document.getElementById(id);
    if (!confereLivre(id))
        pos.className = "p0";
    else
        pos.className = "p" + (whiteC ? 1 : 2);
}
function pintaVolta(id, whiteC) {
    var x = id.getChar(1)
        .toInt(), y = id.getChar(2)
        .toInt(), iI = x - (x > 0 ? 1 : 0), iF = x + (x < SIZE - 1 ? 1 : 0), jI = y - (y != 0 ? 1 : 0), jF = y + (y < SIZE - 1 ? 1 : 0);
    for (var i = iI; i <= iF; i++) {
        for (var j = jI; j <= jF; j++) {
            pintaQuadrado(i.toString() + j, whiteC);
        }
    }
}
function bordaClique(id) {
    if (clicado != null)
        document.getElementById(clicado)
            .classList
            .remove("click");
    document.getElementById(id)
        .classList
        .add("click");
    clicado = id;
}
function confereLivre(id) {
    var pos = document.getElementById(id).className;
    return pos == "" || pos == "p0";
}
function atualizaPlacar() {
    white = 0;
    black = 0;
    for (var i = 0; i < SIZE; i++) {
        for (var j = 0; j < SIZE; j++) {
            var id = i.toString() + j;
            var pos = document.getElementById(id).classList;
            if (pos.contains("p1"))
                white++;
            else if (pos.contains("p2"))
                black++;
        }
    }
    whiteScore.innerHTML = white.toString();
    blackScore.innerHTML = black.toString();
    if (whiteTurn) {
        whiteScore.classList.remove("vez");
        blackScore.classList.add("vez");
    }
    else {
        whiteScore.classList.add("vez");
        blackScore.classList.remove("vez");
    }
}
function gameOver() {
    return white >= WIN ? 1 : black >= WIN ? 2 : 0;
}
function drawEndgame(x, y, right, whiteC) {
    var coords = x.toString() + y;
    document.getElementById(coords).className = "p" + (whiteC ? 1 : 2);
    if (right) {
        if (y < SIZE - 1) {
            if (x > 0)
                x--;
            else
                right = false;
            y++;
        }
        else {
            x++;
            right = false;
        }
    }
    else {
        if (x < SIZE - 1) {
            if (y > 0)
                y--;
            else
                right = true;
            x++;
        }
        else {
            y++;
            right = true;
        }
    }
    if (coords != (SIZE - 1).toString() + (SIZE - 1))
        setTimeout(function () {
            drawEndgame(x, y, right, whiteC);
        }, 80);
}
/*function updateJogada() {
 aiTurn = gamemode.substr(whiteTurn ? 1 : 0, 1) == "c";
 }*/
function botaoClique(botao, ai) {
    var id = botao.id;
    //console.log(id + "\n" + (ai ? "true" : "false"));
    if (!end) {
        if (!confereLivre(id))
            alert("Voc� s� pode jogar nos quadrados azuis");
        else {
            if (ai != aiTurn)
                alert("Espere pela vez do seu oponente");
            else {
                if ((whiteTurn && whiteLast == id) || (!whiteTurn && blackLast == id))
                    alert("Voc� n�o pode jogar duas vezes seguidas no mesmo lugar");
                else {
                    pintaVolta(id, whiteTurn);
                    bordaClique(id);
                    atualizaPlacar();
                    end = gameOver();
                    if (whiteTurn)
                        whiteLast = id;
                    else
                        blackLast = id;
                    if (end) {
                        if (end == 1) {
                            whiteScore.className = "ganha";
                            blackScore.className = "perde";
                        }
                        else if (end == 2) {
                            whiteScore.className = "perde";
                            blackScore.className = "ganha";
                        }
                        drawEndgame(0, 0, true, end == 1);
                    }
                    else {
                        whiteTurn = !whiteTurn;
                        aiTurn = gamemode.substr(whiteTurn ? 0 : 1, 1) == "c";
                        if (aiTurn)
                            setTimeout(function () {
                                callAI(whiteTurn);
                            }, 1000);
                    }
                }
            }
        }
    }
}
function callAI(whiteC) {
    var jogadas = analizeBoard(whiteC), jogada = decidirJogada(jogadas, whiteC);
    //console.log(jogadas);
    var id = jogada.x.toString() + jogada.y;
    console.log({ id: id });
    botaoClique(document.getElementById(id), true);
}
function decidirJogada(jogadas, whiteC) {
    var maxGanha = { valor: -INF, ids: [{ x: -1, y: -1 }] }, maxPerde = { valor: -INF, ids: [{ x: -1, y: -1 }] }, maxLucro = { valor: -INF, ids: [{ x: -1, y: -1 }] }, maxVantagem = { valor: -INF, ids: [{ x: -1, y: -1 }] }, jogada = null, max;
    for (var h in jogadas) {
        if (jogadas.hasOwnProperty(h)) {
            switch (h) {
                case "ganha":
                    max = maxGanha;
                    break;
                case "perde":
                    max = maxPerde;
                    break;
                case "lucro":
                    max = maxLucro;
                    break;
                case "vantagem":
                    max = maxVantagem;
                    break;
            }
            for (var i in jogadas[h]) {
                if (jogadas[h].hasOwnProperty(i)) {
                    for (var j in jogadas[h][i]) {
                        if (jogadas[h][i].hasOwnProperty(j)) {
                            if (jogadas[h][i][j] == maxGanha.valor)
                                max.ids[max.ids.length] = { x: i.toInt(), y: j.toInt() };
                            else if (jogadas[h][i][j] > max.valor) {
                                max.valor = jogadas[h][i][j];
                                max.ids = [{ x: i.toInt(), y: j.toInt() }];
                            }
                        }
                    }
                }
            }
        }
    }
    if (difficulty > 0 && (whiteC ? white : black) + maxLucro.valor >= WIN) //harder than easy
        jogada = maxLucro.ids.rand();
    else if (difficulty > 1 && (whiteC ? black : white) >= WIN - 2) { //harder than medium
        var vLucro = [];
        for (var i in maxVantagem.ids) {
            if (maxVantagem.ids.hasOwnProperty(i)) {
                var j = maxVantagem.ids[i];
                vLucro[i](jogadas.lucro[j.x][j.y]);
            }
        }
        jogada = maxVantagem.ids[vLucro.maxId()];
    }
    var bests = { valor: -INF, ids: [{}] };
    for (var i in jogadas.ganha) {
        if (jogadas.ganha.hasOwnProperty(i)) {
            for (var j in jogadas.ganha[i]) {
                if (jogadas.ganha[i].hasOwnProperty(j)) {
                    var valor = jogadas.lucro[i][j] + (jogadas.vantagem[i][j] / 3);
                    if (valor > bests.valor)
                        bests = { valor: valor, ids: [{ x: i, y: j }] };
                    else if (valor == bests.valor)
                        bests.ids.push({ x: i, y: j });
                }
            }
        }
    }
    console.log({ bests: bests });
    jogada = bests.ids.rand();
    console.log({ jogada: jogada });
    return jogada;
}
function analizaVolta(id, whiteC) {
    var x = id.getChar(1)
        .toInt(), y = id.getChar(2)
        .toInt(), iI = x - (x > 0 ? 1 : 0), iF = x + (x < SIZE - 1 ? 1 : 0), jI = y - (y != 0 ? 1 : 0), jF = y + (y < SIZE - 1 ? 1 : 0), ganha = 0, vantagem = 0, perde = 0;
    for (var i = iI; i <= iF; i++) {
        for (var j = jI; j <= jF; j++) {
            var classe = document.getElementById(i.toString() + j).classList;
            if (confereLivre(i.toString() + j))
                ganha++;
            else if (classe.contains("p" + (whiteC ? 1 : 2)))
                perde++;
            else
                vantagem++;
        }
    }
    return {
        'ganha': ganha,
        'vantagem': vantagem,
        'perde': perde
    };
}
function analizeBoard(whiteC) {
    var ganha = [], vantagem = [], perde = [], lucro = [];
    for (var i = 0; i < SIZE; i++) {
        ganha[i] = [];
        vantagem[i] = [];
        perde[i] = [];
        lucro[i] = [];
        for (var j = 0; j < SIZE; j++) {
            var pos = i.toString() + j;
            if (confereLivre(pos) && ((whiteC && whiteLast != pos) || (!whiteC && blackLast != pos))) {
                var jogada = analizaVolta(i.toString() + j, whiteC);
                ganha[i][j] = jogada.ganha;
                vantagem[i][j] = jogada.vantagem;
                perde[i][j] = jogada.perde;
                lucro[i][j] = ganha[i][j] - perde[i][j];
            }
        }
    }
    /*console.log({
     'ganha': ganha,
     'perde': perde,
     'lucro': lucro,
     'vantagem': vantagem
     });*/
    return {
        'ganha': ganha,
        'perde': perde,
        'lucro': lucro,
        'vantagem': vantagem
    };
}
Boolean.prototype.toInt = function () {
    return this ? 1 : 0;
};
String.prototype.toInt = function () {
    return parseInt(this);
};
String.prototype.getChar = function (pos) {
    return this.substr(pos - 1, 1);
};
String.prototype.contains = function (needle) {
    return this.indexOf(needle);
};
Array.prototype.rand = function () {
    return this[Math.floor(Math.random() * this.length)];
};
Array.prototype.maxId = function () {
    var max = { valor: -INF, id: [] };
    for (var i in this) {
        if (this.hasOwnProperty(i)) {
            if (this[i] > max)
                max = { valor: this[i], id: [i] };
            else
                max.id.push(i);
        }
    }
    return max;
};
if (aiTurn) {
    callAI(true);
}
//# sourceMappingURL=maingameTS.js.map
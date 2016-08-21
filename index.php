<!doctype html>
<html>
<head>
	<title>Matrisse</title>
	<meta charset="utf-8">
	<script type="text/javascript" src="dubstrap/dubstrap.js"></script>
	<link rel="stylesheet" type="text/css" href="css/gameobjs.css">
</head>

<body>
<div class="title">
	<h1>Matrisse</h1>
</div>
<div class="screen">
	<div class="gameScreen">
		<span id="p1Placar" class="vez">0</span>
		<div class="gameCard">
			<div class="gameTableBG">
				<table class="gameTable" cellspacing="6">
					<tbody>
					<?php
						const SIZE = 7;
						for ($i = 0; $i < SIZE; $i++) {
							echo "<tr>";
							for ($j = 0; $j < SIZE; $j++)
								echo "<td id='$i$j' onclick='botaoClique(this, false)'></td>";
							echo "</tr>";
						}
					?>
					</tbody>
				</table>
			</div>
		</div>
		<span id="p2Placar">0</span>
	</div>
</div>
<script type="text/javascript" src="js/maingameTS.js"></script>
</body>
</html>
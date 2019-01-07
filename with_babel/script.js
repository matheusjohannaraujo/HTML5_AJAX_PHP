// Brasil\Pernambuco
// Developer: Matheus Johann Araújo
// Date: 2019-01-06
// Bitbucket: https://bitbucket.org/matheusjohannaraujo/html5_ajax_php/

"use strict";

window.addEventListener("load", function (event) {
	var inputFile = document.querySelectorAll("body > input[type='file']")[0];
	var inputText = document.querySelectorAll("body > input[type='text']")[0];
	var button = document.querySelectorAll("body > button");
	var pre = document.querySelectorAll("body > pre")[0];

	button[0].addEventListener("click", function (event) {
		AJAX('GET', './server.php', "nome=" + inputText.value, function (value) {
			pre.innerHTML += value + "<br>";
		}, true).run();
	});

	button[1].addEventListener("click", function (event) {
		var ajax = AJAX();
		ajax.debug = true;
		ajax.method = 'POST';
		ajax.action = './server.php';
		ajax.params = { nome: inputText.value };
		ajax.success = function (value) {
			pre.innerHTML += value + "<br>";
		};
		ajax.run();
	});

	button[2].addEventListener("click", function (event) {
		var ajax = AJAX();
		ajax.debug = true;
		ajax.method = 'PUT';
		ajax.action = './server.php';
		ajax.params = { nome: inputText.value };
		ajax.success = function (value) {
			pre.innerHTML += value + "<br>";
		};
		ajax.run();
	});

	button[3].addEventListener("click", function (event) {
		var ajax = AJAX();
		ajax.debug = true;
		ajax.method = 'DELETE';
		ajax.action = './server.php';
		ajax.params = "/nome/" + inputText.value;
		ajax.success = function (value) {
			pre.innerHTML += value + "<br>";
		};
		ajax.run();
	});

	button[4].addEventListener("click", function (event) {
		var ajax = AJAX();
		ajax.debug = true;
		ajax.method = 'PATCH';
		ajax.action = './server.php';
		ajax.params = JSON.stringify({
			nome: inputText.value
		});
		ajax.success = function (value) {
			pre.innerHTML += value + "<br>";
		};
		ajax.run();
	});

	button[5].addEventListener("click", function (event) {
		if (inputFile.files.length > 0) {
			var data = new FormData();
			for (var i = 0; i < inputFile.files.length; i++) {
				data.append('arquivo[]', inputFile.files[i]);
			}
			var ajax = AJAX();
			ajax.debug = true;
			ajax.method = 'POST';
			ajax.action = './server.php';
			ajax.params = data;
			ajax.onload = function () {
				alert("Arquivo enviado.");
			};
			ajax.success = function (value) {
				pre.innerHTML += value + "<br>";
			};
			ajax.run();
		} else {
			alert("Não existem arquivos selecionados.");
		}
	});
});
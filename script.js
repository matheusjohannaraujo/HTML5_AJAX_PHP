/*
	Brasil\Pernambuco
	Developer: Matheus Johann Araújo
	Data: 22/04/2018
	Bitbucket: https://bitbucket.org/matheusjohannaraujo/html5_ajax_php/
*/

window.addEventListener("load", function(event){

	const inputFile = document.querySelectorAll("body > input[type='file']")[0];
	const inputText = document.querySelectorAll("body > input[type='text']")[0];
	const button = document.querySelectorAll("body > button");
	const pre = document.querySelectorAll("body > pre")[0];

	button[0].addEventListener("click", function(event){
		const ajax = new AJAX();
		ajax.debug = true;
	    ajax.method = 'GET';
	    ajax.action = './server.php';
	    ajax.params = `nome=${inputText.value}`;
	    ajax.success = function(value){
	    	pre.innerHTML += `${value}<br>`;
	    };
	    ajax.execute();
	});

	button[1].addEventListener("click", function(event){
		const ajax = new AJAX();
		ajax.debug = true;
	    ajax.method = 'POST';
	    ajax.action = './server.php';
	    ajax.params = {nome: inputText.value};
	    ajax.success = function(value){
	        pre.innerHTML += `${value}<br>`;
	    };
	    ajax.execute();
	});

	button[2].addEventListener("click", function(event){
		const ajax = new AJAX();
		ajax.debug = true;
	    ajax.method = 'PUT';
	    ajax.action = './server.php';
	    ajax.params = {nome: inputText.value};
	    ajax.success = function(value){
	        pre.innerHTML += `${value}<br>`;
	    };
	    ajax.execute();
	});

	button[3].addEventListener("click", function(event){
		const ajax = new AJAX();
		ajax.debug = true;
	    ajax.method = 'DELETE';
	    ajax.action = './server.php';
	    ajax.params = `/nome/${inputText.value}`;
	    ajax.success = function(value){
	        pre.innerHTML += `${value}<br>`;
	    };
	    ajax.execute();
	});

	button[4].addEventListener("click", function(event){
		const ajax = new AJAX();
		ajax.debug = true;
	    ajax.method = 'PATCH';
	    ajax.action = './server.php';
	    ajax.params = JSON.stringify({
			nome: inputText.value
		});
	    ajax.success = function(value){
	        pre.innerHTML += `${value}<br>`;
	    };
	    ajax.execute();
	});

	button[5].addEventListener("click", function(event){
		if(inputFile.files.length > 0){        
	        let data = new FormData();
	        for(var i = 0; i < inputFile.files.length; i++){            
	            data.append('arquivo[]', inputFile.files[i]);
	        }
	        const ajax = new AJAX();
	        ajax.debug = true;
		    ajax.method = 'POST';
		    ajax.action = './server.php';
		    ajax.params = data;
		    ajax.onload = function(){
		    	alert("Arquivo enviado.");
		    }
		    ajax.success = function(value){
		        pre.innerHTML += `${value}<br>`;
		    };
		    ajax.execute();
	    }else{
	    	alert("Não existem arquivos selecionados.");
	    }
	});

});

/*
	Brasil\Pernambuco
	Developer: Matheus Johann Araújo
	Data: 22/04/2018
	GitHub: https://github.com/matheusjohannaraujo  
*/

window.addEventListener("load", function(event){

	var inputFile = document.querySelectorAll("body > input[type='file']")[0];
	var inputText = document.querySelectorAll("body > input[type='text']")[0];
	var button = document.querySelectorAll("body > button");
	var pre = document.querySelectorAll("body > pre")[0];

	button[0].addEventListener("click", function(event){
		ajax = AJAX();
	    ajax.method = 'GET';
	    ajax.action = './server.php';
	    ajax.params = `nome=${inputText.value}`;
	    ajax.success = function(value){
	    	pre.innerHTML += `${value}<br>`;
	    };
	    console.dir(ajax);
	    ajax.execute();
	});

	button[1].addEventListener("click", function(event){
		ajax = AJAX();
	    ajax.method = 'POST';
	    ajax.action = './server.php';
	    ajax.params = `nome=${inputText.value}`;
	    ajax.success = function(value){
	        pre.innerHTML += `${value}<br>`;
	    };
	    console.dir(ajax);
	    ajax.execute();
	});

	button[2].addEventListener("click", function(event){
		if(inputFile.files.length > 0){        
	        var data = new FormData();
	        for(var i = 0; i < inputFile.files.length; i++){            
	            data.append('arquivo[]', inputFile.files[i]);
	        }
	        ajax = AJAX();
	        ajax.debug = true;
		    ajax.method = 'POST';
		    ajax.action = './server.php';
		    ajax.params = data;
		    ajax.beforeSend = function(i){
		        pre.innerHTML += `${i}º Carregando...<br>`;
		    };
		    ajax.onload = function(){
		    	alert("Arquivo enviado.");
		    }
		    ajax.success = function(value){
		        pre.innerHTML += `${value}<br>`;
		    };
		    console.dir(ajax);
		    ajax.execute();
	    }else{
	    	alert("Não existem arquivos selecionados.");
	    }
	});

});

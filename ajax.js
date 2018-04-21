/*
	Brasil\Pernambuco
	Developer: Matheus Johann Aráujo
	Data: 21/04/2018
	GitHub: https://github.com/matheusjohannaraujo
	Site: http://curriculo.totalh.net/matheusjohannaraujo    
*/

function AJAX(){
	var ajax = false;
	if(window.XMLHttpRequest){
		ajax = new XMLHttpRequest();
	}else if(window.ActiveXObject){
	   	try{
	       	ajax = new ActiveXObject("Msxml2.XMLHTTP");
	   	}catch(e){
	       	ajax = new ActiveXObject("Microsoft.XMLHTTP");
	   	}
	}
	
	if((typeof ajax) == "object"){
		ajax.debug = false;
		ajax.method = 'POST';
		ajax.action = '';
		ajax.params = '';
		ajax.async = true;
		ajax.beforeSend = function(i){};
		ajax.success = function(data){};
		ajax.loading = function(i){
			if(ajax.debug)
				console.log("Loading: " + i + "%");	
		};
		ajax.onprogress = function(event){
			ajax.loading(((event.loaded * 100) / event.total));
		};
		ajax.upload.loading = function(i){
			if(ajax.debug)
				console.log("Upload loading: " + i + "%");
		};
		var count1 = 0, count2 = 0;
		ajax.upload.onprogress = function(event){
			count2 = (((event.loaded * 100) / event.total).toFixed(2));
			if(count1 != count2){
				count1 = count2;
				ajax.upload.loading(count1);
			}			
	    };
	    ajax.upload.onload = function(){
	    	if(ajax.debug)
				console.log("Upload Realizado!");
		};
		ajax.upload.onerror = function(){
			console.log("Erro no upload!");
		};
	    ajax.onloadstart = function(){
	    	if(ajax.debug)
				console.log("Carregamento dos dados começou!");
		};
		ajax.onloadend = function(){
			if(ajax.debug)
				console.log("Carregamento dos dados terminou!");
		};
	    ajax.onload = function(){
	    	if(ajax.debug)
	    		console.log("Dados enviados!");
	    };
	    ajax.onerror = function(){
			console.log("Erro!");
		};
		ajax.onabort = function(){
			console.log("Abortado!");
		};
		var count0 = 0;
		ajax.onreadystatechange = function(){
			if(count0 != ajax.readyState && ajax.readyState <= 4){
				count0 = ajax.readyState;
				if(ajax.debug){
					console.log("ReadyState: " + count0);
				}
				ajax.beforeSend(count0);
			}
			if(ajax.readyState == 4 && ajax.status == 200){
				var data = '';
				if(ajax.responseText){
					data = ajax.responseText;
				}
				if(ajax.responseXML){
					data = ajax.responseXML;
				}
				data = data.trim();
				if(ajax.debug){
					console.log("Recebido: " + data);
				}
				setTimeout(function(){								
					ajax.success(data);
				}, 500);			
			}
		};
	}
	ajax.execute = function(){
		if(ajax.method == 'GET' && (typeof ajax.params) != 'object'){
			ajax.open(ajax.method, ajax.action + "?" + ajax.params, ajax.async);
		    ajax.send(null);
		}else if(ajax.method == 'POST' || ajax.method == 'PUT'){
		   	ajax.open(ajax.method, ajax.action, ajax.async);
		   	if((typeof ajax.params) != 'object'){
		       	ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		    }else{
		    	ajax.setRequestHeader("Cache-Control", "no-cache");
		    }
		    ajax.send(ajax.params);
		}
	}

    return ajax;
}
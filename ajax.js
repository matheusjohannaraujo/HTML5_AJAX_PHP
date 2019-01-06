/*
	Brasil\Pernambuco
	Developer: Matheus Johann Ara�jo
	Data: 22/04/2018
	Bitbucket: https://bitbucket.org/matheusjohannaraujo/html5_ajax_php/
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
		ajax.user = null;
		ajax.pass = null;
		ajax.beforeSend = function(i){}
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
				console.log("Carregando os dados!");
		};
		ajax.onloadend = function(){
			if(ajax.debug)
				console.log("Carregamento dos dados terminou!");
		};
	    ajax.onload = function(){
	    	if(ajax.debug)
	    		console.log("Dados enviados!");
	    };
	    ajax.onerror = function(e){
			console.log("Erro na requisição, refazendo-a...");
			console.log(e);
			setTimeout(function(){
				ajax.execute();
			}, 10000);
		};
		ajax.onabort = function(){
			console.log("Abortado!");
		};
		ajax.formDataToJson = function(formData) {
			let object = {};
			formData.forEach(function(value, key){
				object[key] = value;
			});
			return JSON.parse(JSON.stringify(object));
		};
		ajax.jsonToString = function(object) {
			let str = "";
			Object.keys(ajax.params).forEach(key => str += `${key}=${ajax.params[key]}&`);
			return str.slice(0, str.length -1);
		};
		ajax.jsonToFormData = function(object) {
			const formData = new FormData();
			Object.keys(object).forEach(key => formData.append(key, object[key]));
			return formData;
		};
		ajax.paramsSetType = function(){
			if(ajax.debug)
				console.log("Type params: " + (typeof ajax.params));
			if(ajax.method == "GET"){
				if((typeof ajax.params) == 'object'){
					if(ajax.params instanceof FormData){
						ajax.params = ajax.formDataToJson(ajax.params);
						ajax.params = ajax.jsonToString(ajax.params);
					}else{
						ajax.params = ajax.jsonToString(ajax.params);
					}
				}
				ajax.params = "?" + ajax.params;
			}else if(ajax.method == 'POST' || ajax.method == 'PUT'){
				if((typeof ajax.params) == 'object' && !(ajax.params instanceof FormData)){
					ajax.params = ajax.jsonToFormData(ajax.params);
				}
			}			
		};
		ajax.console = function(){
			console.log(ajax);
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
				try{data = JSON.parse(data);}catch(e){}
				if(ajax.debug){
					console.log("Recebido: ", data);
				}								
				ajax.success(data);
			}
		};
	}
	ajax.execute = function(){
		try{
			if(ajax.debug)
				ajax.console();
			ajax.paramsSetType();
			if(ajax.method == 'GET' || ajax.method == 'DELETE'){
				ajax.open(ajax.method, ajax.action + ajax.params, ajax.async, ajax.user, ajax.pass);
				ajax.send(null);
			}else if(ajax.method == 'POST' || ajax.method == 'PUT' || ajax.method == 'PATCH'){
				ajax.open(ajax.method, ajax.action, ajax.async, ajax.user, ajax.pass);
				if((typeof ajax.params) == 'string'){
					ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				}else{
					ajax.setRequestHeader("Cache-Control", "no-cache");
				}
				ajax.send(ajax.params);
			}
		}catch(error){
			console.log(error);
			ajax.onerror();
		}		
	}
    return ajax;
}
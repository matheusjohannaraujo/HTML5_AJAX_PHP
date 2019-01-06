// Brasil\Pernambuco
// Developer: Matheus Johann Araújo
// Date: 2019-01-06
// Bitbucket: https://bitbucket.org/matheusjohannaraujo/html5_ajax_php/

function AJAX(){
	let ajax = false;
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
		ajax.dump = {
			data: [],
			add: function(val){
				this.data.push(val);
			}			
		};
		ajax.method = 'POST';
		ajax.action = '';
		ajax.params = null;
		ajax.async = true;
		ajax.user = null;
		ajax.pass = null;
		ajax.sendTypeJson = false;
		ajax.statusCode = function(i){
			if(ajax.debug)
				ajax.dump.add(["Status Code", ajax.status]);
		}
		ajax.beforeSend = function(i){
			if(ajax.debug)
				ajax.dump.add(["ReadyState", i]);
		};
		ajax.success = function(data){
			if(ajax.debug)
				ajax.dump.add(["Recebido", data]);
		};
		ajax.loading = function(i){
			if(ajax.debug)
				ajax.dump.add(["Loading", i + "%"]);
		};
		ajax.onprogress = function(event){
			ajax.loading(((event.loaded * 100) / event.total));
		};
		ajax.upload.loading = function(i){
			if(ajax.debug)
				ajax.dump.add(["Upload loading", i + "%"]);
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
				ajax.dump.add(["Upload realizado!"]);
		};
		ajax.upload.onerror = function(){
			ajax.dump.add(["Erro no upload!"]);
		};
	    ajax.onloadstart = function(){
	    	if(ajax.debug)
				ajax.dump.add(["Carregando os dados!"]);
		};
		ajax.onloadend = function(){
			if(ajax.debug)
				ajax.dump.add(["Carregamento dos dados terminou!"]);
		};
	    ajax.onload = function(){
	    	if(ajax.debug)
				ajax.dump.add(["Dados enviados!"]);
	    };
	    ajax.onerror = function(e){
			ajax.dump.add(["Erro na requisição, refazendo-a...", e]);
			setTimeout(function(){
				ajax.execute();
			}, 10000);
		};
		ajax.onabort = function(){
			ajax.dump.add(["Abortado!"]);
		};
		ajax.formDataToJson = function(formData) {
			let object = {};
			formData.forEach(function(value, key){
				object[key] = value;
				console.log(value);
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
				ajax.dump.add(["Type Params", typeof ajax.params]);
			if(ajax.method == "GET"){
				if((typeof ajax.params) == 'object'){
					if(ajax.params instanceof FormData){
						ajax.params = ajax.formDataToJson(ajax.params);
						ajax.params = ajax.jsonToString(ajax.params);
					}else{
						ajax.params = ajax.jsonToString(ajax.params);
					}
				}
				if(ajax.params != null || ajax.params != '')
					ajax.params = "?" + ajax.params;
			}			
		};
		ajax.console = function(){
			console.log(ajax);
		};
		var count0 = 0;
		ajax.onreadystatechange = function(){
			ajax.statusCode(ajax.status);
			if(count0 != ajax.readyState && ajax.readyState <= 4){
				count0 = ajax.readyState;
				ajax.beforeSend(count0);
			}			
			if(ajax.readyState == 4){
				var data = '';
				if(ajax.responseText)
					data = ajax.responseText;
				if(ajax.responseXML)
					data = ajax.responseXML;
				data = data.trim();
				try{data = JSON.parse(data);}catch(e){}
				if(!(ajax.status == 200 || ajax.status == 201))
					ajax.dump.add(["Status Code", ajax.status, "https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml"]);
				ajax.success(data);
			}
		};
	}
	ajax.execute = function(){
		try{
			ajax.paramsSetType();
			if(ajax.method == 'GET' || ajax.method == 'DELETE'){
				ajax.open(ajax.method, ajax.action + ajax.params, ajax.async, ajax.user, ajax.pass);
				ajax.send(null);
			}else if(ajax.method == 'POST' || ajax.method == 'PUT' || ajax.method == 'PATCH'){
				ajax.open(ajax.method, ajax.action, ajax.async, ajax.user, ajax.pass);
				if(typeof ajax.params == 'string'){
					ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				}else if(typeof ajax.params == 'object' && !(ajax.params instanceof Array) && !(ajax.params instanceof FormData) && !(ajax.params instanceof Blob) && !(ajax.params instanceof Int8Array)){
					let params = ajax.jsonToString(ajax.params);
					if(!ajax.sendTypeJson && params.length <= (1024 * 1024)){
						ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
						ajax.params = params;
					}else{
						ajax.setRequestHeader('Content-Type', 'application/json');
						ajax.setRequestHeader("Cache-Control", "no-cache");
						ajax.params = JSON.stringify(ajax.params);
					}
				}
				ajax.send(ajax.params);
			}
		}catch(error){
			ajax.onerror(error);
		}finally{
			if(ajax.debug)
				ajax.console();
		}
	}
    return ajax;
}
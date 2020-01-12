// Brasil\Pernambuco
// Developer: Matheus Johann Araujo
// Date: 12-01-2020
// GitHub: https://github.com/matheusjohannaraujo/lib_ajax_and_form_async

function AJAX(method = 'POST', action = './', params = {}, success = data => data, async = true, debug = false, sendTypeJson = false, user = null, pass = null){
	let ajax = false
	if(window.XMLHttpRequest){
		ajax = new XMLHttpRequest()
	}else if(window.ActiveXObject){
	   	try{
	       	ajax = new ActiveXObject("Msxml2.XMLHTTP")
	   	}catch(e){
	       	ajax = new ActiveXObject("Microsoft.XMLHTTP")
	   	}
	}	
	if(typeof ajax == "object"){		
		ajax.debug = debug
		ajax.dump = {
			data: [],
			add: function(val){
				this.data.push(val)
			}
		}
		ajax.method = method
		ajax.action = action
		ajax.params = params
		ajax.async = async
		ajax.user = user
		ajax.pass = pass
		ajax.sendTypeJson = sendTypeJson
		ajax.statusCode = i => {
			if(ajax.debug)
				ajax.dump.add(["Status Code", ajax.status])
		}
		ajax.beforeSend = i => {
			if(ajax.debug)
				ajax.dump.add(["ReadyState", i])
		}
		ajax.success = success
		ajax.loading = i => {
			if(ajax.debug)
				ajax.dump.add(["Loading", i + "%"])
		}
		ajax.onprogress = event => {
			ajax.loading(((event.loaded * 100) / event.total))
		}
		ajax.upload.loading = i => {
			if(ajax.debug)
				ajax.dump.add(["Upload loading", i + "%"])
		}
		var count1 = 0, count2 = 0
		ajax.upload.onprogress = event => {
			count2 = (((event.loaded * 100) / event.total).toFixed(2))
			if(count1 != count2){
				count1 = count2
				ajax.upload.loading(count1)
			}			
	    }
	    ajax.upload.onload = () => {
	    	if(ajax.debug)
				ajax.dump.add(["Upload realizado!"])
		}
		ajax.upload.onerror = () => {
			ajax.dump.add(["Erro no upload!"])
		}
	    ajax.onloadstart = () => {
	    	if(ajax.debug)
				ajax.dump.add(["Carregando os dados!"])
		}
		ajax.onloadend = () => {
			if(ajax.debug)
				ajax.dump.add(["Carregamento dos dados terminou!"])
		}
	    ajax.onload = () => {
	    	if(ajax.debug)
				ajax.dump.add(["Dados enviados!"])
	    }
	    ajax.onerror = e => {
			ajax.dump.add(["Erro na requisição, refazendo-a...", e])
			setTimeout(ajax.run, 10000)
		}
		ajax.onabort = () => {
			ajax.dump.add(["Abortado!"])
		}
		ajax.formDataToJson = formData => {
			let object = {}
			formData.forEach(function(value, key){
				object[key] = value
				console.log(value)
			})
			return JSON.parse(JSON.stringify(object))
		}
		ajax.jsonToString = object => {
			let str = ""
			Object.keys(ajax.params).forEach(key => str += `${key}=${ajax.params[key]}&`)
			return str.slice(0, str.length -1)
		}
		ajax.paramsSetType = () => {
			if(ajax.debug)
				ajax.dump.add(["Type Params", typeof ajax.params])
			if(ajax.method == "GET"){
				if(typeof ajax.params == 'object'){
					if(ajax.params instanceof FormData){
						ajax.params = ajax.formDataToJson(ajax.params)
						ajax.params = ajax.jsonToString(ajax.params)
					}else{
						ajax.params = ajax.jsonToString(ajax.params)
					}
				}
				if(ajax.params != null || ajax.params != '')
					ajax.params = "?" + ajax.params
			}			
		}
		ajax.console = () => {
			console.log(ajax)
		}
		var count0 = 0
		ajax.onreadystatechange = () => {
			ajax.statusCode(ajax.status)
			if(count0 != ajax.readyState && ajax.readyState <= 4){
				count0 = ajax.readyState
				ajax.beforeSend(count0)
			}			
			if(ajax.readyState == 4){
				var data = ''
				if(ajax.responseText)
					data = ajax.responseText
				if(ajax.responseXML)
					data = ajax.responseXML
				data = data.trim();
				try{ data = JSON.parse(data) }catch(e){}
				if(!(ajax.status == 200 || ajax.status == 201))
					ajax.dump.add(["Status Code", ajax.status, "https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml"])
				if(ajax.debug)
					ajax.dump.add(["Recebido", data])
				ajax.success(data)
			}
		}
	}
	ajax.run = () => {
		try{
			ajax.paramsSetType()
			if(ajax.method == 'GET' || ajax.method == 'DELETE'){
				ajax.open(ajax.method, ajax.action + ajax.params, ajax.async, ajax.user, ajax.pass)
				ajax.send(null)
			}else if(ajax.method == 'POST' || ajax.method == 'PUT' || ajax.method == 'PATCH'){
				ajax.open(ajax.method, ajax.action, ajax.async, ajax.user, ajax.pass)
				if(typeof ajax.params == 'string'){
					ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				}else if(typeof ajax.params == 'object' && !(ajax.params instanceof Array) && !(ajax.params instanceof FormData) && !(ajax.params instanceof Blob) && !(ajax.params instanceof Int8Array)){
					if(!ajax.sendTypeJson){
						ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
						ajax.params = ajax.jsonToString(params)
					}else{
						ajax.setRequestHeader('Content-Type', 'application/json')
						ajax.setRequestHeader("Cache-Control", "no-cache")
						ajax.params = JSON.stringify(ajax.params)
					}
				}
				ajax.send(ajax.params)
			}
		}catch(err){
			ajax.onerror(err)
		}finally{
			if(ajax.debug)
				ajax.console()
		}
	}	
    return ajax
}

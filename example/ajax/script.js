
window.addEventListener("load", event => {

	const route = "backend.php"
	
	btnGet.addEventListener("click", event => {
		AJAX("GET", route, `nome=${inputText.value}`, value => {
			result.innerHTML += `${value}<hr>`
		}, true).run()
	})

	btnPost.addEventListener("click", event => {
		let ajax = AJAX()
		ajax.debug = true
	    ajax.method = "POST"
	    ajax.action = route
	    ajax.params = { nome: inputText.value }
	    ajax.success = value => {
	        result.innerHTML += `${value}<hr>`
	    }
	    ajax.run()
	})

	btnPut.addEventListener("click", event => {
		let ajax = AJAX()
		ajax.debug = true
	    ajax.method = "PUT"
	    ajax.action = route
	    ajax.params = { nome: inputText.value }
	    ajax.success = value => {
	        result.innerHTML += `${value}<hr>`
	    }
	    ajax.run()
	})

	btnDelete.addEventListener("click", event => {
		let ajax = AJAX()
		ajax.debug = true
	    ajax.method = "DELETE"
	    ajax.action = route
	    ajax.params = `/nome/${inputText.value}`
	    ajax.success = value => {
	        result.innerHTML += `${value}<hr>`
	    }
	    ajax.run()
	})

	btnPatch.addEventListener("click", event => {
		let ajax = AJAX()
		ajax.debug = true
	    ajax.method = "PATCH"
	    ajax.action = route
	    ajax.params = JSON.stringify({
			nome: inputText.value
		})
	    ajax.success = value => {
	        result.innerHTML += `${value}<hr>`
	    }
	    ajax.run()
	})

	btnPostFiles.addEventListener("click", event => {
		if(inputFile.files.length > 0){        
	        let data = new FormData()
	        for(var i = 0; i < inputFile.files.length; i++){            
	            data.append("arquivo[]", inputFile.files[i])
	        }
	        let ajax = AJAX()
	        ajax.debug = true
		    ajax.method = "POST"
		    ajax.action = route
		    ajax.params = data
		    ajax.onload = () => {
		    	alert("Arquivo enviado.")
		    }
		    ajax.success = value => {
		        result.innerHTML += `${value}<hr>`
		    }
		    ajax.run()
	    }else{
	    	alert("Não existem arquivos selecionados.")
	    }
	})
	
})

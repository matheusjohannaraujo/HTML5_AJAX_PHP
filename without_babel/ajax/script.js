// Brasil\Pernambuco
// Developer: Matheus Johann Araujo
// Date: 11-01-2020
// GitHub: https://github.com/matheusjohannaraujo/lib_ajax_and_form_async

window.addEventListener("load", function(event){
	const inputFile = document.querySelector(`input[type='file']`)
	const inputText = document.querySelector(`input[type='text']`)
	const button = document.querySelectorAll("button")
	const pre = document.querySelector("pre")

	button[0].addEventListener("click", function(event){
		AJAX('GET', './server.php', `nome=${inputText.value}`, value => {
			pre.innerHTML += `${value}<hr>`
		}, true).run()
	})

	button[1].addEventListener("click", function(event){
		const ajax = AJAX()
		ajax.debug = true
	    ajax.method = 'POST'
	    ajax.action = './server.php'
	    ajax.params = { nome: inputText.value }
	    ajax.success = value => {
	        pre.innerHTML += `${value}<hr>`
	    }
	    ajax.run()
	})

	button[2].addEventListener("click", function(event){
		const ajax = AJAX()
		ajax.debug = true
	    ajax.method = 'PUT'
	    ajax.action = './server.php'
	    ajax.params = { nome: inputText.value }
	    ajax.success = value => {
	        pre.innerHTML += `${value}<hr>`
	    }
	    ajax.run()
	})

	button[3].addEventListener("click", function(event){
		const ajax = AJAX()
		ajax.debug = true
	    ajax.method = 'DELETE'
	    ajax.action = './server.php'
	    ajax.params = `/nome/${inputText.value}`
	    ajax.success = value => {
	        pre.innerHTML += `${value}<hr>`
	    }
	    ajax.run()
	})

	button[4].addEventListener("click", function(event){
		const ajax = AJAX()
		ajax.debug = true
	    ajax.method = 'PATCH'
	    ajax.action = './server.php'
	    ajax.params = JSON.stringify({
			nome: inputText.value
		})
	    ajax.success = value => {
	        pre.innerHTML += `${value}<hr>`
	    }
	    ajax.run()
	})

	button[5].addEventListener("click", function(event){
		if(inputFile.files.length > 0){        
	        let data = new FormData()
	        for(var i = 0; i < inputFile.files.length; i++){            
	            data.append('arquivo[]', inputFile.files[i])
	        }
	        const ajax = AJAX()
	        ajax.debug = true
		    ajax.method = 'POST'
		    ajax.action = './server.php'
		    ajax.params = data
		    ajax.onload = () => {
		    	alert("Arquivo enviado.")
		    }
		    ajax.success = value => {
		        pre.innerHTML += `${value}<hr>`
		    }
		    ajax.run()
	    }else{
	    	alert("Não existem arquivos selecionados.")
	    }
	})
})
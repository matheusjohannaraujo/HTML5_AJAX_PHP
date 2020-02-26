// Brasil\Pernambuco
// Developer: Matheus Johann Araujo
// Date: 25-02-2020
// GitHub: https://github.com/matheusjohannaraujo/lib_ajax_and_form_async
// form html sync for async -> https://pqina.nl/blog/async-form-posts-with-a-couple-lines-of-vanilla-javascript/

function FormAsync(){
  let formAsync = {}    
  formAsync.callback = arguments[0] ? arguments[0] : console.log
  formAsync.debug = arguments[1] ? arguments[1] : false

  formAsync.getInputs = function($element){
      let vetInput = false      
      if($element){
          vetInput = []
          let tipoInput = ["input", "textarea", "select"]
          for (let i = 0; i < tipoInput.length; i++) {
            let input = $element.querySelectorAll(tipoInput[i])
            if(input.length > 0){
              for (let j = 0; j < input.length; j++) {
                vetInput.push(input[j])
              }
            }
          }
      }        
      return vetInput
  }
  
  formAsync.getFormData = function($element, method){
      let formData = new FormData()
      $element.forEach(e => {
          let name = e.name + ""
          let type = e.type + ""
          if(name.length == 0){
              name = "input_" + Math.floor(Math.random() * 10000000)
          }
          if(type.length > 0){
              if(type == "file"){
                  if(method != "GET" && method != "DELETE"){
                      let size = e.files.length
                      if(size == 1){
                          formData.append(name, e.files[0])
                      }else if(size > 1){
                          if(name.indexOf("[]") == -1){
                              name += "[]";
                          }
                          for (let i = 0; i < size; i++) {
                              formData.append(name, e.files[i])
                          }                    
                      }
                  }                    
              }else{
                  formData.append(name, e.value)
              }
          }
      })
      return formData
  }

  formAsync.capture = function(){
      try {
          let event = arguments[0]
          let self = event.target
          let method = arguments[1]
          let action = arguments[2]
          let debug = arguments[3]
          let call = arguments[4]
          let ajax = new AJAX()
          ajax.debug = debug
          ajax.method = method
          ajax.action = action
          ajax.success = call
          let $inputs = formAsync.getInputs(self)
          let formData = false
          if($inputs){
              formData = formAsync.getFormData($inputs, method)
          }
          ajax.params = formData
          if(debug){
              console.log("self:", self)
              console.log("$inputs:", $inputs)
              if(formData){
                  let vetFormData = []
                  for (let pair of formData.entries()) {
                      vetFormData.push({
                          key: pair[0], 
                          value: pair[1]
                      })
                  }
                  console.log("formData:", vetFormData)
                  vetFormData = null
                  formData = null
              }
          }
          ajax.run()
          event.preventDefault()
          event.stopPropagation()
          return false
      } catch (error) {
          return formAsync
      }        
  }

  formAsync.params = function(args){
      args[1] = (args[1] ? args[1] : args[0].target.method).toUpperCase()
      args[2] = args[2] ? args[2] : args[0].target.action
      args[3] = args[3] ? args[3] : formAsync.debug
      let call = eval(args[0].target.getAttribute("callback"))
      args[4] = call ? call : formAsync.callback
      return formAsync.capture(args[0], args[1], args[2], args[3], args[4])
  }

  formAsync.get = function(){
      arguments[1] = "GET"
      return formAsync.params(arguments)
  }

  formAsync.post = function(){
      arguments[1] = "POST"
      return formAsync.params(arguments)
  }

  formAsync.put = function(){
      arguments[1] = "PUT"
      return formAsync.params(arguments)
  }

  formAsync.patch = function(){
      arguments[1] = "PATCH"
      return formAsync.params(arguments)
  }

  formAsync.delete = function(){
      arguments[1] = "DELETE"
      return formAsync.params(arguments)
  }

  return formAsync
}

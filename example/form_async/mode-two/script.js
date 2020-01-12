
window.addEventListener("load", (event) => {

  let fa = FormAsync()
  fa.callback = value => result.innerHTML += `${value}<hr>`
  //form.addEventListener("submit", fa.get)
  form.addEventListener("submit", fa.post)
  //form.addEventListener("submit", fa.put)
  //form.addEventListener("submit", fa.patch)
  //form.addEventListener("submit", fa.delete)

})

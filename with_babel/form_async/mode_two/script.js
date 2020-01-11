"use strict";

// Brasil\Pernambuco
// Developer: Matheus Johann Araujo
// Date: 11-01-2020
// GitHub: https://github.com/matheusjohannaraujo/lib_ajax_and_form_async
window.addEventListener("load", function (e) {
  var fa = FormAsync();

  fa.callback = function (value) {
    return pre.innerHTML += "".concat(value, "<hr>");
  }; //form.addEventListener("submit", fa.get)


  form.addEventListener("submit", fa.post); //form.addEventListener("submit", fa.put)
  //form.addEventListener("submit", fa.patch)
  //form.addEventListener("submit", fa.delete)
});
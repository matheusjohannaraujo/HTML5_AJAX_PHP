"use strict";

// Brasil\Pernambuco
// Developer: Matheus Johann Araujo
// Date: 25-02-2020
// GitHub: https://github.com/matheusjohannaraujo/lib_ajax_and_form_async
// form html sync for async -> https://pqina.nl/blog/async-form-posts-with-a-couple-lines-of-vanilla-javascript/

function FormAsync() {
  var formAsync = {};
  formAsync.callback = arguments[0] ? arguments[0] : console.log;
  formAsync.debug = arguments[1] ? arguments[1] : false;

  formAsync.getInputs = function ($element) {
    var vetInput = false;

    if ($element) {
      vetInput = [];
      var tipoInput = ["input", "textarea", "select"];

      for (var i = 0; i < tipoInput.length; i++) {
        var input = $element.querySelectorAll(tipoInput[i]);

        if (input.length > 0) {
          for (var j = 0; j < input.length; j++) {
            vetInput.push(input[j]);
          }
        }
      }
    }

    return vetInput;
  };

  formAsync.getFormData = function ($element, method) {
    var formData = new FormData();
    $element.forEach(function (e) {
      var name = e.name + "";
      var type = e.type + "";

      if (name.length == 0) {
        name = "input_" + Math.floor(Math.random() * 10000000);
      }

      if (type.length > 0) {
        if (type == "file") {
          if (method != "GET" && method != "DELETE") {
            var size = e.files.length;

            if (size == 1) {
              formData.append(name, e.files[0]);
            } else if (size > 1) {
              name += "[]";

              for (var i = 0; i < size; i++) {
                formData.append(name, e.files[i]);
              }
            }
          }
        } else {
          formData.append(name, e.value);
        }
      }
    });
    return formData;
  };

  formAsync.capture = function () {
    try {
      var event = arguments[0];
      var self = event.target;
      var method = arguments[1];
      var action = arguments[2];
      var debug = arguments[3];
      var call = arguments[4];
      var ajax = new AJAX();
      ajax.debug = debug;
      ajax.method = method;
      ajax.action = action;
      ajax.success = call;
      var $inputs = formAsync.getInputs(self);
      var formData = false;

      if ($inputs) {
        formData = formAsync.getFormData($inputs, method);
      }

      ajax.params = formData;

      if (debug) {
        console.log("self:", self);
        console.log("$inputs:", $inputs);

        if (formData) {
          var vetFormData = [];
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = formData.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var pair = _step.value;
              vetFormData.push({
                key: pair[0],
                value: pair[1]
              });
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          console.log("formData:", vetFormData);
          vetFormData = null;
          formData = null;
        }
      }

      ajax.run();
      event.preventDefault();
      event.stopPropagation();
      return false;
    } catch (error) {
      return formAsync;
    }
  };

  formAsync.params = function (args) {
    args[1] = (args[1] ? args[1] : args[0].target.method).toUpperCase();
    args[2] = args[2] ? args[2] : args[0].target.action;
    args[3] = args[3] ? args[3] : formAsync.debug;
    var call = eval(args[0].target.getAttribute("callback"));
    args[4] = call ? call : formAsync.callback;
    return formAsync.capture(args[0], args[1], args[2], args[3], args[4]);
  };

  formAsync.get = function () {
    arguments[1] = "GET";
    return formAsync.params(arguments);
  };

  formAsync.post = function () {
    arguments[1] = "POST";
    return formAsync.params(arguments);
  };

  formAsync.put = function () {
    arguments[1] = "PUT";
    return formAsync.params(arguments);
  };

  formAsync.patch = function () {
    arguments[1] = "PATCH";
    return formAsync.params(arguments);
  };

  formAsync.delete = function () {
    arguments[1] = "DELETE";
    return formAsync.params(arguments);
  };

  return formAsync;
}

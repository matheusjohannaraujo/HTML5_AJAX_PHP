<?php

// Brasil\Pernambuco
// Developer: Matheus Johann Araujo
// Date: 11-01-2020
// GitHub: https://github.com/matheusjohannaraujo/lib_ajax_and_form_async

if(!empty($_GET)){
	echo "GET: ";
	var_export($_GET);
}

if(!empty($_POST)){
	echo "POST: ";
	var_export($_POST);
}

if(!empty($_FILES)){
	echo "FILES: ";
	var_export($_FILES);
}

if($_SERVER['REQUEST_METHOD'] == 'PUT') {
	echo "PUT: ";
	$_PUT = "";
	$putData = fopen("php://input", "r");
	while($data = fread($putData, 1024)){
		$_PUT .= $data;
	}
	fclose($putData);
	var_export($_PUT);
}

if($_SERVER['REQUEST_METHOD'] == 'DELETE') {
	echo "DELETE: ";
	$_DELETE = $_SERVER['PATH_INFO'];
	var_export($_DELETE);
}

if($_SERVER['REQUEST_METHOD'] == 'PATCH') {
	echo "PATCH: ";
	$_PATCH = (array) json_decode(file_get_contents('php://input'));
	var_export($_PATCH);
}
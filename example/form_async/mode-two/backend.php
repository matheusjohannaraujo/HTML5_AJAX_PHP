<?php

if(!empty($_GET)){
	echo "GET: ";
	var_export($_GET);
	echo "\r\n";
}

if(!empty($_POST)){
	echo "POST: ";
	var_export($_POST);
	echo "\r\n";
}

if(!empty($_FILES)){
	echo "FILES: ";
	var_export($_FILES);
	echo "\r\n";
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
	echo "\r\n";
}

if($_SERVER['REQUEST_METHOD'] == 'DELETE') {
	echo "DELETE: ";
	$_DELETE = $_SERVER['PATH_INFO'];
	var_export($_DELETE);
	echo "\r\n";
}

if($_SERVER['REQUEST_METHOD'] == 'PATCH') {
	echo "PATCH: ";
	$_PATCH = (array) json_decode(file_get_contents('php://input'));
	var_export($_PATCH);
	echo "\r\n";
}

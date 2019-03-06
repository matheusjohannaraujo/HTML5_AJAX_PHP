<?php

if(!empty($_GET)){
	echo "GET: ";
	var_dump($_GET);
}

if(!empty($_POST)){
	echo "POST: ";
	var_dump($_POST);
}

if(!empty($_FILES)){
	echo "FILES: ";
	var_dump($_FILES);
}

if($_SERVER['REQUEST_METHOD'] == 'PUT') {
	echo "PUT: ";
	$_PUT = "";
	$putData = fopen("php://input", "r");
	while($data = fread($putData, 1024)){
		$_PUT .= $data;
	}
	fclose($putData);
	var_dump($_PUT);
}

if($_SERVER['REQUEST_METHOD'] == 'DELETE') {
	echo "DELETE: ";
	$_DELETE = $_SERVER['PATH_INFO'];
	var_dump($_DELETE);
}

if($_SERVER['REQUEST_METHOD'] == 'PATCH') {
	echo "PATCH";
}

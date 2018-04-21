<?php

if(($nome = $_GET['nome'] ?? false)){
	echo "GET: Olá, {$nome}";
}

if(($nome = $_POST['nome'] ?? false)){
	echo "POST: Olá, {$nome}";
}

if(($arquivo = $_FILES['arquivo'] ?? false)){
	echo "FILES: ";
	var_export($arquivo);
}

?>

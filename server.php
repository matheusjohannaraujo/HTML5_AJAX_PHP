<?php 

/*
	Brasil\Pernambuco
	Developer: Matheus Johann Araújo
	Data: 21/04/2018
	GitHub: https://github.com/matheusjohannaraujo
	Site: http://curriculo.totalh.net/matheusjohannaraujo    
*/

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

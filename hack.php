
<?php
	//header("Content-Type: text/html; charset=UTF-8",true);
header('Content-type: application/json');



echo lista();

function lista()
{

	$con = mysql_connect('localhost', 'root', 'astral');
	mysql_select_db('dbMod_atividadeSite', $con);
	mysql_set_charset('utf8');

	$sql = "SELECT * FROM indicadores";

	$query = mysql_query($sql);
	$arr = array();

	while ($dados = mysql_fetch_assoc($query)) {
		$arr[] = $dados;
	}

	return json_encode($arr);
}
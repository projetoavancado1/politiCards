<?php


    require_once 'config/mysql_connection.php';

    $name       = $_POST["nomecompleto"];
    $password   = $_POST["senha"];
    $email      = $_POST["email"];

    $formato_json = '{"nome": "'.$name.'", "email": "'.$email.'", "userType":1}';

    echo $formato_json;

?>

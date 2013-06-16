<?php

      function getConn(){
        return new PDO('mysql:host=localhost;dbname=politiCards',
        'dev','pas20122',array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
       }

?>

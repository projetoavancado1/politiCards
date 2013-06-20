<?php
	require 'config/mysql_connection.php';

	function getUsers(){
		$stmt = getConn()->query("SELECT * FROM users");
		$users = $stmt->fetchAll(PDO::FETCH_OBJ);
		echo json_encode($users);
	}

	function getUsersByID($id){
		$conn = getConn();
		$sql = "SELECT * FROM users WHERE id = :id";
		$stmt = $conn->prepare($sql);
		$stmt->bindParam("id",$id);
		$stmt->execute();
		$user = $stmt->fetchObject();

		//Verfica se foi retornada uma categoria do banco
		$user or die ('Inexistent Object');

		echo json_encode($user);
	}

	function createUser(){
		$request = \Slim\Slim::getInstance()->request();
		$user = json_decode($request->getBody());
		$sql = "INSERT INTO users (nome,email,passwd,datebirth,gender,userType) 
					values (:nome,:email,:passwd,:datebirth,:gender,:userType) ";

		$conn = getConn();
		$stmt = $conn->prepare($sql);
		$stmt->bindParam("nome",$user->nome);
		$stmt->bindParam("email",$user->email);
		$stmt->bindParam("passwd",$user->passwd);
		$stmt->bindParam("datebirth",$user->datebirth);
		$stmt->bindParam("gender",$user->gender);
		$stmt->bindParam("userType",$user->userType);
		$stmt->execute();

		$user->id = $conn->lastInsertId();
		echo json_encode($user);
	}

	function updateUser($id){
		$request = \Slim\Slim::getInstance()->request();
		$user = json_decode($request->getBody());
		$sql = "UPDATE users SET nome=:nome, email=:email,passwd=:passwd,datebirth=:datebirth, 
					gender=:gender, userType=:userType 
					WHERE   id=:id";
		$conn = getConn();
		$stmt = $conn->prepare($sql);
		$stmt->bindParam("nome",$user->nome);
		$stmt->bindParam("email",$user->email);
		$stmt->bindParam("passwd",$user->passwd);
		$stmt->bindParam("datebirth",$user->datebirth);
		$stmt->bindParam("gender",$user->gender);
		$stmt->bindParam("userType",$user->userType);
		$stmt->bindParam("id",$id);
		$stmt->execute();

		echo json_encode($user);
	}

	function deleteUser($id){
		$sql = "DELETE FROM users WHERE id=:id";
		$conn = getConn();
		$stmt = $conn->prepare($sql);
		$stmt->bindParam("id",$id);
		$stmt->execute();
		echo "{'message':'User deleted'}";
	}

?>

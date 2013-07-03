<?php

require 'Slim/Slim.php';

$app = new Slim();

$app->get('/', function () {
		echo "PolitiCards REST API";
	});
$app->get('/users', 'getUsers');
$app->get('/login/:email/:passwd', 'validaLogin');
$app->get('/login/', 'teste');
$app->get('/users/:id',	'getUser');
$app->get('/users/search/:query', 'findByName');
$app->post('/users', 'addUser');
$app->put('/users/:id', 'updateUser');
$app->delete('/users/:id',	'deleteUser');

$app->run();

function getUsers() {	
	$sql = "select * FROM user ORDER BY name";
	try {
		$db = getConnection();		
		$stmt = $db->query($sql);  
		$users = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		// echo '{"users": ' . json_encode($users) . '}';
		echo json_encode($users);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function teste(){
	echo"teste";
}

function validaLogin($email,$passwd) {		
	$sql = "SELECT * FROM user WHERE email='$email' and passWord='$passwd';";
	try {
	   	$query = mysql_query($sql);
	   	$resultado = mysql_fetch_assoc($query);
	
	  	// Verifica se encontrou algum registro
	   	if (empty($resultado)) {
	   		  echo "nada";
	    	   // Nenhum registro foi encontrado 
	    	   return false;
		}else{
			echo"login e senha bateram";
			return "login e senha bateram";
		}
	}catch(PDOException $e) {
			echo '{"error":{"text":'. $e->getMessage() .'}}'; 
		}
	}



function getUser($id) {		
	$sql = "SELECT * FROM user WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$user = $stmt->fetchObject();  
		$db = null;
		echo json_encode($user); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function addUser() {	
	error_log('addUsers\n', 3, '/var/tmp/php.log');
	$request = Slim::getInstance()->request();
	$user = json_decode($request->getBody());	
	$sql = "INSERT INTO user (name, email, gender, birthday, passWord, profilePicture, userType) VALUES (:name, :email, :gender, :birthday, :passWord, :profilePicture, :userType)";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("name", $user->name);
		$stmt->bindParam("email", $user->email);
		$stmt->bindParam("gender", $user->gender);
		$stmt->bindParam("birthday", $user->birthday);
		$stmt->bindParam("passWord", $user->passWord);
		$stmt->bindParam("profilePicture", $user->profilePicture);		
		$stmt->bindParam("userType", $user->userType);		
		$stmt->execute();
		$user->id = $db->lastInsertId();
		$db = null;
		echo json_encode($user); 
	} catch(PDOException $e) {
		error_log($e->getMessage(), 3, '/var/tmp/php.log');
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function updateUser($id){
	$request = Slim::getInstance()->request();
	$body = $request->getBody();
	$user = json_decode($body);	
	$sql = "UPDATE user SET name=:name, email=:email, gender=:gender, birthday=:birthday, passWord=:passWord, profilePicture=:profilePicture, userType=:userType WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("name", $user->name);
		$stmt->bindParam("email", $user->email);
		$stmt->bindParam("gender", $user->gender);
		$stmt->bindParam("birthday", $user->birthday);
		$stmt->bindParam("passWord", $user->passWord);
		$stmt->bindParam("profilePicture", $user->profilePicture);		
		$stmt->bindParam("userType", $user->userType);		
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
		echo json_encode($user); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function deleteUser($id) {
	$sql = "DELETE FROM user WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function findByName($query) {
	$sql = "SELECT * FROM user WHERE UPPER(name) LIKE :query ORDER BY name";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$query = "%".$query."%";  
		$stmt->bindParam("query", $query);
		$stmt->execute();
		$users = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($users);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getConnection() {
	$dbhost="127.0.0.1";
	$dbuser="dev";
	$dbpass="pas20122";
	$dbname="politiCards";
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $dbh;
}

?>

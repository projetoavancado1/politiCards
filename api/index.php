<?php
session_start();

require 'Slim/Slim.php';

$app = new Slim();

$app->get('/', function () {
		echo "PolitiCards REST API";
	});
$app->get('/users', 'getUsers');
$app->get('/users/:id',	'getUser');
$app->get('/users/search/:query', 'findByName');
$app->post('/users', 'addUser');
$app->put('/users/:id', 'updateUser');
$app->delete('/users/:id',	'deleteUser');
$app->post('/login', 'login');
$app->get('/employees', authorize('user'), 'getEmployees');
$app->get('/employees/:id',	authorize('user'),'getEmployee');
$app->get('/employees/:id/reports',	authorize('admin'),'getReports');
$app->get('/employees/search/:query', authorize('user'),'getEmployeesByName');
$app->get('/employees/modifiedsince/:timestamp', authorize('user'), 'findByModifiedDate');

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

function login() {
    if(!empty($_POST['email']) && !empty($_POST['password'])) {
        // normally you would load credentials from a database. 
        // This is just an example and is certainly not secure
        if($_POST['email'] == 'admin' && $_POST['password'] == 'admin') {
            $user = array("email"=>"admin", "firstName"=>"Clint", "lastName"=>"Berry", "role"=>"user");
            $_SESSION['user'] = $user;
            echo json_encode($user);
        }
        else {
            echo '{"error":{"text":"You shall not pass..."}}';
        }
    }
    else {
        echo '{"error":{"text":"Username and Password are required."}}';
    }
}

function authorize($role = "user") {
    return function () use ( $role ) {
        // Get the Slim framework object
        $app = Slim::getInstance();
        // First, check to see if the user is logged in at all
        if(!empty($_SESSION['user'])) {
            // Next, validate the role to make sure they can access the route
            // We will assume admin role can access everything
            if($_SESSION['user']['role'] == $role || 
                $_SESSION['user']['role'] == 'admin') {
                //User is logged in and has the correct permissions... Nice!
                return true;
            }
            else {
                // If a user is logged in, but doesn't have permissions, return 403
                $app->halt(403, 'You shall not pass!');
            }
        }
        else {
            // If a user is not logged in at all, return a 401
            $app->halt(401, 'You shall not pass!');
        }
    };
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

<?php

ini_set( 'default_charset', 'utf-8');

session_start(); // Add this to the top of the file

require 'Slim/Slim.php';

$app = new Slim();

$app->get('/', function () {
		echo "PolitiCards REST API";
	});

// routes for users
$app->get('/users', authorize('user'), 'getUsers');
$app->get('/users/:id',	authorize('user'), 'getUser');
$app->get('/users/search/:query', authorize('user'), 'findByName');
$app->post('/users', 'addUser');
$app->put('/users/:id', authorize('user'), 'updateUser');
$app->delete('/users/:id', authorize('user'), 'deleteUser');

// I add the login route as a post, since we will be posting the login form info
$app->post('/login', 'login');
$app->get('/logout', 'logout');
$app->get('/islogged', 'islogged');
$app->get('/sessionInfo', 'sessionInfo');

// routes for posts
$app->get('/posts', authorize('user'), 'getPosts');
$app->get('/posts/:id', authorize('user'), 'getPost');
$app->get('/posts/my/:user', authorize('user'), 'getPostsOfUser');
$app->post('/posts', authorize('user'), 'addPost');
$app->put('/posts/:id', authorize('user'), 'updatePost');
$app->delete('/posts/:id', authorize('user'), 'deletePost');  

// routes for comments
$app->get('/comments/list/:post', authorize('user'), 'getCommentsOfPost');
$app->post('/comments', authorize('user'), 'addComment');
$app->delete('/comments/:id', authorize('user'), 'deleteComment');

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

function getConnection() {
	$dbhost="127.0.0.1";
	$dbuser="dev";
	$dbpass="pas20122";
	$dbname="politiCards";
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $dbh;
}

/**
 * Quick and dirty login function with hard coded credentials (admin/admin)
 * This is just an example. Do not use this in a production environment
 */

function login() {
	$conexao = mysql_connect("localhost","dev","pas20122");	
	mysql_select_db("politiCards");

	//getConnection();
    if(!empty($_POST['email']) && !empty($_POST['password'])){
    	$email = $_POST['email'];
    	$senha = $_POST['password'];
    	$sql = "SELECT * FROM user WHERE email='$email' and password='$senha';";
    	$query = mysql_query($sql);
    	$result = mysql_fetch_assoc($query);

    	// Verifica se encontrou algum registro
    	if (empty($result)) {
    		echo '{"error":{"text":"E-mail ou senha incorreto(s)"}}';    		   
		}else if(mysql_num_rows($query)>1){
			echo '{"error":{"text":"Erro interno do sistema. Foram encontrados mais de um usuário com o login e senha informado."}}';    		   
		}else{
	        // normally you would load credentials from a database. 
	        // This is just an example and is certainly not secure
	        $user = array("id"=>$result['id'], "name"=>$result['name'], "email"=>$result['email'], "profilePicture"=>$result['profilePicture'], "role"=>"user");

	        $_SESSION["user"] = $user;	        
	        echo json_encode($user);//json_encode(array_merge($user,array("profilePicture"=>$result['profilePicture'])));        
        }
    }
    else {
        echo '{"error":{"text":"E-mail e senha são obrigatórios."}}';
    }
}

function logout(){
	if(!empty($_SESSION['user'])){
		unset($_SESSION['user']);
		session_destroy();
	}else{
		echo '{"error":{"text":"O usuário não está logado no sistema."}}';
	}	
}

function isLogged(){	
	if(!empty($_SESSION['user'])){		
		echo '{"islogged":true}';
	}else{
		echo '{"islogged":false}';
	}
}

function sessionInfo(){
	if(!empty($_SESSION['user'])){							
		echo json_encode($_SESSION["user"]);
	}else{
		echo '{"error":{"text":"Não há nenhum usuário logado no sistema."}}';
	}
}

function authorize($role = "user"){
    return function () use ( $role ) {
        // Get the Slim framework object
        $app = Slim::getInstance();
        // First, check to see if the user is logged in at all
        if(!empty($_SESSION['user'])) {
            // Next, validate the role to make sure they can access the route
            // We will assume admin role can access everything
            if($_SESSION['user']['role'] == $role || 
               $_SESSION['user']['role'] == 'admin'){
                //User is logged in and has the correct permissions... Nice!
                return true;
            }
            else {
                // If a user is logged in, but doesn't have permissions, return 403
                $app->halt(403, 'Você não tem premissão!');
            }
        }
        else {
            // If a user is not logged in at all, return a 401
            $app->halt(401, 'Você não tem premissão!');
        }
    };
}


// ---------- functions for posts routes -----------

//return all posts in database
function getPosts() {	
	$sql = "select * FROM posts ORDER BY author";
	try {
		$db = getConnection();		
		$stmt = $db->query($sql);  
		$posts = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($posts);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

//return one post, if your ID equals the parameter ID
function getPost($id) {		
	$sql = "SELECT * FROM posts WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$post = $stmt->fetchObject();  
		$db = null;
		echo json_encode($post); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

// return all posts createds for one user, if your id equals the parameter id
function getPostsOfUser($user) {	
	$sql = "select * FROM posts where author=:author";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("author", $user);
		$stmt->execute();
		$posts = $stmt->fetchAll(PDO::FETCH_OBJ); 
		$db = null;
		echo json_encode($posts);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function addPost() {	
	error_log('addPost\n', 3, '/var/tmp/php.log');
	$request = Slim::getInstance()->request();
	$post = json_decode($request->getBody());	
	$sql = "INSERT INTO posts (author, title, text) VALUES (:author, :title, :text)";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("author", $post->author);
		$stmt->bindParam("title", $post->title);
		$stmt->bindParam("text", $post->text);
		$stmt->execute();
		$post->id = $db->lastInsertId();
		$db = null;
		echo json_encode($post); 
	} catch(PDOException $e) {
		error_log($e->getMessage(), 3, '/var/tmp/php.log');
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function updatePost($id){
	$request = Slim::getInstance()->request();
	$body = $request->getBody();
	$post = json_decode($body);	
	$sql = "UPDATE posts SET author=:author, test=:text WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("author", $post->author);
		$stmt->bindParam("text", $post->text);
		$stmt->bindParam("id", $post->id);
		$stmt->execute();
		$db = null;
		echo json_encode($post); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function deletePost($id) {
	//delete all comments this POST 
	deleteCommentOfPost($id);

	$sql = "DELETE FROM posts WHERE id=:id";
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


// ---------- functions for comments routes -----------

function getCommentsOfPost($post) {	
	$sql = "select * FROM comments where post=:post";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("post", $post);
		$stmt->execute();
		$comments = $stmt->fetchAll(PDO::FETCH_OBJ); 
		$db = null;
		echo json_encode($comments);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function addComment() {	
	error_log('addComment\n', 3, '/var/tmp/php.log');
	$request = Slim::getInstance()->request();
	$comment = json_decode($request->getBody());	
	$sql = "INSERT INTO comments (author, post, text) VALUES (:author, :post, :text)";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("author", $comment->author);
		$stmt->bindParam("post", $comment->post);
		$stmt->bindParam("text", $comment->text);
		$stmt->execute();
		$comment->id = $db->lastInsertId();
		$db = null;
		echo json_encode($comment); 
	} catch(PDOException $e) {
		error_log($e->getMessage(), 3, '/var/tmp/php.log');
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function deleteComment($id) {
	$sql = "DELETE FROM comments WHERE id=:id";
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

function deleteCommentOfPost($post){
	$sql = "DELETE FROM comments WHERE post=:post";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("post", $post);
		$stmt->execute();
		$db = null;
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

?>
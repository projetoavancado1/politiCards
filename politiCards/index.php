<?php
	
	require '../Slim/Slim/Slim.php';
	require 'users_controller.php';

	\Slim\Slim::registerAutoloader();

	//create instance of object Slim
	$app = new \Slim\Slim();
	//define the data return type
	$app->response()->header('Content-Type', 'application/json;charset=utf-8');


	$app->get('/', function () {
		echo "Home of PolitiCards";
	});

	// return all users stored in system
	$app->get('/users','getUsers');

	// return user by ID
	$app->get('/users/:id','getUsersByID');

	// insert new user in database
	$app->post('/users','createUser');

	// update one user
	$app->post('/users/:id','updateUser');

	// delete the user, if have id equals :id of the parameter
	$app->delete('/users/:id','deleteUser');


	$app->run();




?>
<?php

class Database {

  private static $_instance;
  
  public static function getInstance() {
    if(!self::$_instance) { // If no instance then make one
        self::$_instance = new self();
    }
    return self::$_instance;
  }

  // Constructor
  private function __construct() {
    $pg = pg_connect("
		host=ec2-54-163-252-55.compute-1.amazonaws.com
		port=5432
		user=shituznnzjupam
		password=3bcfcb90f5efd59022438b0df0b34628e75dacc46560cbaa0d9de31de22ff188 
		dbname=d8t5c5stalb0ob
	") or die('connection failed');
	
    $this -> _connection = $pg;
  }
  
  // Get postgreSQL connection
  public function getConnection() {
    return $this->_connection;
  }

  // Abort postgreSQL connection
  public function __destruct() {
    $this->_connection = pg_close();
  }
  
}
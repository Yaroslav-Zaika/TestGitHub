<?php
require_once 'app/dbconnect.php';

class Auth {
  private static $user_table_name = 'user';
  private static $users_token_table_name = 'users_token';
  private static $attributes = array();
  private $_pg;

  private function initialize() {
    $db = Database::getInstance();
    $connection = $db -> getConnection();
    $this -> _pg = $connection;
  }

  // signin
  public function signin($code) {
    $this -> initialize();
    
    if(!empty($code)){
      
      $params = [
        'client_id'     => 'client_id',
        'client_secret' => 'client_secret',
        'redirect_uri'  => (isset($_SERVER['HTTPS']) ? "https" : "http") . "://$_SERVER[HTTP_HOST]",
        'code'          => $code,
      ];
      
      $headers[] = 'Accept: application/json';
      
      $ch = curl_init('https://github.com/login/oauth/access_token');
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
      curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($params));
      curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
      $response = curl_exec($ch);
      
      return json_decode($response);
      
    }else{
      $this -> attributes = array(
        'code' => false
      );
      
      return $this-> attributes;
    }
  }
}
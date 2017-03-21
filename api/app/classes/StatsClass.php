<?php
require_once 'app/dbconnect.php';

class Stats {
  private static $stats = 'user_states';
  private static $attributes = array();

  private function initialize() {
    $db = Database::getInstance();
    $connection = $db -> getConnection();
    $this -> _pg = $connection;
  }

  // status
  public function status ($login, $status) {
    $this -> initialize();
    $stats = self::$stats;
    
    $array['date'] = time();
    $array['status'] = pg_escape_string($status);
    $array['user_login'] = pg_escape_string($login);
    
    $result = pg_insert($this -> _pg, $stats, $array);
    
    if ($result) {
      $this -> attributes =  array('save' => 'error');
    } else {
      $this -> attributes =  array('save' => 'error');
    };
    
    return $this -> attributes;
  }
  
  // section
  public function section ($login, $url) {
    $this -> initialize();
    $stats = self::$stats;
    
    $array['date'] = time();
    $array['section'] = pg_escape_string($url);
    $array['user_login'] = pg_escape_string($login);

    $result = pg_insert($this -> _pg, $stats, $array);
    
    if ($result) {
      $this -> attributes =  array('save' => 'success');
    } else {
      $this -> attributes =  array('save' => 'error');
    };
    
    return $this -> attributes;
  }
  
  // get stats
  public function getStats ($login) {
    $this -> initialize();
    $stats = self::$stats;

    $array['user_login'] = pg_escape_string($login);
    
    $result = pg_select($this -> _pg, $stats, $array);
    
    if ($result) {
      $this -> attributes = $result;
    } else {
      $this -> attributes =  array('statistics' => 'not found');
    };
    
    return $this -> attributes;
  }
}
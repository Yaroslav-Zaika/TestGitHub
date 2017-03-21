<?php
require_once 'app/dbconnect.php';

// signin
$app->post(
  '/signin',
  function ($request, $response, $args) {
    $code = $request->getParam('code');
    require 'classes/AuthClass.php';
    $AuthClass = new Auth();
    $result = $AuthClass -> signin($code);
    return json_encode($result);
  }
);

// status
$app->post(
  '/stats/status',
  function ($request, $response, $args) {
    $login = $request->getParam('login');
    $status = $request->getParam('status');
    require 'classes/StatsClass.php';
    $StatsClass = new Stats();
    $result = $StatsClass -> status($login, $status);
    return json_encode($result);
  }
);

// section
$app->post(
  '/stats/section',
  function ($request, $response, $args) {
    $login = $request->getParam('login');
    $url = $request->getParam('url');
    require 'classes/StatsClass.php';
    $StatsClass = new Stats();
    $result = $StatsClass -> section($login, $url);
    return json_encode($result);
  }
);

$app->get(
  '/stats/{login}',
  function ($request, $response, $args) {
    $login = $args['login'];
    require 'classes/StatsClass.php';
    $StatsClass = new Stats();
    $result = $StatsClass -> getStats($login);
    return json_encode($result);
  }
);
<?php


$cfg = [];

switch ($_SERVER["SERVER_NAME"]) {
  case 'localhost':
    $cfg['url'] = 'http://localhost:8787/mon-prochain-job-org/';
    break;

  default:
    # code...
    break;
}

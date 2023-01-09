<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $data = $_POST;
  if ($data['action'] === 'read') {
    $contents = file_get_contents('mapping.txt');
    echo $contents;
  }
}
<?php

$x = $_GET['x'] ?? '';
$y = $_GET['y'] ?? '';
$r = $_GET['r'] ?? '';

$url = "http://localhost:13121/fcgi-bin/webLab1.jar?x=" . rawurlencode($x)
     . "&y=" . rawurlencode($y)
     . "&r=" . rawurlencode($r);


$response = @file_get_contents($url);

$response = trim($response);
if (preg_match('/\{.*\}/s', $response, $matches)) {
    $response = $matches[0];
}

echo $response;

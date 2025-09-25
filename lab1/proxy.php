<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit(0);
header("Content-Type: application/json; charset=utf-8");

$x = $_GET['x'] ?? '';
$y = $_GET['y'] ?? '';
$r = $_GET['r'] ?? '';

$path = "/fcgi-bin/webLab1.jar?x="
        . rawurlencode($x)
        . "&y=" . rawurlencode($y)
        . "&r=" . rawurlencode($r);

$host = "localhost";
$port = 13121;
$errno = 0; 
$errstr = '';

$fp = @stream_socket_client("tcp://{$host}:{$port}", $errno, $errstr, 2);
if (!$fp) {
    http_response_code(502);
    echo json_encode([
        "error"   => "connect_failed",
        "detail"  => $errstr,
        "url"     => "http://{$host}:{$port}{$path}"
    ], JSON_UNESCAPED_UNICODE);
    exit;
}
stream_set_timeout($fp, 5);

$req  = "GET {$path} HTTP/1.1\r\n"."Host: {$host}:{$port}\r\n"."Connection: close\r\n"."\r\n";
fwrite($fp, $req);

$raw = stream_get_contents($fp);
fclose($fp);

if ($raw === false || $raw === '') {
    http_response_code(502);
    echo json_encode([
        "error" => "empty_backend_response",
        "url"   => "http://{$host}:{$port}{$path}"
    ], JSON_UNESCAPED_UNICODE);
    exit;
}


$parts = preg_split("/\r\n\r\n/", $raw, 2);
if (count($parts) < 2) {
    http_response_code(502);
    echo json_encode([
        "error" => "malformed_http_response",
        "raw"   => substr($raw, 0, 200)
    ], JSON_UNESCAPED_UNICODE);
    exit;
}
list($headers, $body) = $parts;

if (preg_match('#^HTTP/\d\.\d\s+(\d{3})#', $headers, $m)) {
    $code = (int)$m[1];
    if ($code >= 400) {
        http_response_code($code);
        echo json_encode([
            "error" => "backend_http_{$code}",
            "url"   => "http://{$host}:{$port}{$path}"
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }
}


$body = trim($body);
if (preg_match('/\{.*\}/s', $body, $matches)) {
    $body = $matches[0];
}

echo $body;

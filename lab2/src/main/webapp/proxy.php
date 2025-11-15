<?php
session_start();
$method = $_SERVER['REQUEST_METHOD'];
$TARGET_BASE = 'http://localhost:13121/labDVA';

if ($method === 'GET') {
    $clearTable = $_GET['clearTable'] ?? '';
    $x = $_GET['x'] ?? '';
    $y = $_GET['y'] ?? '';
    $r = $_GET['r'] ?? '';
    $source = $_GET['source'] ?? '';

    if ($clearTable === 'true') {
        $clearUrl = $TARGET_BASE . "/index.jsp?clearTable=true";

        if (isset($_SESSION['JSESSIONID'])) {
            $clearUrl .= ';jsessionid=' . $_SESSION['JSESSIONID'];
        }

        $clearResponse = @file_get_contents($clearUrl, false, stream_context_create([
            'http' => [
                'header' => 'Cookie: JSESSIONID=' . ($_SESSION['JSESSIONID'] ?? '')
            ]
        ]));

        header("Location: /~s466342/");
        exit;
    }

    if (!empty($x) || !empty($y) || !empty($r)) {
        $url = $TARGET_BASE . "/controller";

        if (isset($_SESSION['JSESSIONID'])) {
            $url .= ';jsessionid=' . $_SESSION['JSESSIONID'];
        }

        $url .= "?x=" . rawurlencode($x)
             . "&y=" . rawurlencode($y)
             . "&r=" . rawurlencode($r)
             . "&source=" . rawurlencode($source);

        $response = @file_get_contents($url, false, stream_context_create([
            'http' => [
                'header' => 'Cookie: JSESSIONID=' . ($_SESSION['JSESSIONID'] ?? '')
            ]
        ]));

        if (isset($http_response_header)) {
            foreach ($http_response_header as $header) {
                if (preg_match('/^Set-Cookie:\s*JSESSIONID=([^;]+)/i', $header, $matches)) {
                    $_SESSION['JSESSIONID'] = $matches[1];
                    break;
                }
            }
        }

        if ($response === FALSE) {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to connect to target server']);
        } else {
            if (strpos($response, '<html') !== false || strpos($response, '<!DOCTYPE') !== false) {
                $response = str_replace(
                    'http://localhost:13121/labDVA/',
                    '',
                    $response
                );
            }
            echo $response;
        }
    } else {
        $mainUrl = $TARGET_BASE . "/index.jsp";

        if (isset($_SESSION['JSESSIONID'])) {
            $mainUrl .= ';jsessionid=' . $_SESSION['JSESSIONID'];
        }

        $response = @file_get_contents($mainUrl, false, stream_context_create([
            'http' => [
                'header' => 'Cookie: JSESSIONID=' . ($_SESSION['JSESSIONID'] ?? '')
            ]
        ]));

        if (isset($http_response_header)) {
            foreach ($http_response_header as $header) {
                if (preg_match('/^Set-Cookie:\s*JSESSIONID=([^;]+)/i', $header, $matches)) {
                    $_SESSION['JSESSIONID'] = $matches[1];
                    break;
                }
            }
        }

        if ($response !== FALSE) {
            $response = str_replace(
                'http://localhost:13121/labDVA/',
                '',
                $response
            );
            echo $response;
        } else {
            http_response_code(500);
            echo "Ошибка загрузки главной страницы";
        }
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
?>
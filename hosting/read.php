<?php
$allowed_origins = ['https://poolguys.vercel.app', 'http://localhost:3000'];
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

if (in_array($origin, $allowed_origins)) {
    header('Access-Control-Allow-Origin: ' . $origin);
}
header('Content-Type: application/json'); // Assuming you're sending back JSON

$file = 'config/config.json';
if (file_exists($file)) {
    echo file_get_contents($file);
} else {
    echo json_encode(array("error" => "File not found."));
}
?>
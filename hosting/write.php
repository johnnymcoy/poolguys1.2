<?php
$allowed_origins = ['https://poolguys.vercel.app', 'http://localhost:3000'];
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

if (in_array($origin, $allowed_origins)) {
    header('Access-Control-Allow-Origin: ' . $origin);
}
header('Content-Type: application/json'); // Assuming you're sending back JSON
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

$file = 'config/config.json';
$jsonString = file_get_contents('php://input');
$data = json_decode($jsonString, true);

if (json_last_error() === JSON_ERROR_NONE) {
    // Add some authentication mechanism here to protect your endpoint.
    file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT));
    echo json_encode(array("success" => "Data updated successfully."));
} else {
    echo json_encode(array("error" => "Invalid JSON."));
}
?>
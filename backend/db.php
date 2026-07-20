<?php

$envFile = __DIR__ . '/../.env';
$env = file_exists($envFile) ? parse_ini_file($envFile) : [];

$host     = $env['DB_HOST'] ?? "fist-o.com";
$dbname   = $env['DB_NAME'] ?? "fisto_demo_workspace";
$username = $env['DB_USER'] ?? "fisto_demo_workspace";
$password = $env['DB_PASS'] ?? "hFc3nsJVAx4MVDFr4mcH";

mysqli_report(MYSQLI_REPORT_OFF);
$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode([
        "success" => false,
        "message" => "Database connection failed: " . $conn->connect_error,
    ]));
}

$conn->set_charset("utf8");
?>

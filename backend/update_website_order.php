<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'db.php';

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['orderData']) || !is_array($data['orderData'])) {
    echo json_encode(["success" => false, "message" => "Invalid order data"]);
    exit();
}

$conn->begin_transaction();

try {
    $stmt = $conn->prepare("UPDATE websites SET display_order = ? WHERE id = ?");
    
    foreach ($data['orderData'] as $item) {
        $order = (int)$item['order'];
        $id = (int)$item['id'];
        $stmt->bind_param("ii", $order, $id);
        $stmt->execute();
    }
    
    $conn->commit();
    echo json_encode(["success" => true, "message" => "Order updated successfully"]);
} catch (Exception $e) {
    $conn->rollback();
    echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
}

$conn->close();
?>

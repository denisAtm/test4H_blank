<?php
// task_detail.php

header('Content-Type: application/json');

$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($id > 0 && $id <= 1000) {
    $taskDetail = [
        'id' => $id,
        'title' => "Задача $id",
        'date' => date('Y-m-d H:i:s', time() + $id * 3600),
        'author' => "Автор $id",
        'status' => "Статус $id",
        'description' => "Описание $id",
    ];

    echo json_encode($taskDetail);
} else {
    http_response_code(404);
    echo json_encode(['error' => 'Task not found']);
}

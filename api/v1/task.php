<?php
// task.php

// Set the response header
header('Content-Type: text/html; charset=utf-8');

// Generate tasks data
$tasks = [];
$currentDate = time();

for ($i = 1; $i <= 1000; $i++) {
    $tasks[] = [
        'id' => $i,
        'title' => "Задача $i",
        'date' => date('Y-m-d H:i:s', $currentDate + $i * 3600),
    ];
}

// Output HTML table
echo '<table border="1">';
echo '<thead><tr><th>ID</th><th>Заголовок</th><th>Дата</th></tr></thead>';
echo '<tbody>';
foreach ($tasks as $task) {
    echo '<tr>';
    echo '<td>' . $task['id'] . '</td>';
    echo '<td>' . $task['title'] . '</td>';
    echo '<td>' . $task['date'] . '</td>';
    echo '</tr>';
}
echo '</tbody>';
echo '</table>';
?>

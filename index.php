<!-- Используйте этот HTML для вашей страницы -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Список задач</title>
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th, td {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
        }
    </style>
</head>
<body>
<h1>Список задач</h1>

<table id="taskTable">
    <thead>
    <tr>
        <th>ID</th>
        <th>Заголовок</th>
        <th>Дата выполнения</th>
    </tr>
    </thead>
    <tbody></tbody>
</table>

<div id="pagination"></div>
<input type="text" id="searchInput" placeholder="Поиск по заголовку">
<script src="tasks.js"></script>
</body>
</html>

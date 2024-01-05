// tasks.js

document.addEventListener('DOMContentLoaded', function () {
    const taskTable = document.getElementById('taskTable').getElementsByTagName('tbody')[0];
    const paginationContainer = document.getElementById('pagination');
    const searchInput = document.getElementById('searchInput');
    let tasks = [];
    const itemsPerPage = 10;
    let currentPage = 1;

    function renderTask(task) {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${task.id}</td><td><a href="#" class="task-link" data-id="${task.id}">${task.title}</a></td><td>${task.date}</td>`;
        return row;
    }

    function renderTasks(tasks) {
        taskTable.innerHTML = '';
        tasks.forEach(task => {
            taskTable.appendChild(renderTask(task));
        });
    }

    function filterTasks(searchTerm) {
        const filteredTasks = tasks.filter(task =>
            task.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        renderTasks(filteredTasks);
        updatePagination(filteredTasks.length);
    }

    function showPage(page) {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const currentPageTasks = tasks.slice(start, end);
        renderTasks(currentPageTasks);
        currentPage = page;
        updatePagination(tasks.length);
    }

    function updatePagination(totalItems) {
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        paginationContainer.innerHTML = '';

        if (totalPages > 1) {
            // Add previous arrow
            if (currentPage > 1) {
                const prevBtn = document.createElement('button');
                prevBtn.textContent = '«';
                prevBtn.classList.add('page-btn');
                prevBtn.addEventListener('click', function () {
                    showPage(currentPage - 1);
                });
                paginationContainer.appendChild(prevBtn);
            }

            // Add page numbers
            const maxPagesToShow = 5;
            const startPage = Math.max(1, Math.min(currentPage - Math.floor(maxPagesToShow / 2), totalPages - maxPagesToShow + 1));
            const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

            for (let i = startPage; i <= endPage; i++) {
                const pageBtn = document.createElement('button');
                pageBtn.textContent = i;
                pageBtn.classList.add('page-btn');
                if (i === currentPage) {
                    pageBtn.classList.add('active');
                }
                pageBtn.addEventListener('click', function () {
                    showPage(i);
                });
                paginationContainer.appendChild(pageBtn);
            }

            // Add next arrow
            if (currentPage < totalPages) {
                const nextBtn = document.createElement('button');
                nextBtn.textContent = '»';
                nextBtn.classList.add('page-btn');
                nextBtn.addEventListener('click', function () {
                    showPage(currentPage + 1);
                });
                paginationContainer.appendChild(nextBtn);
            }
        }
    }

    function loadTasks() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', '/api/v1/task.php', true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const parser = new DOMParser();
                    const htmlDoc = parser.parseFromString(xhr.responseText, 'text/html');
                    const rows = htmlDoc.querySelectorAll('tbody tr');

                    tasks = Array.from(rows).map(row => {
                        const columns = row.querySelectorAll('td');
                        return {
                            id: columns[0].textContent,
                            title: columns[1].textContent,
                            date: columns[2].textContent,
                        };
                    });

                    totalTasks = tasks.length;
                    renderTasks(tasks.slice(0, itemsPerPage));
                    updatePagination(totalTasks);
                } else {
                    console.error('Failed to load tasks:', xhr.status);
                }
            }
        };
        xhr.send();
    }

    loadTasks();

    searchInput.addEventListener('input', function () {
        const searchTerm = this.value;
        filterTasks(searchTerm);
    });

    taskTable.addEventListener('click', function (e) {
        if (e.target.classList.contains('task-link')) {
            e.preventDefault();
            const taskId = e.target.dataset.id;
            showModal(taskId);
        }
    });

    function showModal(taskId) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `/api/v1/task_detail.php?id=${taskId}`, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const taskDetail = JSON.parse(xhr.responseText);
                // Implement logic to display a modal with detailed information about the task
                alert(JSON.stringify(taskDetail, null, 2));
            }
        };
        xhr.send();
    }
});

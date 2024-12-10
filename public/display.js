function loadTasks() {
    fetch('/tasks')
        .then(response => response.json())
        .then(tasks => {
            const taskTable = document.getElementById('taskTable').getElementsByTagName('tbody')[0];

            // Clear existing rows
            taskTable.innerHTML = '';

            tasks.forEach(task => {
                const row = document.createElement('tr');
            
                const unityCell = document.createElement('td');
                unityCell.textContent = task.unity;
                row.appendChild(unityCell);
            
                const personCell = document.createElement('td');
                personCell.textContent = task.person;
                row.appendChild(personCell);
            
                const descriptionCell = document.createElement('td');
                descriptionCell.textContent = task.description;
                row.appendChild(descriptionCell);
            
                const priorityCell = document.createElement('td');
                priorityCell.textContent = task.priority;
                priorityCell.setAttribute('data-priority', task.priority);
                row.appendChild(priorityCell);
            
                const dateCell = document.createElement('td');
                dateCell.textContent = new Date(task.created_at).toLocaleString(); // Format the date
                row.appendChild(dateCell);

                // Create and append delete button
                const deleteCell = document.createElement('td');
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.setAttribute('data-id', task.id); // Store task ID in the button
                deleteCell.appendChild(deleteButton);
                row.appendChild(deleteCell);

                taskTable.appendChild(row);

                // Add event listener for the delete button
                deleteButton.addEventListener('click', function() {
                    const taskId = this.getAttribute('data-id');
                    deleteTask(taskId);
                });
            });
        })
        .catch(error => console.error('Error fetching tasks:', error));
}

// Fetch tasks every 5 seconds (5000 milliseconds)
setInterval(loadTasks, 5000);

// Initial load of tasks when the page is loaded
loadTasks();

// Function to delete the task
function deleteTask(taskId) {
    if (confirm('Are you sure you want to delete this task?')) {
        fetch(`/tasks/${taskId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                alert('Task deleted');
                location.reload(); // Reload the page to refresh the task list
            } else {
                alert('Failed to delete task');
            }
        })
        .catch(error => console.error('Error deleting task:', error));
    }
}
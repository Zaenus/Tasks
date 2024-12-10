document.getElementById('taskForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const unity = document.getElementById('unity').value;
    const person = document.getElementById('person').value;
    const description = document.getElementById('description').value;
    const priority = document.getElementById('priority').value;

    const created_at = new Date().toISOString();  // Get the current timestamp in ISO format

    const taskData = {
        unity,
        person,
        description,
        priority,
        created_at
    };

    fetch('/api/create-task', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskData)
    }).then(response => response.json())
      .then(data => {
          // Show the popup
          const popup = document.getElementById('taskCreatedPopup');
          popup.style.display = 'block';

          // Close the popup when the user clicks on <span> (x)
          document.getElementById('closePopup').addEventListener('click', () => {
              popup.style.display = 'none';
          });

          // Optionally, automatically close the popup after a few seconds and reload the page
          setTimeout(() => {
              popup.style.display = 'none';
              window.location.reload();  // Refresh the page after a few seconds
          }, 3000); // 3 seconds delay
      })
      .catch(error => console.error('Error:', error));
});

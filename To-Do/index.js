document.addEventListener("DOMContentLoaded", function() {
    // Function to add a task
    function addTask() {
        var input = document.getElementById("taskInput");
        var task = input.value.trim();
        var category = document.getElementById("categoryInput").value.trim();
        var taskList = document.getElementById("taskList");
        var errorMessage = document.getElementById("error-message");

        if (task !== "") {
            if (category === "") {
                category = "Default";
            }

            // Check if the category section already exists
            var categorySection = document.getElementById(category + "-section");
            if (!categorySection) {
                // Create a new category section
                categorySection = document.createElement("section");
                categorySection.id = category + "-section";
                categorySection.innerHTML = "<h2>" + category + "</h2>";

                // Check if the default category exists
                var defaultCategory = document.getElementById("Default-section");
                if (defaultCategory) {
                    // Append before the default category
                    taskList.insertBefore(categorySection, defaultCategory);
                } else {
                    taskList.appendChild(categorySection);
                }
            }

            var li = document.createElement("li");

            // Add container for task and delete button
            var container = document.createElement("div");
            container.className = "task-container";

            // Add task text
            var taskText = document.createTextNode(task);
            container.appendChild(taskText);

            // Add custom delete button
            var deleteBtn = document.createElement("button");
            deleteBtn.className = "delete-btn tooltip"; 
            deleteBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" height="25" width="25">
                    <path fill="#6361D9" d="M8.78842 5.03866C8.86656 4.96052 8.97254 4.91663 9.08305 4.91663H11.4164C11.5269 4.91663 11.6329 4.96052 11.711 5.03866C11.7892 5.11681 11.833 5.22279 11.833 5.33329V5.74939H8.66638V5.33329C8.66638 5.22279 8.71028 5.11681 8.78842 5.03866ZM7.16638 5.74939V5.33329C7.16638 4.82496 7.36832 4.33745 7.72776 3.978C8.08721 3.61856 8.57472 3.41663 9.08305 3.41663H11.4164C11.9247 3.41663 12.4122 3.61856 12.7717 3.978C13.1311 4.33745 13.333 4.82496 13.333 5.33329V5.74939H15.5C15.9142 5.74939 16.25 6.08518 16.25 6.49939C16.25 6.9136 15.9142 7.24939 15.5 7.24939H15.0105L14.2492 14.7095C14.2382 15.2023 14.0377 15.6726 13.6883 16.0219C13.3289 16.3814 12.8414 16.5833 12.333 16.5833H8.16638C7.65805 16.5833 7.17054 16.3814 6.81109 16.0219C6.46176 15.6726 6.2612 15.2023 6.25019 14.7095L5.48896 7.24939H5C4.58579 7.24939 4.25 6.9136 4.25 6.49939C4.25 6.08518 4.58579 5.74939 5 5.74939H6.16667H7.16638ZM7.91638 7.24996H12.583H13.5026L12.7536 14.5905C12.751 14.6158 12.7497 14.6412 12.7497 14.6666C12.7497 14.7771 12.7058 14.8831 12.6277 14.9613C12.5495 15.0394 12.4436 15.0833 12.333 15.0833H8.16638C8.05588 15.0833 7.94989 15.0394 7.87175 14.9613C7.79361 14.8831 7.74972 14.7771 7.74972 14.6666C7.74972 14.6412 7.74842 14.6158 7.74584 14.5905L6.99681 7.24996H7.91638Z" clip-rule="evenodd" fill-rule="evenodd"></path>
                </svg>
                <span class="tooltiptext">remove</span>
            `;
            container.appendChild(deleteBtn);

            // Delete task event listener
            deleteBtn.addEventListener("click", function(event) {
                event.stopPropagation(); 
                categorySection.removeChild(li);
                if (categorySection.getElementsByTagName("li").length === 0) {
                    // Remove category section if it has no tasks
                    categorySection.parentNode.removeChild(categorySection);
                }
            });

            // Add container to list item
            li.appendChild(container);

            // Insert task under the category section
            categorySection.appendChild(li);

            // Hide error message
            errorMessage.style.display = "none";

            input.value = "";
        } else {
            // Show error message if task input is empty
            errorMessage.style.display = "block";
            input.classList.add("error-border");
        }
    }

    // Reset error border when input is corrected
    document.getElementById("taskInput").addEventListener("input", function() {
        if (this.value.trim() !== "") {
            this.classList.remove("error-border");
        }
    });

    // Event listener for the "Add Task" button
    document.querySelector(".add-task").addEventListener("click", addTask);

    // Allow pressing Enter key to add task
    document.getElementById("taskInput").addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

    // Function to clear all tasks
    function clearAllTasks() {
        var taskList = document.getElementById("taskList");
        taskList.innerHTML = ""; // Clear all tasks by removing inner HTML of the task list
    }

    // Event listener for the "Clear All Tasks" button
    document.getElementById("clearTasksBtn").addEventListener("click", clearAllTasks);

    // Function to sort tasks alphabetically within each category
    function sortTasks() {
        var categories = document.querySelectorAll("section");
        categories.forEach(function(category) {
            var tasks = category.querySelectorAll("li");
            var sortedTasks = Array.from(tasks).sort(function(a, b) {
                return a.textContent.localeCompare(b.textContent);
            });
            sortedTasks.forEach(function(task) {
                category.appendChild(task);
            });
        });
    }

    // Event listener for the "Sort" button
    document.querySelector(".sort").addEventListener("click", sortTasks);
});

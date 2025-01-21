// make dimamic year
let year = document.querySelector(".year")
const currentYear = new Date().getFullYear()
year.innerHTML = `${currentYear}`;

// Handle the "Delete" button click event
const deleteButtons = document.querySelectorAll('.delete-btn');

deleteButtons.forEach(button => {
    button.addEventListener('click', function() {
        const taskId = this.getAttribute('data-taskid');  // Get the task ID
        
        // Send a DELETE request to the Flask backend
        fetch(`/delete-todo/${taskId}`, {
            method: 'DELETE',  // HTTP method
            headers: {
                'Content-Type': 'application/json',  // The content type is JSON
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                // Remove the todo item from the DOM
                const todoItem = document.getElementById('todo-' + taskId);
                if (todoItem) {
                    todoItem.remove();
                }
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
// Timer update tags
let uHour = document.querySelector(".hour");
let uMinute = document.querySelector(".minute");
let uSecond = document.querySelector(".second");
let alam = document.querySelector("#audio");
let playButton = document.getElementById("play-button");
let pauseButton = document.getElementById("pause-button");

// Input tags
let iHour = document.querySelector("#hour");
let iMinute = document.querySelector("#minute");
let iSecond = document.querySelector("#second");

// Button
let btn = document.querySelector("#add-time");
let alertMsg = document.querySelector(".alert-js")

function valid_time_checker(input) {
    // Check if input is a valid number and within the range of 0 to 59 for minutes and seconds
    return !isNaN(input) && input >= 0 && input <= 59;
}
// Add todo
let addTodo = document.querySelector("#add-todo");

addTodo.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent the default action if needed
    
    // Make the AJAX request
    $.ajax({
        type: "POST",
        url: "/add-todo",
        data: {"text": document.querySelector("#todo-list").value},
        success: function(response) {
            // Refresh the page after the request is successful
            location.reload();
        },
        error: function(xhr, status, error) {
            console.error("Error adding todo: " + error);
        }
    });
});


// Timer
let timerInterval;

// Ensure the alarm is paused on page load
alam.pause();
alam.currentTime = 0; // Ensure it starts from the beginning

// Play button functionality
playButton.addEventListener('click', () => {
    audio.play();  // Play the audio
    playButton.style.display = 'none';  // Hide the play button
    pauseButton.style.display = 'inline-block';  // Show the pause button
});

// Pause button functionality
pauseButton.addEventListener('click', () => {
    audio.pause();  // Pause the audio
    playButton.style.display = 'inline-block';  // Show the play button
    pauseButton.style.display = 'none';  // Hide the pause button
});

btn.addEventListener('click', (e) => {
    // Get input values and convert them to integers
    let h = parseInt(iHour.value) || 0;
    let m = parseInt(iMinute.value) || 0;
    let s = parseInt(iSecond.value) || 0;

    // Validate input times
    if (valid_time_checker(m) && valid_time_checker(s)) {
        // If there's an existing timer running, clear it first
        if (timerInterval) {
            clearInterval(timerInterval);
        }

        // Start a new timer
        timerInterval = setInterval(() => {
            // Decrement the time
            if (s === 0 && m > 0) {
                s = 59;
                m -= 1;
            } else if (m === 0 && h > 0) {
                m = 59;
                h -= 1;
            } else if (s > 0) {
                s -= 1;
            }

            // Display the time
            uHour.innerHTML = String(h).padStart(2, '0');
            uMinute.innerHTML = String(m).padStart(2, '0');
            uSecond.innerHTML = String(s).padStart(2, '0');

            // Stop the timer when time reaches zero
            if (h === 0 && m === 0 && s === 0) {
                alam.play(); // Play the alarm sound
                playButton.style.display = 'none';  // Hide the play button
                pauseButton.style.display = 'inline-block';  // Show the pause button
                alertMsg.innerHTML = alertMsg.innerHTML = `<div class="alert alert-info alert-dismissible fade show" role="alert">
                Time Up!
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`;
                clearInterval(timerInterval); // Stop the timer
            }
        }, 1000);
    } else {
        alertMsg.innerHTML = alertMsg.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
        Invalid Time Input
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;
    
    }

    e.preventDefault();
});


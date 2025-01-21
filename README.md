# selftool
#### Video Demo: https://www.youtube.com/watch?v=pu5ez7vYvuo

## Description:


### Overview

This is a simple web application built using **Flask** for the backend and **SQLite** as the database. It allows users to register, log in, manage a to-do list, and use a timer feature. The application includes basic user authentication, adding and deleting to-do tasks, and a timer with an alarm notification when time is up.

The project includes a clean, responsive UI using **Bootstrap** for styling. JavaScript is used to manage the timer and handle asynchronous requests for adding and deleting tasks from the to-do list.

### Features

1. **User Authentication**:
   - Users can register, log in, and log out.
   - Passwords are hashed for security.

2. **To-Do List**:
   - Users can add tasks to their to-do list.
   - Tasks can be deleted using the "Delete" button.

3. **Timer**:
   - Users can set a timer with hours, minutes, and seconds.
   - When the timer reaches zero, an alarm sound is played, and a notification appears.

4. **Responsive UI**:
   - The application adapts to different screen sizes using **Bootstrap**'s grid system.

5. **Database**:
   - SQLite is used to store user data and tasks.
   - SQL queries are used to retrieve and manipulate data in the database.

## Setup and Installation

### Requirements

- Python 3.x
- Flask
- SQLite
- cs50 (for database handling)

### Installation Steps

1. **Clone the repository**:
   To get started, clone the repository to your local machine:
   git clone https://github.com/dorjizangpo-067/cs50_final_project.git

2. **Navigate to the project directory**:
   cd cs50_final_project

3. **Set up the virtual environment: It is recommended to use a virtual environment to manage dependencies. Create and activate a virtual environment by running**:
   python3 -m venv venv
   source venv/bin/activate  # For Linux/Mac
   venv\Scripts\activate  # For Windows

4. **Install the required dependencies: Install the necessary Python packages using the requirements.txt file**:
   pip install -r requirements.txt

5. **Run the Flask application: After installing the dependencies, run the Flask development server with the following command**:
   flask run

6. **Access the application: Open a web browser and go to the following URL to access the application**:
   http://localhost:5000/

## Usage
### Registration:
   - On the homepage, click on the "Register" button to create a new user account.
   - Provide a username, email, and password. Your password will be securely hashed.

### Login:
   - After registering, log in with your credentials by clicking on the "Login" button.
   - If you're already logged in, you can access your personalized to-do list and timer.

### Managing the To-Do List:
   - Once logged in, you can add tasks to your to-do list by entering a task name and description.
   - Each task will appear on your list with a "Delete" button that you can click to remove the task once it is completed.

### Setting the Timer:
   - Set a timer by specifying the hours, minutes, and seconds in the input fields.
   - When the timer reaches zero, an alarm sound will play, and a notification will be shown to inform you that time is up.

### Logging Out:
   - You can log out at any time by clicking the "Logout" button in the navigation bar.

## Technologies Used
   - **Flask**: A lightweight web framework for Python used for building the backend of the application.
   - **SQLite**: A simple, serverless SQL database used to store user data and tasks.
   - **Bootstrap**: A front-end framework used for designing the user interface, ensuring it is responsive on all devices.
   - **JavaScript**: Used to manage the timer functionality and asynchronous requests for adding and deleting tasks.

## Directory Structure
cs50_final_project/
├── app.py                # Main Flask application
├── requirements.txt      # List of dependencies
├── static/               # Contains static files (CSS, JS, images, audio)
│   |── css/
│   |── js/
│   |── images/
│   |── audio/
├── templates/            # Contains HTML templates
│   |── layout.html       # Base HTML layout
│   |── todo_list.html 
│   |── login.html
│   |── navbar.html
│   |── footer.html
│   |── register.html
│   └── timer.html
└── README.md 

## Contributing
   - Feel free to fork the repository and submit pull requests. Contributions are always welcome! If you encounter any issues or have suggestions for improvements, please open an issue in the repository.

## License
   - This project is open-source and available under the MIT License.

## Acknowledgments
   - **Flask**: For being an excellent micro-framework to build web applications.
   - **Bootstrap**: For its responsive design components.
   - **SQLite**: For providing a lightweight and serverless database solution.
   - **cs50**: For helping with easy database management and interaction.

## Contact
   - If you have any questions or need help, feel free to reach out to me via the issues section of the repository or by email at dorjizangpo@gmail.com

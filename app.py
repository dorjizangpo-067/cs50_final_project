from flask import Flask, render_template, request, flash, session, redirect, url_for, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps
from cs50 import SQL

app = Flask(__name__)

app.secret_key = 'xfcgvhbjktfgdcvb45ugfyrdgfyrcvgtyrtcf vhgrdxf6'

db = SQL("sqlite:///database.db")

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # If the user is not logged in (session does not have 'username'), redirect to login page
        if 'username' not in session:
            flash('You need to log in first!', 'danger')
            return redirect(url_for('login'))  # Redirect to login page
        return f(*args, **kwargs)
    return decorated_function

@app.route("/register", methods = ["GET", "POST"])
def register():
    if request.method == "POST":
        fullname = request.form.get("fullname")
        username = request.form.get("username")
        email = request.form.get("email")
        password1 = request.form.get("password1")
        password2 = request.form.get("password2")

        # make sure full name is entered
        if (fullname is None) or (fullname == ""):
            flash("Invilade Full Name", "danger")
            return redirect("/register")

        # make sure username is entered
        if (username is None) or (username == ""):
            flash("Invilade Username", "danger")
            return redirect("/register")

        # make sure email is entered
        if (email is None ) or ( "@" not in email):
            flash("Invilade Email", "danger")
            return redirect("/register")

        # make sure password is entered
        if (password1 is None) or (password1 == ""):
            flash("Invilade Password", "danger")
            return redirect("/register")

        # make sure confrum password is entered or same as password
        if (password2 is None) or (password1 != password2):
            flash("Missmatch Password", "danger")
            return redirect("/register")

        # check user exist
        username_exist = db.execute("SELECT username FROM users WHERE username = ?", username)

        # if length is not 0 that means user exist
        if len(username_exist) != 0:
            flash("Username Already Taken! Try differentuser name", "danger")
            return redirect("/register")
        
        # insert new user
        db.execute("INSERT INTO users (fullname, username, email, password) VALUES (?, ?, ?, ?)", fullname, username, email, generate_password_hash(password1))
        flash("successfully Registered", "success")
        session["username"] = username
        return redirect("/timer")
    
    return render_template("register.html")

@app.route("/login", methods = ["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")

        # user name is not entered
        if username is None or username == "":
            flash("Invalid Username", "danger")
            return redirect("/login")
        
        # password is not entered
        if password == None or password == "":
            flash("Invalid Password", "danger")
            return redirect("/login")
        
        # to check username is exist
        user = db.execute("SELECT password FROM users WHERE username = ?", username)

        # make sure user has register
        if len(user) == 0:
            flash("Invilid Username", "danger")
            return redirect("/login")
        
        # check password match with user
        if check_password_hash(user[0]["password"], password):
            flash("successfully Login", "success")
            session["username"] = username
            return redirect("/timer")
        
        # if password didnt match
        else:
            flash("Invilid Password", "danger")
            return redirect("/login")
        
    return render_template("login.html")

@app.route("/logout")
def logout():
    session.clear()
    return redirect("/login")

@app.route("/todo-list", methods=["GET", "POST"])
@login_required
def todo_list():
    if request.method == "POST":
        todo = request.form.get("todo-list")
        if todo is None or todo == "":
            flash("Invilad Todo list", "danger")
            return redirect("/todo-list")
        
        db.execute("INSERT INTO todolist (text, user_username) VALUES (?, ?)", todo, session["username"])
        return redirect("/todo-list")

    return render_template("todo_list.html", todo_list_items=db.execute("SELECT id, text FROM todolist WHERE user_username = ?", session["username"]))

@app.route("/delete-todo/<int:task_id>", methods=["DELETE"])
@login_required
def delete_todo(task_id):
    # Delete the todo item from the database
    db.execute("DELETE FROM todolist WHERE id = ? AND user_username = ?", task_id, session["username"])
    
    # Send a JSON response to indicate success
    return jsonify({"status": "success"}), 200

@app.route("/timer")
@login_required
def timer():
    return render_template("timer.html")

if __name__ == '__main__':
    app.run(debug=True)

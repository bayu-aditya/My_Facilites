import os
from flask import Flask, render_template

TEMPLATE_DIR = os.path.abspath('frontend/templates')
STATIC_DIR = os.path.abspath('frontend/statics')
app = Flask(__name__, template_folder=TEMPLATE_DIR, static_folder=STATIC_DIR)

# GET: homepage /
@app.route('/')
def homepage():
    return render_template("index.html")

@app.route('/register')
def register():
    return render_template("set_account.html")

# if __name__ == "__main__":
app.run(port=5000)
from flask import Flask

app = Flask(__name__)

@app.route("/")
def test():
    return "testing weeber"

app.run(host="0.0.0.0", port=5001)
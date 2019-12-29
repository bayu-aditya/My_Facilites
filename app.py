# Author: Bayu Aditya
import os
from flask import Flask, jsonify
from flask_cors import CORS

# STATICS_DIR = os.path.abspath("statics")
# TEMPLATES_DIR = os.path.abspath("templates")

# app = Flask(__name__, template_folder=TEMPLATES_DIR, static_folder=STATICS_DIR)
app = Flask(__name__)
CORS(app)

items = [
    {
        "name": "buku",
        "start": "27 Des 2019",
        "end": "28 Des 2019"
    },
    {
        "name": "tas",
        "start": "27 Aug 2019",
        "end": "28 Aug 2019"
    }
]

# API Services
@app.route('/api/items')
def list_items():
    return jsonify({"items": items})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8888)
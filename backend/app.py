# author: Bayu Aditya
from flask import Flask
from flask_restful import Api

from organization import Organizations
from organization import Organization


app = Flask(__name__)
api = Api(app)


api.add_resource(Organizations, "/api/organization")
api.add_resource(Organization, "/api/organization/<string:name>")

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8888)
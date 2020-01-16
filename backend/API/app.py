from flask import Flask
from flask_restful import Api
from flask_cors import CORS

from src.organization import Organizations, Organization
from src.organization import Inventories, Inventory

app = Flask(__name__)
CORS(app)
api = Api(app)

api.add_resource(Organizations, "/organizations")
api.add_resource(Organization, "/organization")
api.add_resource(Inventories, "/organization/inventories")
api.add_resource(Inventory, "/organization/inventory")

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8888)
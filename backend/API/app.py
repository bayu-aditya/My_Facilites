from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from src.resources.user import Login, Register
from src.resources.organization import Organizations, Organization
from src.resources.organization import Inventories, Inventory

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = "apimyfacilties"

CORS(app)
api = Api(app)
jwt = JWTManager(app)


api.add_resource(Login, "/login")
api.add_resource(Register, "/register")
api.add_resource(Organizations, "/organizations")
api.add_resource(Organization, "/organization")
api.add_resource(Inventories, "/organization/inventories")
api.add_resource(Inventory, "/organization/inventory")

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8888)
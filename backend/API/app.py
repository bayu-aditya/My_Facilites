from flask import Flask, jsonify
from flask_restful import Api
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from src.resources.user import (
    Login, 
    Register, 
    User, 
    TokenRefresh
    )
from src.resources.organization import (
    Organizations, 
    Other_Organizations, 
    Organization
    )
from src.resources.avatar import Avatar
from src.resources.inventory import Inventories, Inventory
from src.resources.member import Members
from src.resources.tasks import Tasks, Task

app = Flask(__name__)
app.config["PROPAGATE_EXCEPTIONS"] = True
app.config["JWT_SECRET_KEY"] = "apimyfacilties"

CORS(app)
api = Api(app)
jwt = JWTManager(app)


@jwt.expired_token_loader
def my_expired_token_callback(expired_token):
    token_type = expired_token['type']
    return jsonify({
        'status': 401,
        'sub_status': 42,
        'msg': 'The {} token has expired'.format(token_type)
    }), 401

api.add_resource(Login, "/login")
api.add_resource(Register, "/register")
api.add_resource(User, "/user")
api.add_resource(Avatar, "/upload/avatar")
api.add_resource(TokenRefresh, "/refresh")
api.add_resource(Organizations, "/organizations")
api.add_resource(Other_Organizations, "/other_organizations")
api.add_resource(Organization, "/organization")
api.add_resource(Inventories, "/organization/inventories")
api.add_resource(Inventory, "/organization/inventory")
api.add_resource(Members, "/organization/members")
api.add_resource(Tasks, "/organization/inventory/tasks")
api.add_resource(Task, "/organization/inventory/task")

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8888, debug=True)
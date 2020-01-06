# author: Bayu Aditya
from flask import Flask
from flask_restful import Api
from flask_cors import CORS

from organization import Organizations
from organization import Organization
from organization import Inventories, Item


app = Flask(__name__)
CORS(app)
api = Api(app)

# ------------------- FOR ORGANIZATION -----------------------------------------
api.add_resource(Organizations, "/api/organization")
api.add_resource(Organization, "/api/<string:user>")
# api.add_resource(Inventories, "/api/organization/<string:name>/inventory")
# api.add_resource(Item, "/api/organization/<string:name>/inventory/<string:item>")
# api.add_resource(Summary_org, "/api/organization/<string:name>/summary")

# ------------------- FOR PERSONAL USER ----------------------------------------
# api.add_resource(Register, "/api/register")
# api.add_resource(Profile, "/api/profile")
# api.add_resource(Transaction, "/api/transaction")
# api.add_resource(Summary, "/api/summary")

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8888)
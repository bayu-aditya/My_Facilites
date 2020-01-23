from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity
from bson.objectid import ObjectId
from src.model.organization import Org, Tools
from src.resources.unique_id import get_id

class Inventories(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument(
        name="_id", type=str, required=True, help="id organization cannot be blank")
        
    @jwt_required
    def get(self):
        inpt = self.parser.parse_args()
        mycol = Tools.get_collection()
        result = mycol.find_one(
            {"_id": ObjectId(inpt["_id"])}
        )
        if result is None:
            return {"message": "organization with id {} not found.".format(inpt["_id"])}, 404
        result = Org(result)
        return {"inventory": result.inventory}, 202


class Inventory(Resource):
    parser_io_n = reqparse.RequestParser()
    parser_io_n.add_argument(
        name="_id_org", type=str, required=True, help="id organization cannot be blank")
    parser_io_n.add_argument(
        name="name", type=str, required=True, help="name inventory cannot be blank")
    
    parser_ion_n = reqparse.RequestParser()
    parser_ion_n.add_argument(
        name="_id_org", type=str, required=True, help="id organization cannot be blank")
    parser_ion_n.add_argument(
        name="_id", type=str, required=True, help="id inventory cannot be blank.")
    parser_ion_n.add_argument(
        name="name", type=str, required=True, help="name inventory cannot be blank")

    parser_ion = reqparse.RequestParser()
    parser_ion.add_argument(
        name="_id_org", type=str, required=True, help="id organization cannot be blank")
    parser_ion.add_argument(
        name="_id", type=str, required=True, help="id inventory cannot be blank.")

    # def get(self):
    #     pass

    @jwt_required
    def post(self):
        inpt = self.parser_io_n.parse_args()
        mycol = Tools.get_collection()
        try:
            x = mycol.update(
                {"_id": ObjectId(inpt["_id_org"])},
                {"$push": {
                    "inventory": {
                        "_id": get_id(),
                        "name": inpt["name"]
                        }
                    }}
            )
            if x["nModified"]:
                return {"message": "Inventory has been created."}, 202
            else:
                return {"message": "Failed create inventory"}, 404
        except:
            return {"message": "Something wrong in server."}, 500

    @jwt_required
    def put(self):
        inpt = Inventory.parser_ion_n.parse_args()
        mycol = Tools.get_collection()
        try:
            x = mycol.update_one(
                {"_id": ObjectId(inpt["_id_org"]), "inventory._id": inpt["_id"]},
                {"$set": {"inventory.$.name": inpt["name"]}}
            )
            if x.matched_count:
                return {"message": "inventory has been updated to {}".format(inpt["name"])}, 202
            else:
                return {"message": "Failed update inventory."}, 404 
        except:
            return {"message": "Something wrong in server."}, 500

    def delete(self):
        inpt = Inventory.parser_ion.parse_args()
        mycol = Tools.get_collection()
        try:
            x = mycol.update(
                {"_id": ObjectId(inpt["_id_org"])},
                {"$pull": {"inventory": {
                    "_id": inpt["_id"]
                    }
                }}
            )
            if x["nModified"]:
                return {"message": "Inventory has been deleted."}, 202
            else:
                return {"message": "Failed delete inventory."}, 404 
        except:
            return {"message": "Something wrong in server."}, 500
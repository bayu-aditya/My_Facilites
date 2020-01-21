from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity
from bson.objectid import ObjectId
from src.resources.unique_id import get_id
import pymongo


class Tools:
    @staticmethod
    def get_collection():
        myclient = pymongo.MongoClient("mongodb://35.240.223.151:27017/")
        mydb = myclient["myfacilities"]
        return mydb["organization"]


class Org:
    def __init__(self, row_db):
        self.data = row_db

    @property
    def _id(self):
        return str(self.data.get("_id", None))
    
    @property
    def admin(self):
        return self.data.get("admin", None)

    @property
    def name(self):
        return self.data.get("name", None)

    @property
    def desc(self):
        return self.data.get("desc", None)

    @property
    def inventory(self):
        return self.data.get("inventory", [])

    @property
    def num_inventory(self):
        return self.data.get("num_inventory", None)


class Organizations(Resource):
    @jwt_required
    def get(self):
        admin = get_jwt_identity()
        mycol = Tools.get_collection()
        result = list()
        for row in mycol.find({"admin": admin}):
            row = Org(row)
            result.append({
                "_id": row._id, 
                "name": row.name, 
                "admin": row.admin,
                "num_inv": row.num_inventory
            })
        return {"organization": result}, 200


class Organization(Resource):
    parser_i = reqparse.RequestParser()
    parser_i.add_argument(
        name="_id", type=str, required=True, help="_id cannot be blank")

    parser_ind = reqparse.RequestParser()
    parser_ind.add_argument(
        name="_id", type=str, required=True, help="_id cannot be blank")
    parser_ind.add_argument(
        name="name", type=str, required=True, help="name cannot be blank")
    parser_ind.add_argument(
        name="desc", type=str, required=True, help="desc cannot be blank")

    parser_nd = reqparse.RequestParser()
    parser_nd.add_argument(
        name="name", type=str, required=True, help="name cannot be blank")
    parser_nd.add_argument(
        name="desc", type=str, required=True, help="desc cannot be blank")

    @jwt_required
    def get(self):
        inpt = self.parser_i.parse_args()
        mycol = Tools.get_collection()
        row = mycol.find_one({"_id": ObjectId(inpt["_id"])})
        row = Org(row)
        result = {
            "_id": row._id,
            "admin": row.admin,
            "name": row.name,
            "desc": row.desc
        }
        return {"organization": result}, 200

    @jwt_required
    def post(self):
        inpt = self.parser_nd.parse_args()
        mycol = Tools.get_collection()
        mycol.insert_one({
            "admin": get_jwt_identity(), 
            "name": inpt["name"],
            "desc": inpt["desc"]
        })
        return {"message": "Organization {} has been created.".format(inpt["name"])}, 200

    @jwt_required
    def put(self):
        inpt = Organization.parser_ind.parse_args()
        mycol = Tools.get_collection()
        mycol.update_one(
            {"_id": ObjectId(inpt["_id"])}, 
            {"$set": {"name": inpt["name"], "desc": inpt["desc"]}}
        )
        return {"message": "Organization has been updated."}, 200   

    @jwt_required
    def delete(self):
        inpt = self.parser_i.parse_args()
        mycol = Tools.get_collection()
        mycol.delete_one({"_id": ObjectId(inpt["_id"])})
        return {"message": "Organization has been deleted."}, 200


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
        return {"inventory": result.inventory}, 200


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

    def get(self):
        pass

    def post(self):
        inpt = Inventory.parser_io_n.parse_args()
        mycol = Tools.get_collection()
        mycol.update(
            {"_id": ObjectId(inpt["_id_org"])},
            {"$push": {
                "inventory": {
                    "_id": get_id(),
                    "name": inpt["name"]
                    }
                }}
        )
        return {"message": "Inventory has been created"}, 200

    def put(self):
        inpt = Inventory.parser_ion_n.parse_args()
        mycol = Tools.get_collection()
        mycol.update_one(
            {"_id": ObjectId(inpt["_id_org"]), "inventory._id": inpt["_id"]},
            {"$set": {"inventory.$.name": inpt["name"]}}
        )
        return {"message": "inventory has been updated to {}".format(inpt["name"])}, 200

    def delete(self):
        inpt = Inventory.parser_ion.parse_args()
        mycol = Tools.get_collection()
        mycol.update(
            {"_id": ObjectId(inpt["_id_org"])},
            {"$pull": {"inventory": {
                "_id": inpt["_id"]
                }
            }}
        )
        return {"message": "Inventory has been deleted."}, 200
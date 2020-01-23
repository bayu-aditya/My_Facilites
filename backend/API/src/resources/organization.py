from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity
from bson.objectid import ObjectId
from src.model.organization import Org, Tools
from src.resources.unique_id import get_id


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
        return {"organization": result}, 202


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
        return {"organization": result}, 202

    @jwt_required
    def post(self):
        inpt = self.parser_nd.parse_args()
        mycol = Tools.get_collection()
        mycol.insert_one({
            "admin": get_jwt_identity(), 
            "name": inpt["name"],
            "desc": inpt["desc"]
        })
        return {"message": "Organization {} has been created.".format(inpt["name"])}, 202

    @jwt_required
    def put(self):
        inpt = Organization.parser_ind.parse_args()
        mycol = Tools.get_collection()
        mycol.update_one(
            {"_id": ObjectId(inpt["_id"])}, 
            {"$set": {"name": inpt["name"], "desc": inpt["desc"]}}
        )
        return {"message": "Organization has been updated."}, 202   

    @jwt_required
    def delete(self):
        inpt = self.parser_i.parse_args()
        mycol = Tools.get_collection()
        mycol.delete_one({"_id": ObjectId(inpt["_id"])})
        return {"message": "Organization has been deleted."}, 202
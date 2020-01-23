from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity
from bson.objectid import ObjectId
from src.model.organization import Org
from src.model.organization import Tools

class Members(Resource):
    parser_i = reqparse.RequestParser()
    parser_i.add_argument(
        name="_id", type=str, required=True, help="id organization cannot be blank")

    parser_i_n = reqparse.RequestParser()
    parser_i_n.add_argument(
        name="_id", type=str, required=True, help="id organization cannot be blank")
    parser_i_n.add_argument(
        name="member", type=str, required=True, help="username member cannot be blank")

    @jwt_required
    def get(self):
        inpt = self.parser_i.parse_args()
        mycol = Tools.get_collection()
        result = mycol.find_one(
            {"_id": ObjectId(inpt["_id"])}
        )
        if result is None:
            return {"message": "organization with id {} not found.".format(inpt["_id"])}, 404
        result = Org(result)
        return {"members": result.members}, 202

    @jwt_required
    def post(self):
        inpt = self.parser_i_n.parse_args()
        mycol = Tools.get_collection()
        try:
            x = mycol.update(
                {"_id": ObjectId(inpt["_id"])},
                {"$push": {
                    "members": inpt["member"]
                }}
            )
            if x["nModified"]:
                return {"message": "Member has been added."}, 202
            else:
                return {"message": "Failed add member"}, 404
        except:
            return {"message": "something wrong in server."}, 500

    @jwt_required
    def delete(self):
        inpt = self.parser_i_n.parse_args()
        mycol = Tools.get_collection()
        try:
            x = mycol.update(
                {"_id": ObjectId(inpt["_id"])},
                {"$pull": {"members": inpt["member"]}}
            )
            if x["nModified"]:
                return {"message": "member has been delete."}, 202
            else:
                return {"message": "Failed delete member"}, 404
        except:
            return {"message": "something wrong in server."}, 500
from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity
from bson.objectid import ObjectId

from src.variable import DEFAULT_COLOR

from src.model.user import UserModels
from src.model.organization import Org, Tools

class Members(Resource):
    parser_i = reqparse.RequestParser()
    parser_i.add_argument(name="_id", type=str, required=True, help="id organization cannot be blank")
    parser_i.add_argument(name="color", type=str, default=DEFAULT_COLOR)

    parser_i_n = reqparse.RequestParser()
    parser_i_n.add_argument(name="_id", type=str, required=True, help="id organization cannot be blank")
    parser_i_n.add_argument(name="member", type=str, required=True, help="username member cannot be blank")
    parser_i_n.add_argument(name="color", type=str, default=DEFAULT_COLOR)

    @jwt_required
    def get(self):
        inpt = self.parser_i.parse_args()
        try:
            mycol = Tools.get_collection()
            result = mycol.find_one(
                {"_id": ObjectId(inpt["_id"])}
            )
            if result is None:
                return {"message": "organization with id {} not found.".format(inpt["_id"])}, 404
            result = Org(result)
            return {
                "admin": result.admin,
                "members": result.members
                }, 202
        except:
            return {"message": "something wrong in server."}, 500

    @jwt_required
    def post(self):
        inpt = self.parser_i_n.parse_args()
        mycol = Tools.get_collection()
        try:
            user = UserModels.find_by_email(inpt["member"])
            if user is None:
                user = UserModels.find_by_username(inpt["member"])
                if user is None:
                    return {"message": "username or email not found"}, 404

            x = mycol.update(
                {"_id": ObjectId(inpt["_id"])},
                {"$push": {
                    "members": {
                        "username": user.username,
                        "color": inpt["color"],
                        }
                }}
            )
            if x["nModified"]:
                return {"message": "Member has been added."}, 202
            else:
                return {"message": "Failed add member"}, 404
        except:
            return {"message": "something wrong in server."}, 500

    @jwt_required
    def put(self):
        inpt = self.parser_i.parse_args()
        username = get_jwt_identity()
        mycol = Tools.get_collection()
        try:
            member = mycol.update(
                {"_id": ObjectId(inpt["_id"]), "members.username": username},
                {"$set": {"members.$.color": inpt["color"]}}
            )
            if member["nModified"]:
                return {"message": "Member has been updated."}, 202
            else:
                admin = mycol.update(
                    {"_id": ObjectId(inpt["_id"]), "administrator.username": username},
                    {"$set": {"administrator.$.color": inpt["color"]}}
                )
                if admin["nModified"]:
                    return {"message": "Administrator has been updated."}, 202
            return {"message": "Failed update member"}, 404
        except:
            return {"message": "something wrong in server."}, 500

    @jwt_required
    def delete(self):
        inpt = self.parser_i_n.parse_args()
        mycol = Tools.get_collection()
        try:
            x = mycol.update(
                {"_id": ObjectId(inpt["_id"])},
                {"$pull": {"members": {"username": inpt["member"]}}}
            )
            if x["nModified"]:
                return {"message": "member has been delete."}, 202
            else:
                return {"message": "Failed delete member"}, 404
        except:
            return {"message": "something wrong in server."}, 500
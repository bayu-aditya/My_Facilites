from flask_restful import Resource, reqparse
from werkzeug.security import safe_str_cmp
from flask_jwt_extended import create_access_token, create_refresh_token
from src.model.user import Database, UserModels

parser = reqparse.RequestParser()
parser.add_argument(
    name="username", type=str, required=True, help="username cannot be blank")
parser.add_argument(
    name="password", type=str, required=True, help="password cannot be blank")

class Register(Resource):
    def post(self):
        inpt = parser.parse_args()
        user = UserModels.find_by_username(inpt["username"])
        if user:
            return {"message": "username has used, try again"}, 400

        try:
            db = Database()
            db.execute(
                "INSERT INTO user (username, password) VALUES (%s, %s)", 
                (inpt["username"], inpt["password"])
                )
            db.commit()
            return {"message": "user has been created."}, 200
        except:
            return {"message": "something wrong in server."}, 500

class Login(Resource):
    def post(self):
        inpt = parser.parse_args()
        user = UserModels.find_by_username(inpt["username"])        

        if user:
            if safe_str_cmp(user.password, inpt["password"]):
                access_token = create_access_token(identity=user.username, fresh=True)
                refresh_token = create_refresh_token(user.username)
                return {
                    "access_token": access_token,
                    "refresh_token": refresh_token
                }, 202
            return {"message": "invalid credentials"}, 401
        return {"message": "username not found"}, 404
from flask_restful import Resource, reqparse
from werkzeug.security import safe_str_cmp
from flask_jwt_extended import (
    jwt_required,
    create_access_token, 
    create_refresh_token, 
    jwt_refresh_token_required,
    get_jwt_identity
    )
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

class User(Resource):
    # FOR FUTURE, CHANGE RETURN ONLY NAME, NOT USERNAME
    @jwt_required
    def get(self):
        current_name = get_jwt_identity()
        return {"name": current_name}, 202
        

class TokenRefresh(Resource):
    @jwt_refresh_token_required
    def post(self):
        current_user = get_jwt_identity()
        new_token = create_access_token(identity=current_user, fresh=False)
        return {"access_token": new_token}, 202
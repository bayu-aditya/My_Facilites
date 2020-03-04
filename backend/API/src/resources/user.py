from flask_restful import Resource, reqparse
from werkzeug.security import safe_str_cmp
from flask_jwt_extended import (
    jwt_required, 
    jwt_refresh_token_required,
    get_jwt_identity
    )
from google.oauth2 import id_token
from google.auth.transport import requests
from src.model.user import Database, UserModels, GoogleUser
from src.variable import GOOGLE_CLIENT_ID

class Register(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument(name="name", type=str, required=True, help="name cannot be blank")
    parser.add_argument(name="username", type=str, required=True, help="username cannot be blank")
    parser.add_argument(name="email", type=str, required=True, help="email cannot be blank")
    parser.add_argument(name="password", type=str, required=True, help="password cannot be blank")

    def post(self):
        inpt = self.parser.parse_args()
        user = UserModels.find_by_username(inpt["username"])
        if user:
            return {"message": "username has used, try again"}, 400

        try:
            user = UserModels(
                name = inpt["name"],
                username = inpt["username"],
                mode = 0,
                email = inpt["email"],
                password = inpt["password"],
                avatar = None
            )
            user.create_user()
            return {"message": "user has been created."}, 202
        except:
            return {"message": "something wrong in server."}, 500

class Login(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument(name="username", type=str, required=True, help="username cannot be blank")
    parser.add_argument(name="password", type=str, required=True, help="password cannot be blank")

    def post(self):
        inpt = self.parser.parse_args()
        user = UserModels.find_by_username(inpt["username"])        

        if user:
            if safe_str_cmp(user.password, inpt["password"]):
                return {
                    "access_token": user.access_token,
                    "refresh_token": user.refresh_token
                }, 202
            return {"message": "invalid credentials"}, 401
        return {"message": "username not found"}, 404

class Login_Google(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument(name="token", type=str, required=True, help="google token cannot be blank")

    def post(self):
        inpt = self.parser.parse_args()
        try:
            idinfo = id_token.verify_oauth2_token(inpt["token"], requests.Request(), GOOGLE_CLIENT_ID)
            if idinfo["iss"] not in ['accounts.google.com', 'https://accounts.google.com']:
                return {"message": "Invalid google token"}, 404
            
            user = GoogleUser.find_by_username(idinfo["sub"])
            if not user:
                user = GoogleUser(
                    name=idinfo["name"],
                    username=idinfo["sub"],
                    email=idinfo["email"],
                    avatar=idinfo["picture"]
                )
                user.create_user()
            else:
                user.update_avatar_field(idinfo["picture"])

            return {
                "access_token": user.access_token,
                "refresh_token": user.refresh_token
            }, 202
        except:
            return {"message": "Something wrong in server"}, 500

class User(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument(name="name", type=str, required=True, help="name cannot be blank")
    parser.add_argument(name="email", type=str, required=True, help="email cannot be blank")

    @jwt_required
    def get(self):
        username = get_jwt_identity()
        user = UserModels.find_by_username(username)

        if not user:
            return {"message": "username not found"}, 404

        return {
            "name": user.name,
            "username": user.username,
            "email": user.email,
            "avatar": user.avatar
            }, 202

    @jwt_required
    def put(self):
        username = get_jwt_identity()
        inpt = self.parser.parse_args()
        user = UserModels.find_by_username(username)
        data = {
            "name": inpt["name"],
            "email": inpt["email"],
        }
        try:
            user.update_user(**data)
            return {"message": "user has been updated."}, 202
        except:
            return {"message": "something wrong in server."}, 500

class TokenRefresh(Resource):
    @jwt_refresh_token_required
    def post(self):
        username = get_jwt_identity()
        user = UserModels.find_by_username(username)
        if user:
            return {"access_token": user.access_token_refresher}, 202
        return {"message": "username not found"}, 404
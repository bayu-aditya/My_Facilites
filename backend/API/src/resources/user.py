from flask_restful import Resource, reqparse
from werkzeug.security import safe_str_cmp
from flask_jwt_extended import (
    jwt_required,
    create_access_token, 
    create_refresh_token, 
    jwt_refresh_token_required,
    get_jwt_identity
    )
from google.oauth2 import id_token
from google.auth.transport import requests
from src.model.user import Database, UserModels
from src.variable import GOOGLE_CLIENT_ID

class Register(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument(
        name="name", type=str, required=True, help="name cannot be blank")
    parser.add_argument(
        name="username", type=str, required=True, help="username cannot be blank")
    parser.add_argument(
        name="email", type=str, required=True, help="email cannot be blank")
    parser.add_argument(
        name="password", type=str, required=True, help="password cannot be blank")

    def post(self):
        inpt = self.parser.parse_args()
        user = UserModels.find_by_username(inpt["username"])
        if user:
            return {"message": "username has used, try again"}, 400

        try:
            db = Database()
            db.execute(
                "INSERT INTO user (name, username, mode, email, password) VALUES (%s, %s, %s, %s, %s)", 
                (inpt["name"], inpt["username"], 0, inpt["email"], inpt["password"])
                )
            db.commit()
            return {"message": "user has been created."}, 202
        except:
            return {"message": "something wrong in server."}, 500

class Login(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument(
        name="username", type=str, required=True, help="username cannot be blank")
    parser.add_argument(
        name="password", type=str, required=True, help="password cannot be blank")

    def post(self):
        inpt = self.parser.parse_args()
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

class Login_Google(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument(
        name="token", type=str, required=True, help="google token cannot be blank")

    def post(self):
        inpt = self.parser.parse_args()
        try:
            idinfo = id_token.verify_oauth2_token(inpt["token"], requests.Request(), GOOGLE_CLIENT_ID)
            if idinfo["iss"] not in ['accounts.google.com', 'https://accounts.google.com']:
                return {"message": "Invalid google token"}, 404

            username = idinfo["sub"]
            
            user = UserModels.find_by_username(username)
            if user:
                access_token = create_access_token(identity=user.username, fresh=True)
                refresh_token = create_refresh_token(user.username)
                return {
                    "access_token": access_token,
                    "refresh_token": refresh_token
                }, 202
            else:
                # NEW MEMBER, Create user in database user and give access token and refresh token.
                UserModels.create_google_user(
                    name=idinfo["name"],
                    username=username,
                    email=idinfo["email"]
                )
                user = UserModels.find_by_username(username)
                user.update_avatar_field(idinfo["picture"])
                access_token = create_access_token(identity=username, fresh=True)
                refresh_token = create_refresh_token(username)
                return {
                    "access_token": access_token,
                    "refresh_token": refresh_token
                }, 202
        except:
            return {"message": "Invalid google token"}, 404

class User(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument(
        name="name", type=str, required=True, help="name cannot be blank")
    parser.add_argument(
        name="email", type=str, required=True, help="email cannot be blank")

    @jwt_required
    def get(self):
        username = get_jwt_identity()
        user = UserModels.find_by_username(username)
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
        current_user = get_jwt_identity()
        new_token = create_access_token(identity=current_user, fresh=False)
        return {"access_token": new_token}, 202
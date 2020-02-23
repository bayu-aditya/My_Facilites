import os
from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.datastructures import FileStorage
from google.cloud import storage

from src.secret import GOOGLE_SECRET_KEY_PATH
from src.variable import (
    GOOGLE_BUCKET_NAME, 
    GOOGLE_BUCKET_PHOTOPROFILE_PATH
    )
from src.resources.unique_id import get_avatar_id
from src.model.user import UserModels
from src.model.avatar import AvatarModels

class Tools:
    @staticmethod
    def get_extension(filename:str) -> str:
        return filename.split(".")[-1].lower()

    @staticmethod
    def get_random_avatar_filename(filename:str) -> str:
        return get_avatar_id() + "." + Tools.get_extension(filename)

    @staticmethod
    def avatar_link_to_blobname(link:str) -> str:
        filename = link.split("/")[-1]
        return os.path.join(GOOGLE_BUCKET_PHOTOPROFILE_PATH, filename)

class Avatar(Resource):
    @jwt_required
    def put(self):
        username = get_jwt_identity()
        try: 
            user = AvatarModels.find_by_username(username)

            file = request.files["image"]
            user.upload(file)
            return {
                "message": "Avatar has been updated"
                }, 202
        except:
            return {"message": "Something Wrong in server"}, 500

    @jwt_required
    def delete(self):
        username = get_jwt_identity()
        try: 
            userAvatar = AvatarModels.find_by_username(username)
            if (userAvatar.avatar) is None:
                return {"message": "Avatar is none, so nothing is deleted."}, 202                
            
            userAvatar.delete()
            return {
                "message": "Avatar has been deleted"
                }, 202
        except:
            return {"message": "Something Wrong in server"}, 500
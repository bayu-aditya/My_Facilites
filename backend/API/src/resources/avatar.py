import os
from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity

from src.model.avatar import AvatarModels
from src.model.request_file import ReqFile
from src.variable import AVATAR_EXTENSIONS, AVATAR_MAX_BYTES

class Avatar(Resource):
    @jwt_required
    def put(self):
        username = get_jwt_identity()
        try: 
            user = AvatarModels.find_by_username(username)
            file = request.files["image"]
            
            extension = ReqFile.get_extension(file)
            size = ReqFile.get_size_in_bytes(file)

            if (extension not in AVATAR_EXTENSIONS):
                return {"message": "file with extension {} disallowed".format(extension)}, 403
            if (size > AVATAR_MAX_BYTES):
                return {'message': "photo cannot exceed 1 MB"}, 403

            user.upload(file)
            return {"message": "Avatar has been updated"}, 202
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
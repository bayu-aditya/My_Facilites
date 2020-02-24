import os
import traceback
from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity

from src.model.user import UserModels
from src.model.avatar import AvatarModels
from src.model.request_file import ReqFile
from src.variable import AVATAR_EXTENSIONS, AVATAR_MAX_BYTES

class Avatar(Resource):
    @jwt_required
    def put(self):
        username = get_jwt_identity()
        try: 
            file = request.files["image"]
            user = UserModels.find_by_username(username)
            avatar = AvatarModels(user, file)

            if (avatar.extension not in AVATAR_EXTENSIONS):
                return {"message": "file with extension {} disallowed".format(avatar.extension)}, 403
            if (avatar.size_in_bytes > AVATAR_MAX_BYTES):
                return {'message': "photo cannot exceed 5 MB"}, 403

            avatar.upload()
            return {"message": "Avatar has been updated"}, 202
        except Exception:
            traceback.print_exc()
            return {"message": "Something Wrong in server"}, 500

    @jwt_required
    def delete(self):
        username = get_jwt_identity()
        try: 
            user = UserModels.find_by_username(username)
            if (user.avatar) is None:
                return {"message": "Avatar is none, nothing was deleted."}, 202                
            
            AvatarModels.delete(user)
            return {
                "message": "Avatar has been deleted"
                }, 202
        except Exception:
            traceback.print_exc()
            return {"message": "Something Wrong in server"}, 500
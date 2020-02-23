import os
from google.cloud import storage

from src.model.user import UserModels
from src.model.mysql import Database
from src.model.request_file import ReqFile
from src.secret import GOOGLE_SECRET_KEY_PATH
from src.variable import (
    GOOGLE_BUCKET_NAME, 
    GOOGLE_BUCKET_PHOTOPROFILE_PATH
    )
from src.resources.unique_id import get_avatar_id

class AvatarModels(UserModels):
    def __init__(self, *args):
        super().__init__(*args)

    def __bucket(self):
        client = storage.Client.from_service_account_json(GOOGLE_SECRET_KEY_PATH)
        return client.get_bucket(GOOGLE_BUCKET_NAME)

    def _get_blobname(self):
        filename = self.avatar.split("/")[-1]
        return os.path.join(GOOGLE_BUCKET_PHOTOPROFILE_PATH, filename)

    def upload(self, request_file):
        """
        Upload and replace files in google cloud storage when avatar in this username is not none.
        After that, changing the avatar field in the database.
        """
        reqfile = ReqFile(request_file)
        bucket = self.__bucket()

        if self.avatar:
            try:
                bucket.delete_blob(self._get_blobname())
            except:
                pass

        blob = bucket.blob(GOOGLE_BUCKET_PHOTOPROFILE_PATH + reqfile.random_filename)
        cont_type = "image/" + reqfile.extension
        blob.upload_from_string(reqfile.data, content_type=cont_type)
        blob.make_public()
        self.update_avatar_field(blob.public_url)

    def delete(self):
        """
        Remove files in google cloud storage. After that, changing the avatar field becomes NULL in the database.
        """
        bucket = self.__bucket()
        try:
            bucket.delete_blob(self._get_blobname())
        except:
            pass
        self.delete_avatar_field()
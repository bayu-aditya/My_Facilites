import json
from src.secret.path import GOOGLE_OAUTH_PATH

DEFAULT_COLOR = "#00E396"
GOOGLE_BUCKET_NAME = "bayu_storage_singapore"
GOOGLE_BUCKET_PHOTOPROFILE_PATH = "MyFacilities/PhotoProfile/"
AVATAR_EXTENSIONS = ("jpeg", "jpg", "png")
AVATAR_MAX_BYTES = 5 * 1024 * 1024      # 5 MB

with open(GOOGLE_OAUTH_PATH) as f:
    data = json.load(f)
    GOOGLE_CLIENT_ID = data.get("ClientID", None)
    GOOGLE_SECRET_ID = data.get("SecretID", None)
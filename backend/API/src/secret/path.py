import os

current_dir = os.path.dirname(os.path.realpath(__file__))
files_dir = os.path.join(current_dir, "files")

GOOGLE_SECRET_KEY_PATH = os.path.join(files_dir, "UndergraduateThesis-3b212c5fe793.json")
GOOGLE_OAUTH_PATH = os.path.join(files_dir, "GoogleOauth.json")
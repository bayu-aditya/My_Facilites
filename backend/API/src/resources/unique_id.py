from datetime import datetime
from uuid import uuid4, uuid1

def get_id() -> str:
    """
    Generates 25 characters of unique ID based on date and time now.
    """
    x = datetime.now().strftime('%Y%m%d%H%M%S-') + str(uuid4())
    return x.replace("-", "")[-25:]

def get_avatar_id() -> str:
    """
    Generates 35 characters of unique ID based on date and time now.
    This ID is used for avatar.
    """
    x = datetime.now().strftime('%Y%m%d%H%M%S-') + str(uuid4())
    return x.replace("-", "")[-40:]
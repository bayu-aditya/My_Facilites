from datetime import datetime
from uuid import uuid4

def get_id():
    """
        Generates 25 characters of unique ID based on date and time now.
    """
    x = datetime.now().strftime('%Y%m%d%H%M%S-') + str(uuid4())
    return x.replace("-", "")[-25:]
import pymongo

class Tools:
    @staticmethod
    def get_collection():
        myclient = pymongo.MongoClient("mongodb://192.168.0.7:27017/")
        # myclient = pymongo.MongoClient("mongodb://35.240.223.151:27017/")
        mydb = myclient["myfacilities"]
        return mydb["organization"]


class Org:
    def __init__(self, row_db):
        self.data = row_db

    @property
    def _id(self):
        return str(self.data.get("_id", None))
    
    @property
    def admin(self):
        return self.data.get("admin", None)

    @property
    def name(self):
        return self.data.get("name", None)

    @property
    def desc(self):
        return self.data.get("desc", None)

    @property
    def inventory(self):
        return self.data.get("inventory", [])

    @property
    def num_inventory(self):
        return len(self.inventory)

    @property
    def members(self):
        return self.data.get("members", [])

    @property
    def num_members(self):
        return len(self.members)
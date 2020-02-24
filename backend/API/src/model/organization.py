from bson.objectid import ObjectId
import pymongo

from src.variable import DEFAULT_COLOR
from src.model.user import UserModels

class Tools:
    @staticmethod
    def get_collection():
        myclient = pymongo.MongoClient("mongodb://192.168.0.7:27017/")
        mydb = myclient["myfacilities"]
        return mydb["organization"]


class Org:
    def __init__(self, row_db):
        self.data = row_db

    @classmethod
    def find_by_id(cls, id_organization):
        mycol = Tools.get_collection()
        row = mycol.find_one({"_id": ObjectId(id_organization)})
        return cls(row)

    def get_color_from_username(self, username):
        data = self.admin + self.members
        for person in data:
            if (person.get("username") == username):
                return person.get("color")
        return None

    @property
    def _id(self):
        return str(self.data.get("_id", None))

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
    def admin(self):
        """
        Get administrator of an organization. It can handle when 'color' key is not present in database.
        Default 'value' for color key is #00E396 
        """
        administrator = list()
        result = self.data.get("administrator", administrator)
        for i in result:
            user = UserModels.find_by_username(i["username"])
            i["avatar"] = user.avatar
            if i.get("color", None) == None:
                i["color"] = DEFAULT_COLOR
            administrator.append(i)
        return administrator

    @property
    def members(self):
        """
        Get member of an organization. It can handle when 'color' key is not present in database.
        Default 'value' for color key is #00E396 
        """
        members = list()
        result = self.data.get("members", members)
        for i in result:
            user = UserModels.find_by_username(i["username"])
            i["avatar"] = user.avatar
            if i.get("color", None) == None:
                i["color"] = DEFAULT_COLOR
            members.append(i)
        return members

    @property
    def num_members(self):
        return len(self.members)
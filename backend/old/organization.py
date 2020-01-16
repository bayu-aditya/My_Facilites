# author: Bayu Aditya
import sqlite3
from flask_restful import Resource, reqparse


# TABLE organizations:
#  +-----------+----------------+------------------+
#  |   user    |   name(url)    |   description    |
#  |   [str]   |     [str]      |       [str]      |
#  +-----------+----------------+------------------+

LOC_DATABASE = "database/myfacilities.db"


class Organizations(Resource):
    # list all organizations
    def get(self):
        connection = sqlite3.connect(LOC_DATABASE)
        cursor = connection.cursor()

        result = cursor.execute("SELECT * FROM organizations ORDER BY user, name")
        lists = list()
        for row in result:
            lists.append(
                {"user":row[0], "name":row[1], "description":row[2]}
            )

        connection.close()
        return {"organizations": lists}


class Tools_user:
    @staticmethod
    def find_by_user(user):
        connection = sqlite3.connect(LOC_DATABASE)
        cursor = connection.cursor()
        result = cursor.execute("SELECT * FROM organizations WHERE user=?", (user,))
        list_org = result.fetchall()
        
        connection.close()
        if list_org:
            return list_org
        else:
            return None

    @staticmethod
    def find_by_name(user, name):
        connection = sqlite3.connect(LOC_DATABASE)
        cursor = connection.cursor()
        result = cursor.execute("SELECT * FROM organizations WHERE user=? AND name=?", (user,name))
        list_org = result.fetchall()
        
        connection.close()
        if list_org:
            return list_org
        else:
            return None


class Organization(Resource):
    # name and description keys must be exist,
    parser = reqparse.RequestParser()
    parser.add_argument(name = "name", 
        type = str, required = True, help = "name cannot be blank"
    )
    parser.add_argument(name = "description",
        type = str, required = True, help = "describe cannot be blank"
    )
    # name key must be exist,
    parser_name = reqparse.RequestParser()
    parser_name.add_argument(name = "name",
        type = str, required = True, help = "name cannot be blank"
    )

    def get(self, user):
        Data = Tools_user.find_by_user(user)
        if Data:
            rows = []
            for i in Data:
                row = {"user": i[0], "name": i[1], "description": i[2]}
                rows.append(row)
            return rows
        else:
            return {"message": "user not found."}

    def post(self, user):
        input_data = Organization.parser.parse_args()
        name = input_data["name"]
        desc = input_data["description"]

        # check if organization name in user already exists
        Data = Tools_user.find_by_name(user, name)
        if Data:
            return {"message": "organization name already exists."}
        
        connection = sqlite3.connect(LOC_DATABASE)
        cursor = connection.cursor()
        cursor.execute("CREATE TABLE IF NOT EXISTS organizations (user text, name text, description text)")
        
        cursor.execute(
            "INSERT INTO organizations VALUES (?, ?, ?)", (user, name, desc)
        )
        connection.commit()
        connection.close()
        return {"message": "organization has been created."}

    def put(self, user):
        input_data = Organization.parser.parse_args()
        name = input_data["name"]
        desc = input_data["description"]

        # check if organization name in user must be exists
        Data = Tools_user.find_by_user(user)
        if Data is None:
            return {"message": "organization not found."}

        connection = sqlite3.connect(LOC_DATABASE)
        cursor = connection.cursor()
        cursor.execute(
            "UPDATE organizations SET name=?, description=? WHERE user=?", 
            (name, desc, user)
        )

        connection.commit()
        connection.close()
        return {"message": "organization has been updated."}

    def delete(self, user):
        input_data = Organization.parser_name.parse_args()
        name = input_data["name"]

        # check name organization must be exists
        Data = Tools_user.find_by_name(user, name)
        if Data is None:
            return {"message": "organization not found."}
        
        connection = sqlite3.connect(LOC_DATABASE)
        cursor = connection.cursor()
        cursor.execute("DELETE FROM organizations WHERE user=? AND name=?", (user, name))

        connection.commit()
        connection.close()
        return {"message": "organization has been deleted."}


class Inventories(Resource):
    # list of all item in a organization
    def get(self, name):
        pass


class Item(Resource):
    # get information of an item
    def get(self, name, item):
        pass

    # adding an item
    def post(self, name, item):
        pass

    # update an item
    def put(self, name, item):
        pass

    # delete an item
    def delete(self, name, item):
        pass
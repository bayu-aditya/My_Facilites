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

        result = cursor.execute("SELECT * FROM organizations")
        lists = list()
        for row in result:
            lists.append(
                {"user":row[0], "name":row[1], "description":row[2]}
            )

        connection.close()
        return {"organizations": lists}


class Data_organization:
    def __init__(self, user, name, description):
        self.user = user
        self.name = name
        self.description = description

    @classmethod
    def find_by_name(cls, name):
        connection = sqlite3.connect(LOC_DATABASE)
        cursor = connection.cursor()

        result = cursor.execute("SELECT * FROM organizations WHERE name=?", (name,))
        row = result.fetchone()
        connection.close()
        if row:
            return cls(*row)    # cls(row[0], row[1], row[2])
        else:
            return None


class Organization(Resource):
    # user and argument cannot be blank
    parser = reqparse.RequestParser()
    parser.add_argument(name = "user",
        type = str,
        required = True,
        help = "user cannot be blank"
    )
    parser.add_argument(name = "description",
        type = str, 
        required = True,
        help = "describe cannot be blank"
    )
    
    # get an organization information
    def get(self, name):
        Data = Data_organization.find_by_name(name)
        if Data:
            return {"user": Data.user, "name": Data.name, "description": Data.description}
        else:
            return {"message": "organization not found."}


    # create an organization (must be unique)
    def post(self, name):
        input_data = Organization.parser.parse_args()
        connection = sqlite3.connect(LOC_DATABASE)
        cursor = connection.cursor()

        # check if organization name already exists
        Data = Data_organization.find_by_name(name)
        if Data:
            return {"message": "organization name already exists."}

        cursor.execute("CREATE TABLE IF NOT EXISTS organizations (user text, name text, description text)")
        
        cursor.execute(
            "INSERT INTO organizations VALUES (?, ?, ?)", 
            (input_data["user"], name, input_data["description"])
        )
        
        connection.commit()
        connection.close()
        return {"message": "organization has been created."}


    # Update an organization
    def put(self, name):
        input_data = Organization.parser.parse_args()
        connection = sqlite3.connect(LOC_DATABASE)
        cursor = connection.cursor()

        # check name organization must be exists
        Data = Data_organization.find_by_name(name)
        if Data is None:
            return {"message": "organization not found."}

        cursor.execute(
            "UPDATE organizations SET user=?, description=? WHERE name=?", 
            (input_data["user"], input_data["description"], name)
        )

        connection.commit()
        connection.close()
        return {"message": "organization has been updated."}


    # delete an organization
    def delete(self, name):
        connection = sqlite3.connect(LOC_DATABASE)
        cursor = connection.cursor()

        # check name organization must be exists
        Data = Data_organization.find_by_name(name)
        if Data is None:
            return {"message": "organization not found."}

        cursor.execute("DELETE FROM organizations WHERE name=?", (name,))

        connection.commit()
        connection.close()
        return {"message": "organization has been deleted."}
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
        connection = sqlite3.connect(LOC_DATABASE)
        cursor = connection.cursor()

        result = cursor.execute("SELECT * FROM organizations WHERE name=?", (name,))
        row = result.fetchone()

        connection.close()
        return {"user": row[0], "name": row[1], "description": row[2]}


    # create an organization (must be unique)
    def post(self, name):
        # TO DO: NAME MUST BE UNIQUE
        data = Organization.parser.parse_args()

        connection = sqlite3.connect(LOC_DATABASE)
        cursor = connection.cursor()
        
        cursor.execute("CREATE TABLE IF NOT EXISTS organizations (user text, name text, description text)")

        cursor.execute(
            "INSERT INTO organizations VALUES (?, ?, ?)", 
            (data["user"], name, data["description"])
        )
        
        connection.commit()
        connection.close()
        return {"message": "organization has been created."}


    # Update an organization
    def put(self, name):
        # TO DO: NAME MUST BE EXISTS
        data = Organization.parser.parse_args()
        connection = sqlite3.connect(LOC_DATABASE)
        cursor = connection.cursor()

        cursor.execute(
            "UPDATE organizations SET user=?, description=? WHERE name=?", 
            (data["user"], data["description"], name)
        )

        connection.commit()
        connection.close()
        return {"message": "organization has been updated."}


    # delete an organization
    def delete(self, name):
        # TO DO: NAME MUST BE EXISTS
        connection = sqlite3.connect(LOC_DATABASE)
        cursor = connection.cursor()

        cursor.execute("DELETE FROM organizations WHERE name=?", (name,))

        connection.commit()
        connection.close()
        return {"message": "organization has been deleted."}
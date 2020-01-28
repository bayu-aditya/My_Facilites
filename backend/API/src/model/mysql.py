import mysql.connector

class Database:
    def __init__(self):
        self.mydb = mysql.connector.connect(
            host="35.240.223.151",
            # host = "192.168.0.6",
            user="api",
            passwd="apimyfacilities",
            database="myfacilities"
        )

    def execute(self, query, values):
        cursor = self.mydb.cursor()
        cursor.execute(query, values)
        return cursor

    def commit(self):
        return self.mydb.commit()
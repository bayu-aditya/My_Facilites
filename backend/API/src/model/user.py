import mysql.connector

class Database:
    def __init__(self):
        self.mydb = mysql.connector.connect(
            host="35.240.223.151",
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

class UserModels:
    def __init__(self, username, password):
        self.username = username
        self.password = password

    @classmethod
    def find_by_username(cls, username):
        db = Database()
        try:
            result = db.execute(
                "SELECT username, password FROM user WHERE username=%s", (username,)
                ).fetchone()
            if result:
                return cls(*result)
            else:
                return None
        except:
            return {"message": "Something wrong in server."}, 500
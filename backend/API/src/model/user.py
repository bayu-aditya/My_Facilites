from src.model.mysql import Database


class UserModels:
    def __init__(self, name, username, email, password):
        self.__name = name
        self.__username = username
        self.__email = email
        self.__password = password

    @classmethod
    def find_by_username(cls, username):
        db = Database()
        try:
            result = db.execute(
                "SELECT name, username, email, password FROM user WHERE username=%s", (username,)
                ).fetchone()
            if result:
                return cls(*result)
            else:
                return None
        except:
            return {"message": "Something wrong in server."}, 500
    
    def update_user(self, **kwargs):
        username = self.__username
        name = kwargs.get("name")
        email = kwargs.get("email")

        db = Database()
        db.execute(
            "UPDATE user SET name=%s, email=%s WHERE username=%s",
            (name, email, username)
        )
        db.commit()

    @property
    def name(self):
        return self.__name

    @property
    def username(self):
        return self.__username

    @property
    def email(self):
        return self.__email

    @property
    def password(self):
        return self.__password
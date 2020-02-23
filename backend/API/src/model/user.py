from src.model.mysql import Database


class UserModels:
    def __init__(self, name, username, email, password, avatar):
        self.__name = name
        self.__username = username
        self.__email = email
        self.__password = password
        self.__avatar = avatar

    @classmethod
    def find_by_username(cls, username):
        db = Database()
        result = db.execute(
            "SELECT name, username, email, password, avatar FROM user WHERE username=%s", (username,)
            ).fetchone()
        if result:
            return cls(*result)
        else:
            return None
    
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

    def update_avatar_field(self, link_avatar):
        username = self.__username
        db = Database()
        db.execute(
            "UPDATE user SET avatar=%s WHERE username=%s",
            (link_avatar, username)
        )
        db.commit()

    def delete_avatar_field(self):
        username = self.__username
        db = Database()
        db.execute(
            "UPDATE user SET avatar = NULL WHERE username=%s",
            (username,)
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

    @property
    def avatar(self):
        return self.__avatar
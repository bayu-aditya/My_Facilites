from flask_jwt_extended import (
    create_access_token,
    create_refresh_token
)

from src.model.mysql import Database


class UserModels:
    def __init__(self, name, username, mode, email, password, avatar):
        self.__name = name
        self.__username = username
        self.__mode = mode
        self.__email = email
        self.__password = password
        self.__avatar = avatar
        self.__access_token = None
        self.__refresh_token = None

    @classmethod
    def find_by_username(cls, username):
        db = Database()
        result = db.execute(
            "SELECT name, username, mode, email, password, avatar FROM user WHERE username=%s", (username,)
            ).fetchone()
        if result:
            return cls(*result)
        else:
            return None

    def create_user(self):
        db = Database()
        db.execute(
            "INSERT INTO user (name, username, mode, email, password) VALUES (%s, %s, %s, %s, %s)", 
            (self.name, self.username, 0, self.email, self.password)
            )
        db.commit()

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
        db = Database()
        db.execute(
            "UPDATE user SET avatar=%s WHERE username=%s",
            (link_avatar, self.__username)
        )
        db.commit()

    def delete_avatar_field(self):
        db = Database()
        db.execute(
            "UPDATE user SET avatar = NULL WHERE username=%s",
            (self.__username,)
        )
        db.commit()

    @property
    def name(self):
        return self.__name

    @property
    def username(self):
        return self.__username

    @property
    def mode(self):
        return self.__mode

    @property
    def email(self):
        return self.__email

    @property
    def password(self):
        return self.__password

    @property
    def avatar(self):
        return self.__avatar

    @property
    def access_token(self):
        return create_access_token(identity = self.__username, fresh = True)

    @property
    def access_token_refresher(self):
        return create_access_token(identity = self.__username, fresh = False)

    @property
    def refresh_token(self):
        return create_refresh_token(identity = self.__username)

class GoogleUser(UserModels):
    def __init__(self, name, username, email, avatar):
        super().__init__(name, username, 1, email, None, avatar)

    @classmethod
    def find_by_username(cls, username):
        db = Database()
        result = db.execute(
            "SELECT name, username, email, avatar FROM user WHERE username=%s", (username,)
            ).fetchone()
        if result:
            return cls(*result)
        else:
            return None

    def create_user(self):
        db = Database()
        db.execute(
            "INSERT INTO user (name, username, mode, email, avatar) VALUES (%s, %s, %s, %s, %s)",
            (self.name, self.username, self.mode, self.email, self.avatar)
        )
        db.commit()
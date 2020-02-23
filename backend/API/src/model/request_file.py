from src.resources.unique_id import get_avatar_id

class ReqFile:
    def __init__(self, request_file):
        self.__file = request_file

    @property
    def data(self):
        return self.__file.read()

    @property
    def filename(self):
        return self.__file.filename

    @property
    def extension(self):
        return self.filename.split(".")[-1].lower()

    @property
    def random_filename(self):
        return get_avatar_id() + "." + self.extension
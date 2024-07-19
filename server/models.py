from config import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)

    def __init__(self, username, password, email):
        self.username = username

    def __repr__(self):
        return f'<User {self.username}>'
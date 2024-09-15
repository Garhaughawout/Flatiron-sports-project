from config import db
from sqlalchemy.orm import validates

class User(db.Model):
    __tablename__ = 'users'
    
    uid = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    first_name = db.Column(db.String(50), nullable=True)
    last_name = db.Column(db.String(50), nullable=True)
    email = db.Column(db.String(100), unique=True, nullable=False)

    # @validates('username')
    # def validate_username(self, username, key):
    #     if not username:
    #         raise AssertionError('No username provided')
    #     if User.query.filter(User.username == username).first():
    #         raise AssertionError('Username is already in use')
    #     if len(username) < 5:
    #         raise AssertionError('Username must be at least 5 characters')
    #     return username
    
    # @validates('email')
    # def validate_email(self, email, key):
    #     if not email:
    #         raise AssertionError('No email provided')
    #     if User.query.filter(User.email == email).first():
    #         raise AssertionError('Email is already in use')
    #     return self.email
    
    # @validates('password')
    # def validate_password(self, password, key):
    #     if not password:
    #         raise AssertionError('No password provided')
    #     if len(password) < 5:
    #         raise AssertionError('Password must be at least 5 characters')
    #     return self.password
    

    # Will be working on validations for first_name and last_name

    # @validates('first_name')
    # def validate_first_name(self, first_name, key):
    #     if (first_name.isalpha()):
    #         return first_name
    #     else: 
    #         raise AssertionError('First name must be alphabetical characters')
        
    # @validates('last_name')
    # def validate_last_name(self, last_name, key):
    #     if (last_name.isalpha()):
    #         return last_name
    #     else: 
    #         raise AssertionError('Last name must be alphabetical characters')

    def to_dict(self):
        return {
            'uid': self.uid,
            'username': self.username,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name
        }

    def __init__(self, username, password, email, first_name, last_name):
        self.username = username
        self.password = password
        self.email = email
        self.first_name = first_name
        self.last_name = last_name

    def serialize(self):
        return {
            'uid': self.uid,
            'username': self.username,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name
        }

    def __repr__(self):
        return f'<User: {self.username}>'


class Group(db.Model):
    __tablename__ = 'groups'

    id = db.Column(db.Integer, primary_key=True)
    sport = db.Column(db.String(50), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    skill_level = db.Column(db.String(50), nullable=False)
    date = db.Column(db.String(50), nullable=False)
    time = db.Column(db.String(50), nullable=False)
    people_needed = db.Column(db.Integer, nullable=False)
    people_list = db.Column(db.String(200), nullable=True)
    user_id = db.Column(db.Integer, nullable=False)
    

    def __init__(self, sport, location, skill_level, date, time, user_id, people_needed, people_list):
        self.sport = sport
        self.location = location
        self.skill_level = skill_level
        self.date = date
        self.time = time
        self.people_needed = people_needed
        self.people_list = people_list
        self.user_id = user_id

    def serialize(self):
        return {
            'id': self.id,
            'sport': self.sport,
            'location': self.location,
            'skill_level': self.skill_level,
            'date': self.date,
            'time': self.time,
            'people_needed': self.people_needed,
            'people_list': self.people_list,
            'user_id': self.user_id
        }
    
    def __repr__(self):
        return f'<Group {self.id}>'
    
    def __str__(self):
        return self.sport 
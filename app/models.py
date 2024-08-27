from config import db

class User(db.Model):
    __tablename__ = 'users'
    
    uid = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    first_name = db.Column(db.String(50), nullable=True)
    last_name = db.Column(db.String(50), nullable=True)
    email = db.Column(db.String(100), unique=True, nullable=False)

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
from config import db

class User(db.Model):
    __tablename__ = 'users'
    
    uid = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)

    def __init__(self, username, password, email):
        self.username = username
        self.password = password
        self.email = email

    def serialize(self):
        return {
            'uid': self.uid,
            'username': self.username,
            'email': self.email
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
    user_id = db.Column(db.Integer, nullable=False)
    

    def __init__(self, sport, location, skill_level, date, time, user_id, people_needed):
        self.sport = sport
        self.location = location
        self.skill_level = skill_level
        self.date = date
        self.time = time
        self.people_needed = people_needed
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
            'user_id': self.user_id
        }
    
    def __repr__(self):
        return f'<Group {self.id}>'
    
    def __str__(self):
        return self.sport 
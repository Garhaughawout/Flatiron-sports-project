from routes import app, bcrypt
from models import db, User, Group


if __name__ == '__main__':
    with app.app_context():
        print('Creating tables...')
        User.query.delete()
        Group.query.delete()

        users = []
        for i in range(1):
            user = User(
                username='garhaughawout',
                password=bcrypt.generate_password_hash('password').decode('utf-8'),
                email='garhaughawou123@gmail.com')
            users.append(user)
            db.session.add_all(users)
            db.session.commit()

        groups = []
        for i in range(6):
            group = Group(
                sport='Basketball',
                location='New York',
                skill_level='Beginner',
                date='2021-01-01',
                time='12:00',
                people_needed=5,
                user_id=1)
            groups.append(group)
            db.session.add_all(groups)
            db.session.commit()

        print('Tables created')
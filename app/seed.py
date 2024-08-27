from routes import app, bcrypt
from models import db, User, Group


if __name__ == '__main__':
    with app.app_context():
        print('Creating tables...')
        User.query.delete()
        Group.query.delete()

        users = []
        for i in range(1):
            user1 = User(
                username='garhaughawout',
                password=bcrypt.generate_password_hash('password').decode('utf-8'),
                email='garhaughawout123@gmail.com',
                first_name='Garrett',
                last_name='Haughawout'
                )
            user2 = User(
                username='john_doe',
                password=bcrypt.generate_password_hash('password').decode('utf-8'),
                email='johndoe@gmail.com',
                first_name='John',
                last_name='Doe'
                )
            user3 = User(
                username='jane_doe',
                password=bcrypt.generate_password_hash('password').decode('utf-8'),
                email='janedoe@gmail.com',
                first_name='Jane',
                last_name='Doe'
                )
            users.append(user1)
            users.append(user2)
            users.append(user3)
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
                people_list='Garrett Haughawout, John Doe, Jane Doe',
                user_id=1)
            groups.append(group)
            db.session.add_all(groups)
            db.session.commit()

        print('Tables created')
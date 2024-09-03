from flask import request, jsonify, session
from config import db, bcrypt, app
from models import User, Group
from flask_jwt_extended import create_access_token, jwt_required, create_refresh_token, get_jwt_identity


@app.route('/', methods=['GET', 'POST'])
def index():
    return 'Hello World'
        
@app.route('/check_session', methods=['GET'])
def check_loggedin():
    if 'user_id' in session:
        return jsonify({'message': 'User is logged in'})
    else:
        return jsonify({'message': 'User is not logged in'})
                
@app.route('/signup', methods=['POST', 'GET'])
def signup():
    if request.method == 'GET':
        return 'Sign up page'
    elif request.method == 'POST':
        request_data = request.get_json()
        username = request_data.get('username')
        password = request_data.get('password')
        email = request_data.get('email')
        first_name = request_data.get('first_name')
        last_name = request_data.get('last_name')

        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        user = User(username=username, password=hashed_password, email=email, first_name=first_name, last_name=last_name)

        db.session.add(user)
        db.session.commit()

        return jsonify({'message': 'User created'})
    
@app.route('/login', methods=['POST'])
def login():
    request_data = request.get_json()
    username = request_data.get('username')
    password = request_data.get('password')

    user = User.query.filter_by(username=username).first()
    if user and bcrypt.check_password_hash(user.password, password):
        access_token = create_access_token(identity=user.uid)
        refresh_token = create_refresh_token(identity=user.uid)
        session['user_id'] = user.uid
        user = User.query.filter_by(username=username).first()
        return jsonify({'access_token': access_token}, 
                       {'username': user.username, 'email': user.email, 'uid': user.uid, 'password': user.password}, 
                       {'refresh_token': refresh_token} )
    else:
        return jsonify({'message': 'Invalid credentials'}), 401
    
@app.route('/logout', methods=['DELETE'])
def logout():
    session.pop('user_id', None)
    return jsonify({'message': 'User logged out'})
    
@app.route('/user/<int:uid>', methods=['GET'])
@jwt_required()
def get_user(uid):
    user = User.query.get(uid)
    if user:
        return jsonify(user.serialize())
    else:
        return jsonify({'message': 'User not found'}), 404
    

@app.route('/groups', methods=['GET'])
def get_groups():
    groups = Group.query.all()
    return jsonify([group.serialize() for group in groups])
    
@app.route('/group/<int:id>', methods=['DELETE','GET', 'POST'])
def get_group(id):
    if request.method == 'DELETE':
        group = Group.query.get(id)
        db.session.delete(group)
        db.session.commit()
        return jsonify({'message': 'Group deleted'})
    elif request.method == 'POST':
        group = Group.query.get(id)
        request_data = request.get_json()
        people_list = request_data.get('people_list')
        group_list = group.people_list.split(',')

        for person in group_list:
            if person == people_list:
                group_list.remove(person)
                group.people_list = ','.join(group_list)
                db.session.commit()
                return jsonify({'message': 'Person removed from the Group'})   
        else:
            group.people_list = group.people_list + ',' + people_list
            db.session.commit()
            return jsonify({'message': 'Group updated'})
    else: 
        group = Group.query.get(id)
        if group:
            return jsonify(group.serialize())
        else:
            return jsonify({'message': 'Group not found'}), 404
    
@app.route('/group', methods=['POST'])
def create_group():
    request_data = request.get_json()
    sport = request_data.get('sport')
    location = request_data.get('location')
    skill_level = request_data.get('skill')
    date = request_data.get('date')
    time = request_data.get('time')
    people_needed = request_data.get('people')
    user_id = request_data.get('user_id')
    
    group = Group(sport=sport, location=location, skill_level=skill_level, date=date, time=time, people_needed=people_needed, user_id=user_id)
    
    db.session.add(group)
    db.session.commit()
    
    return jsonify({'message': 'Group created'})
    

if __name__ == '__main__':
    app.run(debug=True)
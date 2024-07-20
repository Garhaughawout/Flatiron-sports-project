from flask import Flask, request, jsonify, redirect, url_for
from config import app, db, api
from models import User
from flask_restful import Resource



@app.route('/')
def index():
    users = User.query.all()
    users_list_html = [f'<li>{user.username}</li>' for user in users]
    return f'<ul>{"".join(users_list_html)}</ul>'

@app.route('/add/<username>')
def add_user(username):
    db.session.add(User(username=username))
    db.session.commit()
    return redirect(url_for('index'))




# class UserResource(Resource):
#     def get(self):
#         users = User.query.all()
#         return jsonify([user.serialize() for user in users])

#     def post(self):
#         data = request.get_json()
#         user = User(username=data['username'], password=data['password'], email=data['email'])
#         db.session.add(user)
#         db.session.commit()
#         return jsonify(user.serialize())
    
#     def put(self, user_id):
#         user = User.query.get(user_id)
#         data = request.get_json()
#         user.username = data['username']
#         user.password = data['password']
#         user.email = data['email']
#         db.session.commit()
#         return jsonify(user.serialize())
    
#     def delete(self, user_id):
#         user = User.query.get(user_id)
#         db.session.delete(user)
#         db.session.commit()
#         return jsonify(user.serialize())
    
# api.add_resource(UserResource, '/users', '/users/<int:user_id>')



if __name__ == '__main__':
    app.run(port=5555, debug=True)
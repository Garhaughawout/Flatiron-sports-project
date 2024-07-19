from flask import Flask, request, jsonify
from config import app, db, api
from models import User
from flask_restful import Resource


class UserResource(Resource):
    def get(self):
        users = User.query.all()
        return jsonify([user.serialize() for user in users])

    def post(self):
        data = request.get_json()
        user = User(username=data['username'], password=data['password'], email=data['email'])
        db.session.add(user)
        db.session.commit()
        return jsonify(user.serialize())
    
    def put(self, user_id):
        user = User.query.get(user_id)
        data = request.get_json()
        user.username = data['username']
        user.password = data['password']
        user.email = data['email']
        db.session.commit()
        return jsonify(user.serialize())
    
    def delete(self, user_id):
        user = User.query.get(user_id)
        db.session.delete(user)
        db.session.commit()
        return jsonify(user.serialize())
    
api.add_resource(UserResource, '/users', '/users/<int:user_id>')



if __name__ == '__main__':
    app.run(port=5555, debug=True)
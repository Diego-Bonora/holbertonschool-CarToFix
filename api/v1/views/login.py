#!/usr/bin/python3
"""login api"""

from api.v1.views import app_views
from flask import abort, jsonify, request
from models.user import User
from models import storage
import bcrypt


@app_views.route('/login', methods=['POST'])
def login():
    """User login"""

    if not request.get_json():
        abort(400, {"error": "Couldn’t get request; not a json"})

    data = request.get_json()
    email = data.get("mail")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Missing email or password"}), 400

    user = storage.get_mail(User, email)
    if user is None:
        return jsonify({"error": "User not found"}), 404

    if bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
        return jsonify({"message": "Logged in successfully"})
    else:
        return jsonify({"error": "Invalid email or password"}), 401

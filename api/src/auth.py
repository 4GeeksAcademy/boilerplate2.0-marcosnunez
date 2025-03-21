from flask import Blueprint, request, jsonify
from flask_jwt_extended import (
    create_access_token, get_csrf_token, jwt_required, set_access_cookies, unset_jwt_cookies, get_jwt_identity
)
from models import db, User
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/login", methods=["POST"])
def get_login():
    data = request.get_json()

    required_fields = ["email", "password"]
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    user = User.query.filter_by(email=data["email"]).first()
    if not user:
        return jsonify({"error": "User not found"}), 400

    if not bcrypt.check_password_hash(user.password_hash, data["password"]):
        return jsonify({"error": "Password not correct"}), 400

    access_token = create_access_token(identity=str(user.id))
    csrf_token = get_csrf_token(access_token)

    response = jsonify({
        "msg": "login successful",
        "user": user,
        "csrf_token": csrf_token
    })
    set_access_cookies(response, access_token)
    return response

@auth_bp.route("/logout", methods=["POST"])
@jwt_required()
def logout_with_cookies():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response

@auth_bp.route("/users", methods=["PUT"])
@jwt_required()
def edit_user():
    user_id = get_jwt_identity()
    existing_user = User.query.get(user_id)
    if not existing_user:
        return jsonify({"error": "User not found"}), 404

    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid input"}), 400

    existing_user.username = data.get("username", existing_user.username)
    existing_user.email = data.get("email", existing_user.email)
    existing_user.first_name = data.get("first_name", existing_user.first_name)
    existing_user.last_name = data.get("last_name", existing_user.last_name)
    existing_user.country = data.get("country", existing_user.country)
    existing_user.city = data.get("city", existing_user.city)
    existing_user.address = data.get("address", existing_user.address)
    existing_user.phone_number = data.get("phone_number", existing_user.phone_number)
    existing_user.photo = data.get("photo", existing_user.photo)

    try:
        db.session.commit()
        return jsonify({"message": "User updated successfully", "user": existing_user}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Database error", "details": str(e)}), 500

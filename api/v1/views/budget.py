#!/usr/bin/python3
""" This module contains the view for budgets """

from api.v1.views import app_views
from flask import abort, jsonify, request
from models.budget import Budget
from models import storage


@app_views.route("/budget/<bdgtId>/services", methods=["GET"])
def get_budget_services(bdgtId):
    """ Returns the services a budget contains """
    budget = storage.get(Budget, bdgtId)
    if not budget:
        abort(404, {"error": f"Budget: {bdgtId} instance not found"})

    servs = [serv.to_dict() for serv in budget.services]
    return jsonify(servs), 200


@app_views.route("/budget/<bdgtId>", methods=["GET"])
def get_budget(bdgtId):
    """ Returns a Budget based on its id """
    budget = storage.get(Budget, bdgtId)
    if not budget:
        abort(404, {"error": f"Budget: {bdgtId} instance not found"})

    return jsonify(budget.to_dict()), 200


@app_views.route("/budget", methods=["GET"])
def get_all_budgets():
    """ Returns all the Budget objects found """
    bdgts = [bdgt.to_dict() for bdgt in storage.all(Budget).values()]

    return jsonify(bdgts), 200


@app_views.route("/budget", methods=["POST"])
def create_budget():
    """ Creates a Budget object """
    krgs = request.get_json()
    needed = ["total_price", "payment_method", "user_id", "installments", "warranty", "vehicle_id"] # should set confirmed, set, and active
    if not krgs:
        abort(400, {"error": "Couldn’t get request; not a json"})

    for arg in needed:
        if arg not in krgs:
            abort(400, {"error": f"{arg} missing"})

    new_bdgt = Budget(**krgs)
    storage.new(new_bdgt)
    storage.save()

    return jsonify(new_bdgt.to_dict()), 201


@app_views.route("/budget/<bdgtId>", methods=["DELETE"])
def delete_budget(bdgtId):
    """ Deletes a Budget object based on its id """
    bdgt = storage.get(Budget, bdgtId)
    if not bdgt:
        abort(404, {"error": f"Budget: {bdgtId} instance not found"})

    storage.delete(bdgt)
    storage.save()
    return jsonify(""), 204


@app_views.route("/budget/<bdgtId>", methods=["REPOST"])
def update_budget(bdgtId):
    """ Creates a new Budget object based on the given one's id """
    # Getting the Budget object
    prev = storage.get(Budget, bdgtId)
    if not bdgt:
        abort (404, {"error": f"Budget: {bdgtId} not found"})

    # Extending the ditionary with previous instance attrs
    krgs = request.get_json().pop("id", None)
    if not krgs:
        abort(400, {"error": "Couldn’t get request; not a json"})

    krgs.update(prev.to_dict().pop("id", None))

    needed = ["total_price", "payment_method", "user_id", "installments", "warranty", "vehicle_id"] # should set confirmed, set, and active

    for arg in needed:
        if arg not in krgs:
            abort(400, {"error": f"{arg} missing"})

    # Creating a new instance
    new_bdgt = Budget(**krgs)

    storage.new(new_bdgt)
    storage.save()
    return jsonify(new_bdgt.to_dict()), 200

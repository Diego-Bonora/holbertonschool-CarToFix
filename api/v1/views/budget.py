#!/usr/bin/python3
""" This module contains the view for budgets """

<<<<<<< HEAD
from api.v1.views import app_views
from flask import abort, jsonify, request
from models.budget import Budget
from models import storage


=======

from api.v1.views import app_views
from flask import abort, jsonify, request
from models.budget import Budget
from models.mailer.Emailer import Emailer
from models import storage


emailer = Emailer()

def call_send(budget):
    """ Calls Emailer.send() """
    if budget.confirmed == False:
        emailer.send(storage.get(Client, budget.client_id), budget)

>>>>>>> api_main
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
<<<<<<< HEAD

    return jsonify(budget.to_dict()), 200
=======
    bdict = budget.to_dict()
    bdict["services"] = [serv.to_dict() for serv in budget.services]

    return jsonify(bdict), 200
>>>>>>> api_main


@app_views.route("/budget", methods=["GET"])
def get_all_budgets():
    """ Returns all the Budget objects found """
<<<<<<< HEAD
    bdgts = [bdgt.to_dict() for bdgt in storage.all(Budget).values()]

    return jsonify(bdgts), 200
=======
    bdict = {}

    for key, value in storage.all(Budget).items():
        bdict[key] = value.to_dict()
        bdict[key]["services"] = [serv.to_dict() for serv in value.services]

    return jsonify(bdict), 200
>>>>>>> api_main


@app_views.route("/budget", methods=["POST"])
def create_budget():
    """ Creates a Budget object """
    krgs = request.get_json()
<<<<<<< HEAD
    needed = ["total_price", "payment_method"]
=======
    needed = ["total_price", "payment_method", "user_id", "installments", "warranty", "vehicle_id", "client_id", "services"]
>>>>>>> api_main
    if not krgs:
        abort(400, {"error": "Couldn’t get request; not a json"})

    for arg in needed:
        if arg not in krgs:
            abort(400, {"error": f"{arg} missing"})

    new_bdgt = Budget(**krgs)
<<<<<<< HEAD
=======
    call_send(budget)
>>>>>>> api_main
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
<<<<<<< HEAD
    if not bdgt:
=======
    if not prev:
>>>>>>> api_main
        abort (404, {"error": f"Budget: {bdgtId} not found"})

    # Extending the ditionary with previous instance attrs
    krgs = request.get_json().pop("id", None)
    if not krgs:
        abort(400, {"error": "Couldn’t get request; not a json"})

    krgs.update(prev.to_dict().pop("id", None))

<<<<<<< HEAD
    # Creating a new instance
    new_bdgt = Budget(**krgs)
    storage.new(new_bdgt)

    # Setting the attrs
    for key, value in krgs.items():
        setattr(new_bdgt, key, value)

=======
    needed = ["total_price", "payment_method", "user_id", "installments", "warranty", "vehicle_id", "client_id", "services"]

    for arg in needed:
        if arg not in krgs:
            abort(400, {"error": f"{arg} missing"})

    # Creating a new instance
    new_bdgt = Budget(**krgs)
    call_send(new_bdgt)
    storage.new(new_bdgt)
>>>>>>> api_main
    storage.save()
    return jsonify(new_bdgt.to_dict()), 200

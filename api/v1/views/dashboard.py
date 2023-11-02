#!/usr/bin/python3
""" This module contains the view for dashboard """

from api.v1.views import app_views
from flask import abort, jsonify
from models.budget import Budget
from models.service import Service
from models import storage
from models.user import User
from models.vehicle import Vehicle

@app_views.route("/dashboard/<usrId>", methods=["GET"])
def dashboard(usrId):
    """ Returns the required data for the dashboard """
    user = storage.get(User, usrId)
    if not user:
        abort(404, {"error": f"User: {usrId} not found"})

    res = {}

    # Adds the user's name
    res["user_name"] = user.name
    
    # Adds the required information of servicess
    res["active"] = []
    for service in user.services:
        servs = {
                "plate": storage.get(Vehicle, service.vehicle_id).plate,
                "description": service.description,
                "budget": service.budget_id,
                }
        res["active"].append(servs)

    # Adds the required information of latest active budgets
    res["budgets"] = []
    allbdgts = [bdgt for bdgt in storage.all(Budget).values() if bdgt.user_id == usrId and bdgt.confirmed == True and datetime.utcnow() - bdgt.created_at <= timedelta(days=3)]
    for bdgt in allbdgts:
        bdgts = {
                "id": bdgt.id,
                "created": bdgt.created_at,
                "plate": storage.get(Vehicle, bdgt.vehicle_id).plate,
                "services": [service.title for service in budget.services],
                }
        res["budgets"].append(bdgts)

    return jsonify(res), 200
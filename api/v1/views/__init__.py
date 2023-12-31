#!/usr/bin/python3
""" This module imports the routes to make a blueprint """

from flask import Blueprint


app_views = Blueprint("app_views", __name__, url_prefix="/api/v1")

from api.v1.views.budget import *
from api.v1.views.service import *
from api.v1.views.vehicle import *
from api.v1.views.brand import *
from api.v1.views.user import *
from api.v1.views.client import *
from api.v1.views.type_vehicle import *
from api.v1.views.worker import *
from api.v1.views.dashboard import *
from api.v1.views.singin_singup import *
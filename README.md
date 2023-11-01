# api/app.py

To run it:
```
$ cd api/v1/
$ flask run
```
## Create a Budget:
You can create a single Budget with vehicles related using `create_a_budget_service.py`:
```
$ python3 create_a_budget_service.py 
[Service] (d58af18c-0dd0-4277-89a2-b65b6f1f46c5) {'_sa_instance_state': <sqlalchemy.orm.state.InstanceState object at 0x7f8d0e8ee710>, 'title': 'House burn down', 'description': "Arsonist's Lullabye - Hozier", 'note': 'A piano was required', 'vehicle_id': 'ce6fd674-2cf9-4036-a906-129f2fc5efda', 'user_id': 'a39c6129-3855-48fd-9d71-d0ba1c0ef35c', 'budget_id': 'fe04c58b-a574-4bf1-b218-819394942b50', 'price': 4.9, 'created_at': datetime.datetime(2023, 10, 31, 20, 46, 58, 243731), 'id': 'd58af18c-0dd0-4277-89a2-b65b6f1f46c5'}
---------
[Service] (6f4707dc-2d86-497d-9344-d2a3bc2d0f5a) {'_sa_instance_state': <sqlalchemy.orm.state.InstanceState object at 0x7f8d0e8ee780>, 'title': 'Electrify a hammock', 'description': "It Don't Mean a Thing (If It Ain't Got That Swing)", 'note': 'Worker died in the process', 'vehicle_id': 'ce6fd674-2cf9-4036-a906-129f2fc5efda', 'user_id': 'a39c6129-3855-48fd-9d71-d0ba1c0ef35c', 'budget_id': 'fe04c58b-a574-4bf1-b218-819394942b50', 'price': 0.0, 'created_at': datetime.datetime(2023, 10, 31, 20, 46, 58, 243792), 'id': '6f4707dc-2d86-497d-9344-d2a3bc2d0f5a'}
---------
[Service] (e5f99ee9-bda5-4587-a869-f16444f87cde) {'_sa_instance_state': <sqlalchemy.orm.state.InstanceState object at 0x7f8d0e8ee7f0>, 'title': 'Kill delivery service', 'description': 'Summertime - George Gershwin', 'note': 'A piano was required', 'vehicle_id': 'ce6fd674-2cf9-4036-a906-129f2fc5efda', 'user_id': 'a39c6129-3855-48fd-9d71-d0ba1c0ef35c', 'budget_id': 'fe04c58b-a574-4bf1-b218-819394942b50', 'price': 200000.0, 'created_at': datetime.datetime(2023, 10, 31, 20, 46, 58, 243845), 'id': 'e5f99ee9-bda5-4587-a869-f16444f87cde'}
---------
BUDGET
---------
[Budget] (fe04c58b-a574-4bf1-b218-819394942b50) {'_sa_instance_state': <sqlalchemy.orm.state.InstanceState object at 0x7f8d0e8ee6a0>, 'user_id': 'a39c6129-3855-48fd-9d71-d0ba1c0ef35c', 'total_price': 400.0, 'payment_method': 'Credit-Card', 'installments': 0, 'warranty': 0, 'vehicle_id': 'ce6fd674-2cf9-4036-a906-129f2fc5efda', 'confirmed': False, 'sent': False, 'active': False, 'created_at': datetime.datetime(2023, 10, 31, 20, 46, 58, 243629), 'id': 'fe04c58b-a574-4bf1-b218-819394942b50', 'services': [<models.service.Service object at 0x7f8d0e8ee748>, <models.service.Service object at 0x7f8d0e8ee7b8>, <models.service.Service object at 0x7f8d0e8ee828>]}
Alright
```
At the end of the file:
* It will also create another budget, and vehicle... for population and variety purposes.
	* The dictionaries used to create them were provided, so they can be used, to post or update request.
* It will also create instances of some other objects, which were required;
	* 2(Brand)
	* 3(Service) and 2(Service) | almost the same data, for both of the budgets
	* Client
	* User
        * Type_vehicle
	* 2(Vehicle)
	* 2(Budget)


## Routes
### User() Routes:
- [x] GET /api/v1/usr/<usrId> | get a specific user
- [x] GET /api/v1/usr | get all users
- [x] POST /api/v1/usr | create an user
- [x] DELETE /api/v1/user/<usrId> | delete a specific user
- [x] PUT /api/v1/user/<usrId> | update a specific user

### Service() Routes:
- [x] GET /api/v1/service/<scId> | get a specific service
- [x] GET /api/v1/service | get all services 
- [x] POST /api/v1/service | create a service
- [x] DELETE /api/v1/service/<scId> | delete a specific service
- [x] PUT /api/v1/service/<scId> | update a specific service

### Vehicle() Routes:
- [x] GET /api/v1/vehicle/<veId>/service | get all services for a specific vehicle
- [x] GET /api/v1/vehicle/<veId>/budget | get all budgets for a specific vehicle
- [x] GET /api/v1/vehicle/<velId> | get a specific vehicle
- [x] GET /api/v1/vehicle | get all vehicles
- [x] POST /api/v1/vehicle | create a vehicle
- [x] DELETE /api/v1/vehicle/<veId> | delete a specific vehicle
- [x] PUT /api/v1/vehicle/<veId> | update a specific vehicle

### Brand() Routes:
- [x] GET /api/v1/brand/<brId> | get a specific brand
- [x] GET /api/v1/brand | get all brands
- [x] POST /api/v1/brand | create a brand
- [x] DELETE /api/v1/brand/<brId> | delete a specific brand
- [x] PUT /api/v1/brand/<brId> | update a specific brand

### Client() Routes:
- [x] GET /api/v1/client/<clnId>/vehicle | get all vehicles for a specific client
- [x] GET /api/v1/client/<clnId> | get a specific client
- [x] GET /api/v1/client | get all clients
- [x] POST /api/v1/client | create a client
- [x] DELETE /api/v1/client/<clnId> | delete a specific client
- [x] PUT /api/v1/client/<clId> | update a specific client

### Budget() Routes:
- [x] GET /api/v1/budget/<bdgtId>/services | get all services for a specific budget
- [x] GET /api/v1/budget/<bdgtId> | get a specific budget
- [x] GET /api/v1/budget | get all budgets
- [x] POST /api/v1/budget | create a budget
- [x] DELETE /api/v1/budget/<bdgtId> | delete a budget
- [x] REPOST /api/v1/budget/<bdgtId> | update a budget (the object will be destroyed and re-made)

### Type() Routes:
- [x] GET /api/v1/type/<tId> | get a specific type of vehicle
- [x] GET /api/v1/type | get all types of vehicle
- [x] POST /api/v1/type | create a new type of vehicle
- [x] DELETE /api/v1/type/<tId> | delete a specific type of vehicle
- [x] PUT /api/v1/type/<tId> | update a specific type of vehicle

### Workers() Routes:
- [x] GET /api/v1/worker | get all workers
- [x] GET /api/v1/worker/<dsgnId>/services | get all the services for a specific designee

No route should fail upon proper request.

- [ ] Budgets call emailer
#### Last:
- The server handles multiple request at a time
- All request are allowed, from anywhere.
- No debug mode on by default.
- Cannot create the a new brand with the same name as one that exists already.
- New checking attributes for post and repost for budget

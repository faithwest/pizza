
from flask import Flask, request, jsonify
from flask_migrate import Migrate
from models import db, Pizza, Restaurant, RestaurantPizza
from flask_sqlalchemy import SQLAlchemy



app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///pizza.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
migrate = Migrate(app, db)

#restaurants
@app.route('/restaurants', methods=['GET'])
def get_restaurants():
    restaurants = Restaurant.query.all()
    return jsonify([{'id': r.id, 'name': r.name, 'address': r.address} for r in restaurants])

@app.route('/restaurants/<int:restaurant_id>', methods=['GET'])
def get_restaurant(restaurant_id):
    restaurant = Restaurant.query.get(restaurant_id)
    if restaurant:
        pizzas = [{'id': p.id, 'name': p.name, 'ingredients': p.ingredients} for p in restaurant.pizzas]
        return jsonify({'id': restaurant.id, 'name': restaurant.name, 'address': restaurant.address, 'pizzas': pizzas})
    else:
        return jsonify({'error': 'Restaurant not found'}), 404

@app.route('/restaurants/<int:id>', methods=['DELETE'])
def delete_restaurant(id):
    restaurant = Restaurant.query.get(id)

    if restaurant is None:
        return jsonify({'error': 'Restaurant not found'}), 404

    db.session.delete(restaurant)
    db.session.commit()

    return '', 204        

#pizzas.restaurants-container {
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 8px;
  margin: 20px;
}

h1 {
  font-size: 28px;
  margin-bottom: 20px;
}

.restaurants-list {
  list-style: none;
  padding: 0;
}

.restaurant-item {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.restaurant-link {
  text-decoration: none;
  color: #333;
  font-size: 20px;
}

.restaurant-address {
  margin-top: 5px;
  color: #777;
}

.delete-button {
  background-color: #ff6565;
  color: #fff;
  border: none;
  padding: 8px;
  cursor: pointer;
  border-radius: 4px;
}

.add-button {
  background-color: #4caf50;
  color: #fff;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 4px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}

.add-link {
  text-decoration: none;
  color: #fff;
}

@app.route('/pizzas', methods=['GET'])
def get_pizzas():
    pizzas = Pizza.query.all()
    return jsonify([{'id': p.id, 'name': p.name, 'ingredients': p.ingredients} for p in pizzas])


#RESTAURANTPIZZAS
@app.route('/restaurant_pizza', methods=['GET'])
def read_restaurant_pizza():
    restaurant_pizza = Restaurant_pizza.query.all()
    pizza_list = [{"price": rp.price, "pizza": rp.pizza.to_dict(), "restaurant": rp.restaurant.to_dict()} for rp in restaurant_pizza]
    return jsonify(pizza_list)

@app.route('/restaurant_pizzas', methods=['POST'])
def create_restaurant_pizzas():
    data = request.get_json()
    price = data.get('price')
    pizza_id = data.get('pizza_id')
    restaurant_id = data.get('restaurant_id')

    if not all([price, pizza_id, restaurant_id]):
        return jsonify({"errors": ["validation errors"]}), 400

    pizza = Pizza.query.get(pizza_id)
    restaurant = Restaurant.query.get(restaurant_id)

    if not (pizza and restaurant):
        return jsonify({"errors": ["validation errors"]}), 400

    restaurant_pizza = Restaurant_pizza(price=price, pizza=pizza, restaurant=restaurant)

    try:
        db.session.add(restaurant_pizza)
        db.session.commit()
        return jsonify({"id": pizza.id, "name": pizza.name, "ingredients": pizza.ingredients})
    except Exception as e:
        db.session.rollback()
        return jsonify({"errors": [str(e)]}), 500
    




if __name__ == '__main__':
    app.run(port=6000,debug=True)

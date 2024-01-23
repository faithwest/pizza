from faker import Faker
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from models import db, Pizza, Restaurant, RestaurantPizza

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///pizza.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

fake = Faker()


def seed_data():
    with app.app_context():
        db.create_all()

        # Seed Restaurants
        for _ in range(10):
            restaurant = Restaurant(name=fake.company(), address=fake.address())
            db.session.add(restaurant)

        # Seed Pizzas
        for _ in range(10):
            pizza = Pizza(name=fake.word(), ingredients=fake.text())
            db.session.add(pizza)

        db.session.commit()

        restaurants = Restaurant.query.all()
        pizzas = Pizza.query.all()

        for restaurant in restaurants:
            pizzas_to_associate = fake.random_elements(elements=pizzas, length=fake.random_int(min=1, max=5), unique=True)

            for pizza in pizzas_to_associate:
                restaurant_pizza = RestaurantPizza(price=fake.random_int(min=5, max=20), restaurant=restaurant, pizza=pizza)
                db.session.add(restaurant_pizza)

        db.session.commit()
if __name__ == '__main__':
    seed_data()
    print("Seeding started -----")
    print("Seeded successfully")

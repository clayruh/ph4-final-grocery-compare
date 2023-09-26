#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
from models import Consumer, Cart, Product, Price, Supermarket
import random

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!

        print("Deleting old data..")

        Consumer.query.delete()
        Cart.query.delete()
        Product.query.delete()
        Price.query.delete()
        Supermarket.query.delete()

        print("Creating consumers...")

        consumer_list = []

        for _ in range(15):
            consumer = Consumer( name= faker.name(), address= faker.address())

            consumer_list.append(consumer)
            db.session.add(consumer_list)
            db.session.commit()
        
        print("Creating Products...")

        print("Creating supermarket...")

        supermarket_list = []

        for _ in range(5):
            supermarket = Supermarket(name = faker.company(), address = faker.address())
            supermarket_list.append(supermarket)
            db.session.add(supermarket_list)
            db.session.commit()

        product_list = []

        for _ in range(50):
            product = Product(name= faker.product(), consumer_id = consumer_list, supermarket_id = supermarket_list)

            product_list.append(product)
            db.session.add(product_list)
            db.session.commit()
        
        print("Creating cart...")

        cart_list = []

        for _ in range(10):
            cart = Cart( consumer_id = consumer_list, product_id = product_list)
            cart_list.append(cart)
            db.session.add(cart_list)
            db.session.commit()


        print("Creating Prices...")

        price_list = []

        for _ in range(50):
            price = Price(price = random.randint(1, 20), product_id = product_list, supermarket_id = supermarket_list)
            price_list.append(price)
            db.session.add(price_list)
            db.session.commit()



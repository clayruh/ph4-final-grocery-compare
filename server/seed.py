#!/usr/bin/env python3

# Standard library imports
from models import db, Consumer, CartItem, Product, Price, Supermarket
from app import app
from random import randint, choice as rc
from models import Consumer, CartItem, Product, Price, Supermarket

import random

# Remote library imports
from faker import Faker

faker = Faker()

# Local imports

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Clearing db...")
        Consumer.query.delete()
        CartItem.query.delete()
        Product.query.delete()
        Price.query.delete()
        Supermarket.query.delete()

        print("Starting seed...")

        print("Creating consumers...")

        consumer_list = []

        for _ in range(15):
            consumer = Consumer(name=faker.name(), address=faker.address())

            consumer_list.append(consumer)
            db.session.add_all(consumer_list)
            db.session.commit()

        print("Creating supermarket...")

        supermarket_list = []

        for _ in range(5):
            supermarket = Supermarket(
                name=faker.company(), address=faker.address())
            supermarket_list.append(supermarket)
            db.session.add_all(supermarket_list)
            db.session.commit()

        print("Creating Products...")
        product_list = []

        for _ in range(50):
            product = Product(
                name=faker.word(),
                image=faker.word()
            )
            product_list.append(product)
            db.session.add_all(product_list)
            db.session.commit()

        print("Creating cart_items...")

        cart_items_list = []

        for _ in range(10):
            cart_items = CartItem(
                consumer=random.choice(consumer_list), product=random.choice(product_list))
            cart_items_list.append(cart_items)
            db.session.add_all(cart_items_list)
            db.session.commit()

        print("Creating Prices...")

        price_list = []

        for _ in range(50):
            price = Price(price=str(random.randint(
                1, 20)), 
                product=random.choice(product_list), 
                supermarket=random.choice(supermarket_list))
            price_list.append(price)
            db.session.add_all(price_list)
            db.session.commit()

        print("Seeding complete!")
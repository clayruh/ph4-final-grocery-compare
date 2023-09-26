#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Consumer, Cart, Product, Price, Supermarket

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Clearing db...")
        Consumer.query.delete()
        Cart.query.delete()
        Product.query.delete()
        Price.query.delete()
        Supermarket.query.delete()

        print("Starting seed...")
        
        print("Seeding consumers...")
        

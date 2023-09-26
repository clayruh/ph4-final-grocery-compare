#!/usr/bin/env python3
from flask import request
from flask_restful import Resource

# Local imports
from config import app, db, api
from models import Product, Consumer, Cart, Price, Supermarket

# Views go here!
@app.route('/')
def index():
    return '<h1>Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)

# ====================================Consumers==========================================

@app.post('/consumers')
def create_consumers():
    pass

@app.patch('/consumers/<int:id>')
def update_consumer(id):
    pass

# =====================================Cart===============================================

@app.get('/carts/<int:id>')
def get_cart_by_id(id):
    pass

@app.post('/carts')
def create_cart():
    pass

@app.delete('/cart/<int:id>')
def delete_cart(id):
    pass

# ========================================Product==========================================

@app.get('/products')
def get_products():
    pass

@app.get('/products/<int:id>')
def get_product_by_id(id):
    pass

# =========================================Price===========================================

@app.get('/prices')
def get_prices():
    pass

# =========================================Supermarket======================================

@app.get('/supermarkets')
def get_supermarkets():
    pass

@app.get('/supermarkets/<int:id>')
def get_supermarket_by_id(id):
    pass



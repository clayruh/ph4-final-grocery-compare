#!/usr/bin/env python3
from flask import request, jsonify
from flask_restful import Resource

# Local imports
from config import app, db, api
from models import Product, Consumer, CartItem, Price, Supermarket

# Views go here!


@app.route('/')
def index():
    return '<h1>Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)

# ====================================Consumers==========================================


@app.post('/consumers')
def create_consumers():
    data = request.json

    new_consumer = Consumer(name=data['name'], address=data['address'])

    db.session.add(new_consumer)
    db.session.commit()

    return jsonify({new_consumer.to_dict()}), 201


@app.patch('/consumers/<int:id>')
def update_consumer(id):

    data = request.json

    Consumer.query.filter(Consumer.id == id).update(data)
    db.session.commit()
    consumer = Consumer.query.filter(Consumer.id == id).first()
    return consumer.to_dict(), 202


# =====================================Cart===============================================

@app.get('/cart_items/<int:id>')
def get_cart_by_id(id):
    try:
        cart = CartItem.query.filter(CartItem.id == id).first()
        return cart.to_dict(), 200
    except:
        return {"error": "cart not found"}, 404


@app.post('/cart_items')
def create_cart():

    data = request.json

    new_cart = CartItem(
        consumer_id=data['consumer_id'], product=data['product_id'])
    db.session.add(new_cart)
    db.session.commit()

    return new_cart.to_dict(), 201


@app.delete('/cart_items/<int:id>')
def delete_cart(id):
    try:
        cart = CartItem.query.filter(CartItem.id == id).first()
        db.session.delete(cart)
        db.session.commit()
        return cart.to_dict(), 204
    except:
        return {"error": "cart not found"}, 404

# ========================================Product==========================================


@app.get('/prices')
def get_products():

    products = Product.query.all()
    return [product.to_dict() for product in products]


@app.get('/products/<int:id>')
def get_product_by_id(id):
    try:
        product = Product.query.filter(Product.id == id).first()
        return product.to_dict(), 200
    except:
        return {"error": "product not found"}, 404


# =========================================Price===========================================

@app.get('/prices')
def get_prices():
    prices = Price.query.all()
    return [price.to_dict() for price in prices]


# =========================================Supermarket======================================

@app.get('/supermarkets')
def get_supermarkets():
    supermarkets = Supermarket.query.all()
    return [supermarket.to_dict() for supermarket in supermarkets]


@app.get('/supermarkets/<int:id>')
def get_supermarket_by_id(id):

    try:
        supermarket = Supermarket.query.filter(Supermarket.id == id).first()
        return supermarket.to_dict(), 200
    except:
        return {"error": "supermarket not found"}, 404

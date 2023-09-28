#!/usr/bin/env python3
from flask import request, jsonify
from flask_restful import Resource

# Local imports
from config import app, db
from models import Product, Consumer, CartItem, Price, Supermarket

@app.route('/')
def index():
    return '<h1>Grocery Compare Server</h1>'

# ====================================Consumers======================================

@app.post('/consumers')
def create_consumers():
    data = request.json
    new_consumer = Consumer(name=data['name'], address=data['address'])
    db.session.add(new_consumer)
    db.session.commit()
    return jsonify(new_consumer.to_dict()), 201


@app.patch('/consumers/<int:id>')
def update_consumer(id):
    data = request.json
    Consumer.query.filter(Consumer.id == id).update(data)
    db.session.commit()
    consumer = Consumer.query.filter(Consumer.id == id).first()
    return jsonify(consumer.to_dict(rules=('-cart_items.consumer_id', '-cart_items.product.prices', '-cart_items.product.prices.id', '-cart_items.product.prices.product_id', '-cart_items.product.prices.supermarket_id'))), 202

# ===========================Cart==================================

@app.get('/cart_items')
def get_carts():
    carts=CartItem.query.all()
    return jsonify([cart.to_dict() for cart in carts]), 200

@app.get('/cart_items/<int:id>')
def get_cart_by_id(id):
    try:
        # do we actually query by the consumer_id?
        cart_items = CartItem.query.filter(CartItem.consumer_id == id)
        return jsonify([cart.to_dict(rules=('-consumer',)) for cart in cart_items]), 200
    except:
        return {"error": "cart not found"}, 404

@app.post('/cart_items')
def create_cart():
    data = request.json
    new_cart = CartItem(
        consumer_id=data['consumer_id'], product_id=data['product_id'])
    # don't duplicate if product_id already exists
    db.session.add(new_cart)
    db.session.commit()
    return jsonify(new_cart.to_dict()), 201

@app.delete('/cart_items/<int:id>')
def delete_cart(id):
    # try:
        cart = CartItem.query.filter(CartItem.id == id).first()
        db.session.delete(cart)
        db.session.commit()
        return {}, 204
    # except:
    #     return jsonify({"error": "cart not found"}), 404

# ==========================Product==============================

@app.get('/products')
def get_products():
    products = Product.query.all()
    return jsonify([product.to_dict(rules=('-prices.supermarket_id', '-cart_items','-prices.id','-prices.product_id')) for product in products]), 200

@app.get('/products/<int:id>')
def get_product_by_id(id):
    try:
        product = Product.query.filter(Product.id == id).first()
        return jsonify(product.to_dict(rules=('-prices.supermarket_id', '-cart_items','-prices.id','-prices.product_id'))), 200
    except:
        return jsonify({"error": "product not found"}), 404

# ==========================Price==============================

@app.get('/prices')
def get_prices():
    prices = Price.query.all()
    return jsonify([price.to_dict(rules=('-supermarket_id', '-product.cart_items')) for price in prices]), 200

# ==========================Supermarket==========================

@app.get('/supermarkets')
def get_supermarkets():
    supermarkets = Supermarket.query.all()
    return jsonify([supermarket.to_dict(rules=('-prices.product_id','-prices.supermarket_id', '-prices.product.cart_items')) for supermarket in supermarkets]), 200

@app.get('/supermarkets/<int:id>')
def get_supermarket_by_id(id):
    try:
        supermarket = Supermarket.query.filter(Supermarket.id == id).first()
        return jsonify(supermarket.to_dict(rules=('-prices.product_id','-prices.supermarket_id', '-prices.product.cart_items'))), 200
    except:
        return jsonify({"error": "supermarket not found"}), 404
    
# ---------------------------------------- #

if __name__ == '__main__':
    app.run(port=5555, debug=True)
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db


class Consumer(db.Model, SerializerMixin):
    # customers
    __tablename__ = 'consumers'

    id = db.Column(db.Integer, primary_key=True, unique=True)
    name = db.Column(db.String, nullable=False)
    address = db.Column(db.String, nullable=False)

    products = db.relationship('Product', back_populates='consumer')
    supermarkets = association_proxy('products', 'supermarket')
    serialize_rules = ('-products.consumer',)


class CartItem(db.Model, SerializerMixin):

    __tablename__ = 'cart_items'

    id = db.Column(db.Integer, primary_key=True, unique=True)
    consumer_id = db.Column(db.Integer, db.ForeignKey('consumers.id'))
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))


class Product(db.Model, SerializerMixin):
    # Items: Joiner for store and customers
    __tablename__ = 'products'

    id = db.Column(db.Integer, primary_key=True, unique=True)
    name = db.Column(db.String, nullable=False)
    image = db.Column(db.String)
    consumer_id = db.Column(db.Integer, db.ForeignKey('consumers.id'))
    supermarket_id = db.Column(db.Integer, db.ForeignKey('supermarkets.id'))

    consumer = db.relationship('Consumer', back_populates='products')
    supermarket = db.relationship('Supermarket', back_populates='products')
    serialize_rules = ('-supermarket.products', '-consumer.products')

    def __repr__(self):
        return f"Product obj{self.id}: Item name: {self.name}"


class Price(db.Model, SerializerMixin):
    __tablename__ = 'prices'

    id = db.Column(db.Integer, primary_key=True, unique=True)
    price = db.Column(db.Float, nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))
    supermarket_id = db.Column(db.Integer, db.ForeignKey('supermarkets.id'))

    def __repr__(self):
        return f"Price obj{self.id}: ${self.price} for {self.product_id}"


class Supermarket(db.Model, SerializerMixin):
    # Store
    __tablename__ = 'supermarkets'

    id = db.Column(db.Integer, primary_key=True, unique=True)
    name = db.Column(db.String, nullable=False)
    address = db.Column(db.String, nullable=False)

    products = db.relationship('Product', back_populates='supermarket')
    consumers = association_proxy('products', 'consumers')
    serialize_rules = ('-products.supermarket',)

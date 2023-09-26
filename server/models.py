from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

# serializerMixin, association_proxy, relationships, validations

from config import db


class Consumer(db.Model, SerializerMixin):
    # customers
    __tablename__ = 'consumers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    address = db.Column(db.String, nullable=False)

    products = db.relationship('Product', back_populates='consumer')
    supermarkets = association_proxy('products', 'supermarket')
    serialize_rules = ('-products.consumer',)


# class Cart(db.Model, SerializerMixin):

#     __tablename__ = 'carts'

#     id = db.Column(db.Integer, primary_key=True)
#     consumer_id = db.Column(db.Integer, db.ForeignKey('consumers.id'))
#     product_id = db.Column(db.Integer, db.ForeignKey('products.id'))


class Product(db.Model, SerializerMixin):
    # Items: Joiner for store and customers
    __tablename__ = 'products'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    consumer_id = db.Column(db.Integer, db.ForeignKey('consumers.id'))
    supermarket_id = db.Column(db.Integer, db.ForeignKey('supermarkets.id'))

    consumer = db.relationship('Consumer', back_populates='products')
    supermarket = db.relationship('Supermarket', back_populates='products')
    serialize_rules = ('-supermarket.products', '-consumer.products')

    def __init__(self, name):
        self.name = name


# class Price(db.Model, SerializerMixin):
#     __tablename__ = 'prices'

#     id = db.Column(db.Integer, primary_key=True)
#     price = db.Column(db.Float, nullable=False)
#     product_id = db.Column(db.Integer, db.ForeignKey('products.id'))
#     supermarket_id = db.Column(db.Integer, db.ForeignKey('supermarkets.id'))

#     def __init__(self, price):
#         self.price = price


class Supermarket(db.Model, SerializerMixin):
    # Store
    __tablename__ = 'supermarkets'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    address = db.Column(db.String, nullable=False)

    products = db.relationship('Product', back_populates='supermarket')
    consumers = association_proxy('products', 'consumers')
    serialize_rules = ('-products.supermarket',)

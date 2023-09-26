from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
import flask 

# serializerMixin, association_proxy, relationships, validations

from config import db


class Consumer(db.Model, SerializerMixin):
    # customers
    __tablename__ = 'consumers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    address = db.Column(db.String, nullable=False)

# this is the main connection between the main bridge Product and the Supermarket
    products = db.relationship('Product', back_populates='consumer')
    supermarkets = association_proxy('products', 'supermarket')
    serialize_rules = ('-products.consumer',)

# this is the connection between the second bridge the Cart and the Product
    carts = db.relationship("Cart", back_populates='consumer')
    product = association_proxy('carts', 'product')
    serialize_rules = ('-carts.consumer', )


# this is the second Bridge which is between Consumer and Product
class Cart(db.Model, SerializerMixin):

    __tablename__ = 'carts'

    id = db.Column(db.Integer, primary_key=True)
    consumer_id = db.Column(db.Integer, db.ForeignKey('consumers.id'))
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))

    consumer = db.relationship("Consumer", back_populates='carts')
    product = db.relationship("Product", back_populates='carts')
    serialize_rules = ('-consumer.carts', '-product.carts')

# this is the main Bridge bewteen the Consumer and the Supermarket
class Product(db.Model, SerializerMixin):
    # Items: Joiner for store and customers
    __tablename__ = 'products'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    consumer_id = db.Column(db.Integer, db.ForeignKey('consumers.id'))
    supermarket_id = db.Column(db.Integer, db.ForeignKey('supermarkets.id'))

# this for the main connection which is the Consumer and Supermarket
    consumer = db.relationship('Consumer', back_populates='products')
    supermarket = db.relationship('Supermarket', back_populates='products')
    serialize_rules = ('-supermarket.products', '-consumer.products')

# this is for the second connection which is Consumer and Cart
    carts = db.relationship("Cart", back_populates='product')
    consumer = association_proxy('carts', 'consumer')
    serialize_rules = ('-carts.product', )

# this for the third connection which is the Price and Supermarket
    prices = db.relationship("Price", back_populates='product')
    supermarket = association_proxy("prices", "supermarket")
    serialize_rules = ('-prices.product', )


    def __init__(self, name):
        self.name = name

# this is the third bridge connecting Product and Supermarket
class Price(db.Model, SerializerMixin):
    __tablename__ = 'prices'

    id = db.Column(db.Integer, primary_key=True)
    price = db.Column(db.Float, nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))
    supermarket_id = db.Column(db.Integer, db.ForeignKey('supermarkets.id'))

    product = db.relationship("Product", back_populates="prices")
    supermarket = db.relationship("Supermarket", back_populates="prices")
    serialize_rules = ('-product.carts', '-supermarket.carts')

    def __init__(self, price):
        self.price = price


class Supermarket(db.Model, SerializerMixin):
    # Store
    __tablename__ = 'supermarkets'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    address = db.Column(db.String, nullable=False)

# for the main connection between Consumer and the main bridge Product
    products = db.relationship('Product', back_populates='supermarket')
    consumers = association_proxy('products', 'consumers')
    serialize_rules = ('-products.supermarket',)

# for the connection between Product and the second bridge Price
    prices = db.relationship("Price", back_populates='supermarket')
    product = association_proxy("prices", "product")
    serialize_rules = ('-prices.supermarket')

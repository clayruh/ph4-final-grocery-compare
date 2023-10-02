from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates, Session
from sqlalchemy.exc import NoResultFound
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData

import flask

from config import db
# db = SQLAlchemy(app)
# session = Session()


# =============================== CUSTOMERS ==================================#


class Consumer(db.Model, SerializerMixin):
    __tablename__ = 'consumers'

    id = db.Column(db.Integer, primary_key=True, unique=True)
    name = db.Column(db.String, nullable=False)
    address = db.Column(db.String, nullable=False)

# this is the connection between the first bridge the CartItems and the Product
    cart_items = db.relationship("CartItem", back_populates='consumer')
    product = association_proxy('cart_items', 'product')
    serialize_rules = ('-cart_items.consumer', )

# =============================== CART ITEM ==================================#


class CartItem(db.Model, SerializerMixin):
    __tablename__ = 'cart_items'

    id = db.Column(db.Integer, primary_key=True, unique=True)
    consumer_id = db.Column(db.Integer, db.ForeignKey('consumers.id'))
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))

    consumer = db.relationship("Consumer", back_populates='cart_items')
    product = db.relationship("Product", back_populates='cart_items')
    serialize_rules = ('-consumer.cart_items', '-product.cart_items')

# =============================== PRODUCT ==================================#


class Product(db.Model, SerializerMixin):
    __tablename__ = 'products'

    def __str__(self):
        item_str = ''
        item_str += f'image: {self.image}\n'
        item_str += f'name: {self.name}\n'
        item_str += '------------------'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    image = db.Column(db.String)

# this is for the first connection which is Consumer and CartItems
    cart_items = db.relationship("CartItem", back_populates='product')
    consumer = association_proxy('cart_items', 'consumer')
    serialize_rules = ('-cart_items.product', '-prices.product')

# this for the second connection which is the Price and Supermarket
    prices = db.relationship("Price", back_populates='product')
    supermarket = association_proxy("prices", "supermarket")

    def __repr__(self):
        return f"Product obj{self.id}: Item name: {self.name}"

# =============================== PRICE ==================================#


class Price(db.Model, SerializerMixin):
    __tablename__ = 'prices'

    id = db.Column(db.Integer, primary_key=True, unique=True)
    price = db.Column(db.String, nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))
    supermarket_id = db.Column(db.Integer, db.ForeignKey('supermarkets.id'))

    product = db.relationship("Product", back_populates="prices")
    supermarket = db.relationship("Supermarket", back_populates="prices")
    serialize_rules = ('-product.prices', '-supermarket.prices')

    def __repr__(self):
        return f"Price obj{self.id}: ${self.price} for {self.product.name}"

# ====================== SUPERMARKET ==============================#


class Supermarket(db.Model, SerializerMixin):
    __tablename__ = 'supermarkets'

    id = db.Column(db.Integer, primary_key=True, unique=True)
    name = db.Column(db.String, nullable=False)
    address = db.Column(db.String, nullable=False)

# -----------Below-----------
# This checks to see if there is a grocery store with exisiting id, if not exists will create
# Have to add because getting error message in running Erewhon Scraper that there is existing element with that id and will not run script. -ask tiff... but would this be added to the scraper instead? hmm....
    # @validates('id')
    # def validate_id(self, key, value):
    #     supermarket_id = value
    #     existing = session.query(Supermarket).get(supermarket_id)
    #     if not existing:
    #         new_market = Supermarket(
    #             id=self.id, name=self.name, address=self.address)
    #         db.session.add(new_market)
    #         db.session.commit()
    #         # db.session.add(Supermarket(self.id, self.name, self.address))
    #         # db.session.commit()
    #     # ask chett: can you also write : (new_market = Supermarket(self.id, self.name, self.address) return new_market)
    #     else:
    #         return existing
# -----------End -----------

# for the connection between Product and the bridge Price
    prices = db.relationship("Price", back_populates='supermarket')
    product = association_proxy("prices", "product")
    serialize_rules = ('-prices.supermarket',)

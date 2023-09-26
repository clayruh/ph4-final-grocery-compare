from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
import flask 

from config import db


class Consumer(db.Model, SerializerMixin):
    # customers
    __tablename__ = 'consumers'

    id = db.Column(db.Integer, primary_key=True, unique=True)
    name = db.Column(db.String, nullable=False)
    address = db.Column(db.String, nullable=False)

# this is the main connection between the main bridge Product and the Supermarket
    products = db.relationship('Product', back_populates='consumer')
    supermarkets = association_proxy('products', 'supermarket')
    serialize_rules = ('-products.consumer',)

# this is the connection between the second bridge the CartItems and the Product
    cart_items = db.relationship("CartItems", back_populates='consumer')
    product = association_proxy('cart_items', 'product')
    serialize_rules = ('-cart_items.consumer', )

# this is the second Bridge which is between Consumer and Product
class CartItem(db.Model, SerializerMixin):
    __tablename__ = 'cart_items'

    id = db.Column(db.Integer, primary_key=True, unique=True)
    consumer_id = db.Column(db.Integer, db.ForeignKey('consumers.id'))
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))

    consumer = db.relationship("Consumer", back_populates='cart_items')
    product = db.relationship("Product", back_populates='cart_items')
    serialize_rules = ('-consumer.cart_items', '-product.cart_items')

# this is the main Bridge bewteen the Consumer and the Supermarket
class Product(db.Model, SerializerMixin):
    # Items: Joiner for store and customers
    __tablename__ = 'products'

    id = db.Column(db.Integer, primary_key=True, unique=True)
    name = db.Column(db.String, nullable=False)
    image = db.Column(db.String)
    consumer_id = db.Column(db.Integer, db.ForeignKey('consumers.id'))
    supermarket_id = db.Column(db.Integer, db.ForeignKey('supermarkets.id'))

# this for the main connection which is the Consumer and Supermarket
    # consumer = db.relationship('Consumer', back_populates='products')
    # supermarket = db.relationship('Supermarket', back_populates='products')
    # serialize_rules = ('-supermarket.products', '-consumer.products')


# this is for the second connection which is Consumer and CartItems
    cart_items = db.relationship("CartItem", back_populates='product')
    consumer = association_proxy('cart_items', 'consumer')
    serialize_rules = ('-cart_items.product', )

# this is for the second connection which is Consumer and Cart


# this for the third connection which is the Price and Supermarket
    prices = db.relationship("Price", back_populates='product')
    supermarket = association_proxy("prices", "supermarket")

    serialize_rules = ('-prices.product', )
   
    def __repr__(self):
        return f"Product obj{self.id}: Item name: {self.name}"


# this is the third bridge connecting Product and Supermarket
class Price(db.Model, SerializerMixin):
    __tablename__ = 'prices'

    id = db.Column(db.Integer, primary_key=True, unique=True)
    price = db.Column(db.Float, nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))
    supermarket_id = db.Column(db.Integer, db.ForeignKey('supermarkets.id'))

    product = db.relationship("Product", back_populates="prices")
    supermarket = db.relationship("Supermarket", back_populates="prices")
    serialize_rules = ('-product.cart_items', '-supermarket.cart_items')
    
    def __repr__(self):
        return f"Price obj{self.id}: ${self.price} for {self.product_id}"

class Supermarket(db.Model, SerializerMixin):
    # Store
    __tablename__ = 'supermarkets'

    id = db.Column(db.Integer, primary_key=True, unique=True)
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

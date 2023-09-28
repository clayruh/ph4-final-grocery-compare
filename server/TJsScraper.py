import time
from selenium import webdriver
from bs4 import BeautifulSoup
from models import db, Product, Price, Supermarket
import ipdb
from app import app

class TJsScraper:
    def __init__(self):
        self.items = []
        self.prices = []
        self.browser = self.init_browser()
        self.supermarket = Supermarket(id=2, name="Trader Joe's", address="233 Spring St, New York, NY 10013")

    def init_browser(self):
        options = webdriver.ChromeOptions()
        options.add_argument('--headless')
        return webdriver.Chrome(options=options)

    def get_page(self):
        self.browser.get(
            'https://www.traderjoes.com/home/products/category/fruits-116')
        time.sleep(2)
        html_text = self.browser.page_source
        return BeautifulSoup(html_text, 'lxml')
    
    # # not fully sure about this code
    # def check_db(self, name, price, supermarket):
    #     existing_product = Product.query.filter_by(name=name).first()
    #     existing_price = Price.query.filter_by(price=price).first()
    #     existing_supermarket = Supermarket.query.filter_by(supermarket=supermarket)
    #     return existing_product is not None

    def make_item(self):
        soup = self.get_page()
        products = soup.find_all(
            'li', class_='ProductList_productList__item__1EIvq')

        for product in products:

            item_tag = product.find(
                'h2', class_='ProductCard_card__title__text__uiWLe')
            img_tag = product.find(
                'img', class_='ProductCard_card__cover__19-g3')
            price_tag = product.find(
                'span', class_='ProductPrice_productPrice__price__3-50j')

            name = item_tag.a.string if img_tag else None
            image = 'https://www.traderjoes.com' + img_tag.get('src') if item_tag else None
            price = price_tag.string if price_tag else None

            new_item = Product(name=name, image=image)
            new_price = Price(price=price, product=new_item, supermarket_id=2)
            self.prices.append(new_price)
            self.items.append(new_item)
        # tells flask that the context
        with app.app_context():
            db.session.add_all(self.items)
            db.session.add_all(self.prices)
            db.session.add(self.supermarket)
            db.session.commit()

    def print_items(self):
        for item in self.items:
            print(item)

if __name__ == '__main__':
    instance = TJsScraper()
    instance.make_item()

    # items = [product.find('h2', class_='ProductCard_card__title__text__uiWLe').a.string for product in products if product.find('h2', class_='ProductCard_card__title__text__uiWLe')]

    # prices = [product.find('span', class_='ProductPrice_productPrice__price__3-50j').string for product in products if product.find('span', class_='ProductPrice_productPrice__price__3-50j')]

    # image = [product.find('img', class_='ProductCard_card__cover__19-g3').get('src') for product in products if product.find('img', class_='ProductCard_card__cover__19-g3')]
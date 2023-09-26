import time
from selenium import webdriver
from bs4 import BeautifulSoup
from models import Product, db
import ipdb
# from ..server.config import db


class ErewhonScraper:
    def __init__(self):
        self.items = []
        self.browser = self.init_browser()

    def init_browser(self):
        options = webdriver.ChromeOptions()
        options.add_argument('--headless')
        return webdriver.Chrome(options=options)

    def get_page(self):
        self.browser.get(
            'https://shop.erewhonmarket.com/subcategory/55001/organic-fruits')
        time.sleep(2)
        html_text = self.browser.page_source
        return BeautifulSoup(html_text, 'lxml')

    def make_item(self):
        soup = self.get_page()
        products = soup.find_all('div', class_='category_items_details')

        for product in products:

            price_tag = product.find('p', class_='price')
            header_tag = product.find('p', class_='header')
            img_tag = product.find('div', class_='img').find(
                'img') if product.find('div', class_='img') else None

            price = price_tag.label.string if price_tag else None
            name = header_tag.get_text() if header_tag else None
            image = img_tag.get('src') if img_tag else None

            new_product = Product(image, name, price)
            # self.products.append(new_product)
            print(new_product)
            db.session.add(new_product)

        db.session.commit()
        self.print_items()

    def print_items(self):
        for item in self.items:
            print(item)


ipdb.set_trace()


# Call the method to see the output
scraper = ErewhonScraper()
scraper.make_item()
scraper.print_items()


# prices = [product.find(
#     'p', class_='price').label.string for product in products if product.find('p', class_='price')]


# label = [product.find('p', class_='header').get_text() for product in products if product.find(
#     'p', class_='header')]

# image = [product.find('div', class_='img').find('img').get('src')
#          for product in products if product.find('div', class_='img') and product.find('div', class_='img').find('img')]

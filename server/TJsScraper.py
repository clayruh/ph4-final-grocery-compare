import time
from selenium import webdriver
from bs4 import BeautifulSoup
from models import Product, Price
import ipdb


class TJsScraper:
    def __init__(self):
        self.items = []
        self.prices = []
        self.browser = self.init_browser()
        # init the supermarket here (self.supermarket =)
        # self.supermarket_id = 2

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

            new_item = Product(name, image)
            new_price = Price(price, supermarket_id=2)
            # also for supermarket:
            # find or create by, find a supermarket by these parameters, and then create a new one based on this (if else statement)
            self.items.append(new_item)
            self.prices.append(new_price)
            # self.print_items()
            # ipdb.set_trace()

    def print_items(self):
        for item in self.items:
            print(item)


if __name__ == '__main__':
    instance = TJsScraper()
    instance.make_item()

    # items = [product.find('h2', class_='ProductCard_card__title__text__uiWLe').a.string for product in products if product.find('h2', class_='ProductCard_card__title__text__uiWLe')]

    # prices = [product.find('span', class_='ProductPrice_productPrice__price__3-50j').string for product in products if product.find('span', class_='ProductPrice_productPrice__price__3-50j')]

    # image = [product.find('img', class_='ProductCard_card__cover__19-g3').get('src') for product in products if product.find('img', class_='ProductCard_card__cover__19-g3')]
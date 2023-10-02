import time
from selenium import webdriver
from bs4 import BeautifulSoup
from models import Product, db, Supermarket, Price
import ipdb
from app import app

class ErewhonScraper:
    def __init__(self, page, supermarket):
        self.items = []
        self.page = page
        self.prices = []
        self.browser = self.init_browser()
        self.supermarket = supermarket

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

            # ----------------- THIS IS REMOVING "ORGANIC" -----------------------------
            word_list = name.split()
            new_list = [word for word in word_list if word != 'Organic']
            separator = ' '
            removed_organic = separator.join(new_list)
            print(removed_organic)
            # ------------------ END REMOVING "ORGANIC" -----------------------------

            # if statement if name string already exists only create the Price & set the product attribute to existing Product object

            new_product = Product(image=image, name=removed_organic)
            new_price = Price(
                price=price, product=new_product, supermarket_id=1)
            self.items.append(new_product)
            self.prices.append(new_price)
        # with app.app_context():
        db.session.add_all(self.items)
        db.session.add_all(self.prices)
        db.session.add(self.supermarket)
        db.session.commit()

    def print_items(self):
        for item in self.items:
            print(item)

# ipdb.set_trace()

if __name__ == '__main__':
    with app.app_context():
        supermarket = Supermarket.query.filter(Supermarket.name=="Erewhon").first()
        if not supermarket:
            supermarket = Supermarket(id=1, name="Erewhon", address="339 N Beverly Dr Beverly Hills, CA 90210")
        instance = ErewhonScraper('https://shop.erewhonmarket.com/subcategory/55001/organic-fruits', supermarket)
        instance.make_item()


    # ------------------ NOTES ON REMOVING THE 'ORGANIC' WORD -----------------------------
    # in name attribute, if "Organic", remove "Organic"
    #    This will first take the name attribute and "split" it into a list of individual words.
    # Then returns each 'item' aka word in the word_list if the word is not 'Organic'.
    # At this point if you print new_list you will get back a list of words excluding the word 'Organic' ex:
    # ----------------------------------------------
    # this is the origional word list:
    # ['Organic', 'Seedless', 'Watermelon']
    # ------------------------------------------
    # this is the new list NO ORGANIC:
    # ['Seedless', 'Watermelon']
    # ----------------------------------------------
    # Then I used the join method in order to return the list back to its original state.
    # JOIN METHOD: The join method takes in the list to be joined as a parameter and the method is called on a separator that you've defined. I used empty string to give word space.

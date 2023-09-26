
class Item:
    def __init__(self, image, label, price):
        self.image = image
        self.price = price
        self.label = label

    def __str__(self):
        item_str = ''
        item_str += f'image: {self.image}\n'
        item_str += f'label: {self.label}\n'
        item_str += f'price: {self.price}\n'
        item_str += '------------------'

        return item_str

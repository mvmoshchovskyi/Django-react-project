from django.db import models
from products.models import ProductsModel


class CartItemsModel(models.Model):

    class Meta:
        db_table = 'cart_items'

    name = models.CharField(max_length=250)
    qty = models.IntegerField()
    image = models.CharField(max_length=250)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    product = models.ForeignKey(ProductsModel, related_name='cart_items', on_delete=models.CASCADE)



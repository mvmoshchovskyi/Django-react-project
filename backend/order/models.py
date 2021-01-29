from django.db import models
from django.conf import settings
from accounts.models import UserAccount
from cart.models import CartItemsModel
from address.models import ShippingAddressModel


class OrderModel(models.Model):
    class Meta:
        db_table = 'orders'

    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name='order', default=2)
    order_items = models.ManyToManyField(CartItemsModel, related_name='order')
    shipping_address = models.ForeignKey(ShippingAddressModel, related_name='order_address',
                                         on_delete=models.CASCADE, default=3)
    payment_method = models.CharField(max_length=100, default='LiqPay')
    items_price = models.DecimalField(max_digits=10, decimal_places=2)
    delivery_price = models.DecimalField(max_digits=10, decimal_places=2)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    is_paid = models.BooleanField(default=False)
    is_delivered = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

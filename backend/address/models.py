from django.db import models

class ShippingAddressModel(models.Model):

    class Meta:
        db_table = 'shipping_address'

    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=100)
    address = models.CharField(max_length=250)
    postal_code = models.CharField(max_length=20)
    city = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)



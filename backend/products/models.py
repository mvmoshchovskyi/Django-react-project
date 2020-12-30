from django.db import models


class ProductsModel(models.Model):

    class Meta:
        db_table = 'products'

    class Category(models.TextChoices):
        Shirts = 'Shirts'
        Pants = 'Pants'

    class Brand(models.TextChoices):
        Nike = 'Nike'
        Adidas = 'Adidas'
        Lacoste = 'Lacoste'
        Puma = 'Puma'

    name = models.CharField(max_length=255)
    category = models.CharField(max_length=50, choices=Category.choices, default=Category.Shirts)
    image = models.ImageField(upload_to='images/%Y/%m/%d/')
    price = models.FloatField()
    countInStock = models.IntegerField()
    brand = models.CharField(max_length=62, choices=Brand.choices, default=Brand.Adidas)
    rating = models.FloatField()
    numReviews = models.IntegerField()
    description = models.TextField(max_length=500, blank=True)

    def __str__(self):
        return self.name
from rest_framework.serializers import ModelSerializer
from .models import CartItemsModel


class CartItemsSerializer(ModelSerializer):
    class Meta:
        model = CartItemsModel
        fields = 'name,qty,image,price'

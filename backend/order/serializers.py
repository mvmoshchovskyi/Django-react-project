from rest_framework.serializers import ModelSerializer
from .models import OrderModel
from cart.serializers import CartItemsSerializer


class OrderSerializer(ModelSerializer):
    order_items = CartItemsSerializer(many=True, read_only=True)
    class Meta:
        model = OrderModel
        fields = '__all__'


# class OrderCreateSerializer(ModelSerializer):
#     class Meta:
#         model = OrderModel
#         fields = 'payment_method,items_price,delivery_price,total_price'

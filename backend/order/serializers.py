from rest_framework.serializers import ModelSerializer
from .models import OrderModel


class OrderSerializer(ModelSerializer):
    class Meta:
        model = OrderModel
        fields = '__all__'


class OrderCreateSerializer(ModelSerializer):
    class Meta:
        model = OrderModel
        fields = 'payment_method,items_price,delivery_price,total_price'

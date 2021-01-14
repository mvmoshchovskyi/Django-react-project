from rest_framework.serializers import ModelSerializer
from .models import OrderModel


class OrderSerializer(ModelSerializer):
    class Meta:
        model = OrderModel
        fields = '__all__'
        # fields = 'paymentMethod,items_price,delivery_price,total_price,is_paid,created'

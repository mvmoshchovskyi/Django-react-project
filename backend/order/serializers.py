from rest_framework.serializers import ModelSerializer
from .models import OrderModel


class OrderSerializer(ModelSerializer):
    class Meta:
        model = OrderModel
        fields = '__all__'


# class TestSerializer(ModelSerializer):
#     class Meta:
#         model = TestModel
#         fields = '__all__'

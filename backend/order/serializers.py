from rest_framework.serializers import ModelSerializer
from .models import OrderModel
from cart.serializers import CartItemsSerializer
from cart.models import CartItemsModel


class OrderSerializer(ModelSerializer):
    order_items = CartItemsSerializer(many=True)

    class Meta:
        model = OrderModel
        fields = '__all__'

    def create(self, validated_data):
        items = validated_data.pop('order_items')
        instance = OrderModel.objects.create(**validated_data)
        for item in items:
            saved_item = CartItemsModel.objects.create(**item)
            instance.order_items.add(saved_item)
        instance.save()
        return instance



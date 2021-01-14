from rest_framework.serializers import ModelSerializer
from .models import ShippingAddressModel


class ShippingAddressSerializer(ModelSerializer):
    class Meta:
        model = ShippingAddressModel
        fields = '__all__'
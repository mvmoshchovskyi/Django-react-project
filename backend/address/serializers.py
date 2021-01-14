from rest_framework.serializers import ModelSerializer
from .models import ShippingAddressModel


class ShippingAddressModelSerializer(ModelSerializer):
    class Meta:
        model = ShippingAddressModel
        fields = '__all__'
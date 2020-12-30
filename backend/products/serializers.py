from rest_framework.serializers import ModelSerializer
from .models import ProductsModel


class ProductSerializer(ModelSerializer):
    class Meta:
        model = ProductsModel
        fields = '__all__'

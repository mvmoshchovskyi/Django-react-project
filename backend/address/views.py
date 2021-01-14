from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.mixins import ListModelMixin
from .serializers import ShippingAddressSerializer
from .models import ShippingAddressModel
from rest_framework import permissions


class AddressList(ListAPIView):
    permission_classes = [permissions.AllowAny, ]
    serializer_class = ShippingAddressSerializer
    queryset = ShippingAddressModel.objects.all()


class CreateAddress(CreateAPIView):
    permission_classes = [permissions.AllowAny, ]
    serializer_class = ShippingAddressSerializer
    queryset = ShippingAddressModel.objects.all()

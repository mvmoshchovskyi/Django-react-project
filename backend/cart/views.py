from rest_framework.generics import CreateAPIView, ListCreateAPIView , ListAPIView
from rest_framework.mixins import ListModelMixin
from .serializers import CartItemsSerializer
from .models import CartItemsModel
from rest_framework import permissions


class CartList(ListAPIView):
    permission_classes = [permissions.AllowAny, ]
    serializer_class = CartItemsSerializer
    queryset = CartItemsModel.objects.all()


class CreateCart(ListModelMixin, CreateAPIView):
    permission_classes = [permissions.AllowAny, ]
    serializer_class = CartItemsSerializer
    queryset = CartItemsModel.objects.all()


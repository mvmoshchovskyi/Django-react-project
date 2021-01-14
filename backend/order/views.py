from rest_framework.generics import CreateAPIView, ListCreateAPIView , ListAPIView
from rest_framework.mixins import ListModelMixin
from .serializers import OrderSerializer
from .models import OrderModel
from rest_framework import permissions


class OrderList(ListAPIView):
    permission_classes = [permissions.AllowAny, ]
    serializer_class = OrderSerializer
    queryset = OrderModel.objects.all()


class CreateOrder(ListModelMixin, CreateAPIView):
    permission_classes = [permissions.AllowAny, ]
    serializer_class = OrderSerializer
    queryset = OrderModel.objects.all()

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


    # def perform_create(self, serializer):
    #     serializer.save(user=self.request.user)

    # def get_queryset(self):
    #     return OrderModel.objects.all()


from rest_framework.generics import CreateAPIView, RetrieveAPIView, ListAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.mixins import ListModelMixin
from .serializers import OrderSerializer
from .models import OrderModel
from rest_framework import permissions


class OrderList(ListAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = OrderSerializer
    queryset = OrderModel.objects.all()


class CreateOrder(ListModelMixin, CreateAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = OrderSerializer
    queryset = OrderModel.objects.all()

    def get_serializer(self, *args, **kwargs):
        if "data" in kwargs:
            data = kwargs["data"]

            # check if many is required
            if isinstance(data, list):
                kwargs["many"] = True

        return super(CreateOrder, self).get_serializer(*args, **kwargs)


class OrderDetailView(RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = OrderSerializer
    queryset = OrderModel.objects.all()


# class DestroyAPIView(RetrieveAPIView):
#     serializer_class = OrderSerializer
#     permission_classes = [permissions.AllowAny, ]
#     queryset = OrderModel.objects.all()

# def get_object(self):
#     try:
#         order = Order.objects.get(user=self.request.user, ordered=False)
#         return order
#     except ObjectDoesNotExist:
#         raise Http404("You do not have an active order")
# return Response({"message": "You do not have an active order"}, status=HTTP_400_BAD_REQUEST)
# def get(self, request, *args, **kwargs):
#     return self.list(request, *args, **kwargs)

# class CreateOrder(ListModelMixin, CreateAPIView):
#     permission_classes = [permissions.AllowAny, ]
#     queryset = OrderModel.objects.none()
#     serializer_class = OrderSerializer


# def create(self, request, *args, **kwargs):
#     serializer = self.get_serializer(data=request.data, many=isinstance(request.data, list))
#     serializer.is_valid(raise_exception=True)
#     self.perform_create(serializer)
#     results = OrderModel.objects.all()
#     output_serializer = OrderSerializer(results, many=True)
#     data = output_serializer.data[:]
#     return Response(data)

# def perform_create(self, serializer):
#     serializer.save(user=self.request.user)

# def get_queryset(self):
#     return OrderModel.objects.all()

# def get_queryset(self):
#     queryset = OrderModel.objects.all()
#     return queryset

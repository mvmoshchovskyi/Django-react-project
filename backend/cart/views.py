from rest_framework.generics import CreateAPIView,ListAPIView , ListCreateAPIView
from .serializers import CartItemsSerializer
from .models import CartItemsModel
from rest_framework import permissions
from rest_framework.response import Response


class CartList(ListAPIView):
    permission_classes = [permissions.AllowAny, ]
    serializer_class = CartItemsSerializer
    queryset = CartItemsModel.objects.all()


# class CreateCart(CreateAPIView):
#     permission_classes = [permissions.AllowAny, ]
#     queryset = CartItemsModel.objects.none()
#     serializer_class = CartItemsSerializer
#
#
#     def create(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data, many=isinstance(request.data, list))
#         serializer.is_valid(raise_exception=True)
#         self.perform_create(serializer)
#         results = CartItemsModel.objects.all()
#         output_serializer = CartItemsSerializer(results, many=True)
#         data = output_serializer.data
#         return Response(data)

class CreateCart(CreateAPIView):
    permission_classes = [permissions.AllowAny, ]
    queryset = CartItemsModel.objects.all()
    serializer_class = CartItemsSerializer

    def get_serializer(self, *args, **kwargs):
        if "data" in kwargs:
            data = kwargs["data"]

            # check if many is required
            if isinstance(data, list):
                kwargs["many"] = True

        return super(CreateCart, self).get_serializer(*args, **kwargs)



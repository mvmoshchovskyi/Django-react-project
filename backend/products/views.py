from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView
from .serializers import ProductSerializer
from .models import ProductsModel
from rest_framework import permissions
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework_simplejwt.authentication import JWTAuthentication


class ProductListView(ListAPIView):
    permission_classes = [permissions.AllowAny, ]
    queryset = ProductsModel.objects.all()
    serializer_class = ProductSerializer
    page_size = 1000
    page_size_query_param = 'page_size'


class ProductDetailView(RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.AllowAny, ]
    authentication_classes = [JWTAuthentication]
    queryset = ProductsModel.objects.all()
    serializer_class = ProductSerializer


class ProductListFilter(ListAPIView):
    permission_classes = [permissions.AllowAny, ]
    queryset = ProductsModel.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['sex']


# '^' Starts-with search.
# '=' Exact matches.
# '@' Full-text search. (Currently only supported Django's PostgreSQL backend.)
# '$' Regex search.
#
#
class ProductListSearch(ListAPIView):
    permission_classes = [permissions.AllowAny, ]
    queryset = ProductsModel.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter]
    # search_fields = ['^slug']
    search_fields = ['name', 'description']


""" Concrete View Classes
#CreateAPIView
Used for create-only endpoints.
#ListAPIView
Used for read-only endpoints to represent a collection of model instances.
#RetrieveAPIView
Used for read-only endpoints to represent a single model instance.
#DestroyAPIView
Used for delete-only endpoints for a single model instance.
#UpdateAPIView
Used for update-only endpoints for a single model instance.
##ListCreateAPIView
Used for read-write endpoints to represent a collection of model instances.
RetrieveUpdateAPIView
Used for read or update endpoints to represent a single model instance.
#RetrieveDestroyAPIView
Used for read or delete endpoints to represent a single model instance.
#RetrieveUpdateDestroyAPIView
Used for read-write-delete endpoints to represent a single model instance.
"""

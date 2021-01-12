from django.urls import path
from .views import ProductListView, ProductDetailView, ProductListFilter, ProductListSearch

urlpatterns = [
    path('', ProductListView.as_view()),
    path('<int:pk>', ProductDetailView.as_view()),
    path('search/', ProductListSearch.as_view()),
    path('category/', ProductListFilter.as_view()),
]

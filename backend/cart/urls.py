from django.urls import path
from .views import CreateCart,CartList

urlpatterns = [
    path('', CartList.as_view()),
    path('create/', CreateCart.as_view())
]

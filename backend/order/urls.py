from django.urls import path
from .views import CreateOrder,OrderList

urlpatterns = [
    path('', OrderList.as_view()),
    path('/create', CreateOrder.as_view())
]

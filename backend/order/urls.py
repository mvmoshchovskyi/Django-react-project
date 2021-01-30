from django.urls import path
from .views import CreateOrder, OrderList, OrderDetailView

urlpatterns = [
    path('', OrderList.as_view()),
    path('create/', CreateOrder.as_view()),
    path('<int:pk>', OrderDetailView.as_view()),
]

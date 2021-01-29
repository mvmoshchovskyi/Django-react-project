from django.urls import path
from .views import CreateAddress,AddressList

urlpatterns = [
    path('', AddressList.as_view()),
    path('create/', CreateAddress.as_view())
]

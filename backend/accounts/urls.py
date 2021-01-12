from django.urls import path
from .views import SignupView, GetCurrentUserView

urlpatterns = [
    path('signup', SignupView.as_view()),
    # path('user', GetCurrentUserView.as_view())
]
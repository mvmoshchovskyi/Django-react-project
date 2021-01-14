from django.urls import path
from .views import SignupView, CustomUserCreate

urlpatterns = [
    # path('signup', SignupView.as_view()),
    path('register', CustomUserCreate.as_view(), name='create_user')
]
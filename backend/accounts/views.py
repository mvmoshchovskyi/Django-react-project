from django.contrib.auth import get_user_model

User = get_user_model()
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions
from .serializers import UserSerializer
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken


class CustomUserCreate(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        user_serializer = UserSerializer(data=request.data)
        if user_serializer.is_valid():
            user = user_serializer.save()
            if user:
                return Response(status=status.HTTP_201_CREATED)
        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# class LoginView(APIView):
#     permission_classes = (permissions.AllowAny,)
#
#     def post(self, request, *args, **qwargs):
#         token = RefreshToken.for_user(user=request.data)
#         return Response({'success': 'true', 'token': token, 'user': request.data})
# class SignupView(APIView):
#     permission_classes = (permissions.AllowAny,)
#
#     def post(self, request, format=None):
#         data = self.request.data
#
#         name = data['name']
#         email = data['email']
#         password = data['password']
#         password2 = data['password2']
#
#         if password == password2:
#             if User.objects.filter(email=email).exists():
#                 return Response({'error': ' Email already exists'})
#             else:
#                 if len(password) < 6:
#                     return Response({'error': "password must be least 6 characters"})
#                 else:
#                     user = User.objects.create_user(email=email, password=password, name=name)
#
#                     user.save()
#                     return Response({'success': 'User created successfully'})
#                     # return Response({'user': user})
#         else:
#             return Response({'error': 'password do not match'})

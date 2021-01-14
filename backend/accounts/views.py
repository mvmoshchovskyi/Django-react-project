from django.contrib.auth import get_user_model

User = get_user_model()
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.generics import RetrieveAPIView
from .serializers import UserSerializer

class SignupView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        data = self.request.data

        name = data['name']
        email = data['email']
        password = data['password']
        password2 = data['password2']

        if password == password2:
            if User.objects.filter(email=email).exists():
                return Response({'error': ' Email already exists'})
            else:
                if len(password) < 6:
                    return Response({'error': "password must be least 6 characters"})
                else:
                    user = User.objects.create_user(email=email, password=password, name=name)

                    user.save()
                    return Response({'success': 'User created successfully'})
                    # return Response({'user': user})
        else:
            return Response({'error': 'password do not match'})


class GetCurrentUserView(RetrieveAPIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, *args, **kwargs):
        user = self.request.user
        data = UserSerializer(user).data
        return Response(data)

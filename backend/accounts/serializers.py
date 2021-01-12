from rest_framework.serializers import ModelSerializer
from .models import UserAccount


class UserSerializer(ModelSerializer):
    class Meta:
        model = UserAccount
        fields = '__all__'
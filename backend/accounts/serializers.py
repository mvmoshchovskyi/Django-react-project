from rest_framework.serializers import ModelSerializer
from .models import UserAccount
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class UserSerializer(ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ('email', 'name', 'password')
        extra_kwargs = {'password': {'write_only': 'True'}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)

        # Add extra responses here
        data['id'] = self.user.id
        data['name'] = self.user.name
        data['email'] = self.user.email

        return data

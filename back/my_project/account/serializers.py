from .models import BillingAddress, Model, OrderModel
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

class UserRegisterTokenSerializer(serializers.ModelSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_staff', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_staff']

    def get_admin(self, obj):
        return obj.is_staff


class CardsListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Model
        fields = '__all__'

class BillingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = BillingAddress
        fields = '__all__'

class AllOrdersListSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderModel
        fields = '__all__'
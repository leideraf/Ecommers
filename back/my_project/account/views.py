from django.shortcuts import render
from .models import Model, BillingAddress, OrderModel
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password, check_password
from .serializers import BillingAddressSerializer, AllOrdersListSerializer, UserSerializer, UserRegisterTokenSerializer, CardsListSerializer
from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

# Create your views here.
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserRegisterTokenSerializer(self.user).data
        for k, v in serializer.items():
            data[k] = v
        return data
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class UserRegisterView(APIView):

    def post(self, request):
        data = request.data
        username = data['username']
        email = data['email']

        if username == "" or email == "":
            return Response({"detail": "username and email are required, cannot be empty"}, status=status.HTTP_400_BAD_REQUEST)
        else:
           if User.objects.filter(username=username).exists():
               return Response({"detail": "username already exists"}, status=status.HTTP_403_FORBIDDEN)
           elif User.objects.filter(email=email).exists():
               return Response({"detail": "email already exists"}, status=status.HTTP_403_FORBIDDEN)
           else:
               user = User.objects.create_user(username=username, email=email, password=make_password(data['password']))
               serializer = UserSerializer(user, many=False)
               return Response(serializer.data, status=status.HTTP_201_CREATED)

class UserAccountDetailsView(APIView):

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, pk):
        try:
            user = User.objects.get(id = pk)
            serializer = UserSerializer(user, many = False)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response({"detail": "user not found"}, status=status.HTTP_404_NOT_FOUND)
    

class UserAccountUpdateView(APIView):

    permission_classes = [permissions.IsAuthenticated]

    def put(self, request, pk):
        user = User.objects.get(id = pk)
        data = request.data

        if user:
            if request.user.id == user.id:
                user.username = data['username']
                user.email = data['email']

                if data['password'] != "":
                    user.password = make_password(data['password'])

                user.save()
                serializer = UserSerializer(user, many = False)
                return Response({"detail": "user successfully updated", "user" : serializer.data }, status=status.HTTP_200_OK)
            else:
                return Response({"detail": "Permission denied."}, status=status.HTTP_403_FORBIDDEN)
        else:
            return Response({"detail": "user not found"}, status=status.HTTP_404_NOT_FOUND)
        
class UserAccountDeleteView(APIView):

    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, pk):
        try:
            user = User.objects.get(id = pk)
            data = request.data

            if user:
                if request.user.id == user.id:
                    if check_password(data['password'], user.password):
                        user.delete()
                        return Response({"detail": "user successfully deleted"}, status=status.HTTP_204_NO_CONTENT)
                    else:
                        return Response({"detail": "wrong password"}, status=status.HTTP_403_FORBIDDEN)
                else:
                    return Response({"detail": "Permission denied."}, status=status.HTTP_403_FORBIDDEN)
            else:
                return Response({"detail": "user not found"}, status=status.HTTP_404_NOT_FOUND)
        except:
            return Response({"detail": "user not found"}, status=status.HTTP_404_NOT_FOUND)
    

class UserAddressListView(APIView):

    #permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        user_address = BillingAddress.objects.filter(user = user)
        serializer = BillingAddressSerializer(user_address, many = True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class UserAddressDetailsView(APIView):

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, pk):
        try:
            user_address = BillingAddress.objects.get(id = pk)
            serializer = BillingAddressSerializer(user_address, many = False)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response({"detail": "address not found"}, status=status.HTTP_404_NOT_FOUND)
        

class UserAddressCreateView(APIView):

    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        data = request.data
        user = request.user
        new_user_address = {
            "name": data['name'],
            "user": user.id,
            "phone_number": data['phone_number'],
            "pin_code" : data['pin_code'],
            "house_no": data['house_no'],
            "landmark": data['landmark'],
            "city": data['city'],
            "state": data['state'],
        }
        serializer = BillingAddressSerializer(data = new_user_address, many = False)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({"detail": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
class UserAddressUpdateView(APIView):

    permission_classes = [permissions.IsAuthenticated]

    def put(self, request, pk):
        try:
            data = request.data
            user_address = BillingAddress.objects.get(id = pk)
            
            if user_address:
                if request.user.id == user_address.user.id:
                   
                    updated_address = {
                        "name": data['name'] if data['name'] else user_address.name,
                        "user": user_address.user.id,
                        "phone_number": data['phone_number'] if data['phone_number'] else user_address.phone_number,
                        "pin_code" : data['pin_code'] if data['pin_code'] else user_address.pin_code,
                        "house_no": data['house_no'] if data['house_no'] else user_address.house_no,
                        "landmark": data['landmark'] if data['landmark'] else user_address.landmark,
                        "city": data['city'] if data['city'] else user_address.city,
                        "state": data['state']  if data['state'] else user_address.state,
                    }
                    
                    serializer = BillingAddressSerializer(user_address, data = updated_address)
                    if serializer.is_valid():
                        serializer.save()
                        return Response(serializer.data, status=status.HTTP_200_OK)
                    return Response({"detail": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    return Response({"detail": "Permission denied."}, status=status.HTTP_403_FORBIDDEN)
            else:
                return Response({"detail": "address not found"}, status=status.HTTP_404_NOT_FOUND) 
        except:
            return Response({"detail": "address not found"}, status=status.HTTP_404_NOT_FOUND)

class UserAddressDeleteView(APIView):

    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, pk):
        try:
            user_address = BillingAddress.objects.get(id = pk)

            if user_address:
                if request.user.id == user_address.user.id:
                    user_address.delete()
                    return Response({"detail": "address successfully deleted"}, status=status.HTTP_204_NO_CONTENT)
                else:
                    return Response({"detail": "Permission denied."}, status=status.HTTP_403_FORBIDDEN)
            else:
                return Response({"detail": "address not found"}, status=status.HTTP_404_NOT_FOUND)
        except:
            return Response({"detail": "address not found"}, status=status.HTTP_404_NOT_FOUND)

class CardsListView(APIView):

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        cards = Model.objects.filter(user = request.user)
        serializer = CardsListSerializer(cards, many = True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

class OrdersListView(APIView):

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        
        user_staff_status = request.user.is_staff

        if user_staff_status:
            orders_for_all_users = OrderModel.objects.all()
            serializer = AllOrdersListSerializer(orders_for_all_users, many = True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            orders_user = OrderModel.objects.filter(user = request.user)
            serializer = AllOrdersListSerializer(orders_user, many = True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
class OrderChangeStatusView(APIView):

    permission_classes = [permissions.IsAdminUser]

    def put(self, request, pk):
        try:
            data = request.data
            order = OrderModel.objects.get(id = pk)
            if order:
                
                order.is_delivered = data['is_delivered']
                order.delivered_at = data['delivered_at']
                order.save()
                return Response({"detail": "order status successfully changed"}, status=status.HTTP_200_OK)
            else:
                return Response({"detail": "order not found"}, status=status.HTTP_404_NOT_FOUND)
        except:
            return Response({"detail": "order not found"}, status=status.HTTP_404_NOT_FOUND)
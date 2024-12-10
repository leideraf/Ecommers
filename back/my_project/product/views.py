from django.shortcuts import render
from .models import Product
from .serializers import ProductSerializer
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, authentication, permissions

# Create your views here.
class ProductView(APIView):
    def get(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many = True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class ProductDetailView(APIView):
    def get(self, request, pk):
        products = Product.objects.get(id=pk)
        serializer = ProductSerializer(products, many = False)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class ProductDetailViewByName(APIView):
    def get(self, request, nombre):
        products = Product.objects.get(name=nombre)
        serializer = ProductSerializer(products, many = False)
        return Response(serializer.data, status=status.HTTP_200_OK)

class ProductCreateView(APIView):

    #permission_classes = [permissions.IsAdminUser]

    def post(self, request):
        data = request.data
        product = {
            "name": data["name"],
            "description": data["description"],
            "price": data["price"],
            "stock": data["stock"],
            "image": data["image"],
        }
        serializer = ProductSerializer(data=product, many=False)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            print("Errors: ", serializer.errors)
            return Response({"detail": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class ProductEditView(APIView):

    #permission_classes = [permissions.IsAdminUser]

    def put(self, request, pk):
        data = request.data
        product = Product.objects.get(id=pk)

        updated_product = {
            "name" : data["name"] if data["name"] else product.name,
            "description" :  data["description"] if data["description"] else product.description,
            "price" :  data["price"] if data["price"] else product.price,
            "stock" : data["stock"] if data["stock"] else product.stock,
            "image" : data["image"] if data["image"] else product.image,
        }

        serializer = ProductSerializer(product, data=updated_product)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        return Response({"detail": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class ProductDeleteView(APIView):

    #permission_classes = [permissions.IsAdminUser]

    def delete(self, request, pk):
        try:
            product = Product.objects.get(id=pk)
            product.delete()
            return Response({"detail": "Product successfully deleted."}, status=status.HTTP_204_NO_CONTENT)
        except:
            return Response({"detail": "Product not found."}, status=status.HTTP_404_NOT_FOUND)


from django.urls import path
from product import views

urlpatterns = [
    path('products/', views.ProductView.as_view(), name="product-list"),
    path('products/<int:pk>/', views.ProductDetailView.as_view(), name="product-details"),
    path('products-name/<str:nombre>/', views.ProductDetailViewByName.as_view(), name="product-name-details"),
    path('product-create/', views.ProductCreateView.as_view(), name="product-create"),
    path('product-update/<int:pk>', views.ProductEditView.as_view(), name="product-update"),
    path('product-delete/<int:pk>', views.ProductDeleteView.as_view(), name="product-delete"),
]
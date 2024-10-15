from django.urls import path
from account import views

urlpatterns = [
    #User
    path('register/', views.UserRegisterView.as_view(), name="register-page"),
    path('login/', views.MyTokenObtainPairView.as_view(), name="login-page"),
    path('user/<int:pk>/', views.UserAccountDetailsView.as_view(), name="user-details"),
    path('user_update/<int:pk>/', views.UserAccountUpdateView.as_view(), name="user-update"),
    path('user_delete/<int:pk>/', views.UserAccountDeleteView.as_view(), name="user-delete"),

    #User address
    path('all_address/', views.UserAddressListView.as_view(), name="all-address"),
    path('address_details/<int:pk>/', views.UserAddressDetailsView.as_view(), name="address-details"),
    path('address_create/', views.UserAddressCreateView.as_view(), name="address-create"),
    path('address_update/<int:pk>/', views.UserAddressUpdateView.as_view(), name="address-update"),
    path('address_delete/<int:pk>/', views.UserAddressDeleteView.as_view(), name="address-delete"),

    #User Order
    path('all_orders/', views.OrdersListView.as_view(), name="all-orders"),
    path('change_order_status/<int:pk>/', views.OrderChangeStatusView.as_view(), name="change-order-status"),

    #User Cards
    path('all_cards/', views.CardsListView.as_view(), name="all-cards"),
]
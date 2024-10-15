from django.contrib import admin
from .models import Model, BillingAddress, OrderModel

class ModelAdmin(admin.ModelAdmin):
    list_display = ('id', 'email', 'card_number', 'user', 'exp_month', 'exp_year', 'customer_id', 'card_id')

class BillingAddressAdmin(admin.ModelAdmin):
    list_display = ('id', 'name' ,'user', 'phone_number', 'pin_code', 'house_no', 'landmark', 'city', 'state')

class OrderModelAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'card_number', 'address', 'ordered_items', 'paid_status', 'paid_at', 'total_price', 'is_delivered', 'delivered_at', 'user')


# Register your models here.
admin.site.register(Model, ModelAdmin)
admin.site.register(BillingAddress, BillingAddressAdmin)
admin.site.register(OrderModel, OrderModelAdmin)
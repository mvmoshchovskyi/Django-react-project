from django.contrib import admin
from .models import OrderModel

# class OrderItemsInline(admin.TabularInline):
#     model = OrderItemsModel
#     raw_id_fields = ['product']
#
#
# class OrderAdmin(admin.ModelAdmin):
#     # list_display = ['id', 'first_name', 'last_name', 'email',
#     #                 'address', 'postal_code', 'city', 'phone', 'is_paid',
#     #                 'delivered', 'paymentMethod', 'created', ]
#     list_filter = ['is_paid', 'created']
#     inlines = [OrderItemsInline]


admin.site.register(OrderModel)

from django.urls import path

from .views import (
    api_list_customers,
    api_customer,
)

urlpatterns = [
    path("customers/", api_list_customers, name="api_list_customers"),
    path("customers/<int:id>/", api_customer, name="api_customer"),
]

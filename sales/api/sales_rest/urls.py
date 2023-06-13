from django.urls import path

from .views import (
    api_list_salespersons,
    api_salesperson,
    api_list_sales,
    api_sale,
    api_sold_sales,
)

urlpatterns = [
    path("salespeople/", api_list_salespersons, name="api_list_salespserson"),
    path("salespeople/<int:id>/", api_salesperson, name="api_salespserson"),
    path("sales/", api_list_sales, name="api_list_sales"),
    path("sales/<int:id>/", api_sale, name="api_sale"),
    path("sales/<int:id>/sold/", api_sold_sales, name="api_sold_sales"),
]

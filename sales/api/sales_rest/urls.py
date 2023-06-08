from django.urls import path

from .views import (api_list_salespersons,
                    api_salesperson,
                    api_list_customers,
                    api_customer,
                    api_list_sales,
                    api_sale,
                )

urlpatterns= [
    path("salespeople/",
         api_list_salespersons,
         name="api_list_salespserson"),
    path("salespeople/<int:id>/",
         api_salesperson,
         name="api_salespserson"),
     path("customers/",
         api_list_customers,
         name="api_list_customers"),
     path("customers/<int:id>/",
         api_customer,
         name="api_customer"),
    path("sales/",
         api_list_sales,
         name="api_list_sales"),
    path("sales/<int:id>/",
         api_sale,
         name="api_sale"),
]

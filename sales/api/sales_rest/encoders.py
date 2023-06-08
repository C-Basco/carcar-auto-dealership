from common.json import ModelEncoder

from .models import Salesperson, Customer, Sale, AutomobileVO


# Create your encoders here
class AutomobileVODetailEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "sold",
    ]

class SalespersonListEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "id",
        "first_name",
        "last_name",
        "employee_id",
    ]

class CustomerListEncoder(ModelEncoder):
    model = Customer
    properties = [
        "first_name",
        "last_name",
        "phone_number",
        "address",
    ]

class SalesListEncoder(ModelEncoder):
    model = Sale
    properties = [
        "price",
    ]

    def get_extra_data(self,o):
        return{
            "employee_id": o.salesperson.employee_id ,
            "first_name": o.salesperson.first_name ,
            "last_name": o.salesperson.last_name,

            "cust_first_name": o.customer.first_name,
            "cust_last_name": o.customer.last_name,

            "vin": o.automobile.vin,
        }

class SaleEncoder(ModelEncoder):
    model = Sale
    properties = [
        "price",
    ]

    def get_extra_data(self,o):
        return{
            "employee_id": o.salesperson.employee_id ,
            "first_name": o.salesperson.first_name ,
            "last_name": o.salesperson.last_name,

            "cust_first_name": o.customer.first_name,
            "cust_last_name": o.customer.last_name,

            "vin": o.automobile.vin,
            "sold":o.automobile.sold,
        }

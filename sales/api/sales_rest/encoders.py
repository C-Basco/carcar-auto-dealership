from common.json import ModelEncoder

from .models import Salesperson, Customer, Sale, AutomobileVO


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
        "id",
        "first_name",
        "last_name",
        "phone_number",
        "address",
    ]


class SalesListEncoder(ModelEncoder):
    model = Sale
    properties = [
        "id",
        "price",
        "automobile",
        "customer",
        "salesperson",
    ]
    encoders = {
        "automobile": AutomobileVODetailEncoder(),
        "salesperson": SalespersonListEncoder(),
        "customer": CustomerListEncoder(),
    }

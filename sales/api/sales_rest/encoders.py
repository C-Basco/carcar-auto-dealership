from common.json import ModelEncoder

from .models import Salesperson, Sale, AutomobileVO, CustomerVO


class AutomobileVODetailEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "sold",
    ]


class CustomerVODetailEncoder(ModelEncoder):
    model = CustomerVO
    properties = [
        "first_name",
        "last_name",
    ]


class SalespersonListEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "id",
        "first_name",
        "last_name",
        "employee_id",
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
        "customer": CustomerVODetailEncoder(),
    }

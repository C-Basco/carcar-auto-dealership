from django.shortcuts import render
from django.views.decorators.http import require_http_methods
import json
from django.http import JsonResponse

from .models import Salesperson, Customer, Sale, AutomobileVO

from .encoders import CustomerListEncoder, SalespersonListEncoder, SalesListEncoder, SaleEncoder

# Create your views here.

@require_http_methods(["GET","POST"])
def api_list_salespersons(request):
    if request.method == "GET":
        salespersons = Salesperson.objects.all()
        return JsonResponse(
            {'salespersons': salespersons},
            encoder=SalespersonListEncoder,
        )
    else:
        content = json.loads(request.body)
        salesperson = Salesperson.objects.create(**content)
        return JsonResponse(
            salesperson,
            encoder=SalespersonListEncoder,
            safe=False,
        )


@require_http_methods(["GET","DELETE","PUT"])
def api_salesperson(request,id):
    if request.method == "GET":
        salesperson = Salesperson.objects.get(id=id)
        return JsonResponse(
            {'salesperson':salesperson},
            encoder=SalespersonListEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        count, _ = Salesperson.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)
        Salesperson.objects.filter(id=id).update(**content)
        salesperson = Salesperson.objects.get(id=id)
        return JsonResponse(
            salesperson,
            encoder=SalespersonListEncoder,
            safe=False
        )

@require_http_methods(["GET","POST"])
def api_list_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers":customers},
            encoder = CustomerListEncoder,
        )
    else:
        content = json.loads(request.body)
        customer = Customer.objects.create(**content)
        return JsonResponse(
            {"customer":customer},
            encoder = CustomerListEncoder,
        )

@require_http_methods(["GET","DELETE","PUT"])
def api_customer(request, id):
    if request.method == "GET":
        customer = Customer.objects.get(id=id)
        return JsonResponse(
            {"customer": customer},
            encoder = CustomerListEncoder,
        )
    elif request.method == "DELETE":
        count = Customer.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)
        Customer.objects.filter(id=id).update(**content)
        customer = Salesperson.objects.get(id=id)
        return JsonResponse(
            customer,
            encoder=CustomerListEncoder,
            safe=False
        )


@require_http_methods(["GET","POST"])
def api_list_sales(request, auto_vo_vin=None):
    if request.method == "GET":
        if auto_vo_vin is not None:
            sales = Sale.objects.filter(automobile=auto_vo_vin)
        else:
            sales = Sale.objects.all()
        return JsonResponse(
            {"sales":sales},
            encoder = SalesListEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            auto_vin = content['automobile']
            automobile = AutomobileVO.objects.get(vin=auto_vin)

            content["automobile"] = automobile
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message":"Invalid vin"},
                status=400,
            )
        sale = Sale.objects.create(**content)
        return JsonResponse(
            sale,
            encoder = SalesListEncoder,
            safe=False,
        )

@require_http_methods(["GET","DELETE","PUT"])
def api_sale(request,id):
    if request.method == ("GET"):
        sale = Sale.objects.get(id=id)
        return JsonResponse(
            {"sale": sale},
            encoder = SaleEncoder,
        )
    elif request.method == "DELETE":
        count = Sale.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)
        Sale.objects.filter(id=id).update(**content)
        sale = Sale.objects.get(id=id)
        return JsonResponse(
            sale,
            encoder=SaleEncoder,
            safe=False
        )

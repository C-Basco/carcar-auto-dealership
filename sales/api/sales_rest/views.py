from django.views.decorators.http import require_http_methods
import json
from django.http import JsonResponse

from .models import Salesperson, Customer, Sale, AutomobileVO

from .encoders import CustomerListEncoder, SalespersonListEncoder, SalesListEncoder


@require_http_methods(["GET", "POST"])
def api_list_salespersons(request):
    if request.method == "GET":
        salespersons = Salesperson.objects.all()
        return JsonResponse(
            {"salespersons": salespersons},
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


@require_http_methods(["GET", "DELETE", "PUT"])
def api_salesperson(request, id):
    if request.method == "GET":
        salesperson = Salesperson.objects.get(id=id)
        return JsonResponse(
            {"salesperson": salesperson},
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
        return JsonResponse(salesperson, encoder=SalespersonListEncoder, safe=False)


@require_http_methods(["GET", "POST"])
def api_list_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerListEncoder,
        )
    else:
        content = json.loads(request.body)
        customer = Customer.objects.create(**content)
        return JsonResponse(
            {"customer": customer},
            encoder=CustomerListEncoder,
        )


@require_http_methods(["GET", "DELETE", "PUT"])
def api_customer(request, id):
    if request.method == "GET":
        customer = Customer.objects.get(id=id)
        return JsonResponse(
            {"customer": customer},
            encoder=CustomerListEncoder,
        )
    elif request.method == "DELETE":
        count = Customer.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)
        Customer.objects.filter(id=id).update(**content)
        customer = Salesperson.objects.get(id=id)
        return JsonResponse(customer, encoder=CustomerListEncoder, safe=False)


@require_http_methods(["GET", "POST"])
def api_list_sales(request, auto_vo_vin=None):
    if request.method == "GET":
        if auto_vo_vin is not None:
            sales = Sale.objects.filter(automobile=auto_vo_vin)
        else:
            sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SalesListEncoder,
        )
    else:
        content = json.loads(request.body)
        automobile_vin = content["automobile"]
        auto = AutomobileVO.objects.get(vin=automobile_vin)
        content["automobile"] = auto

        customer = content["customer"]
        cust = Customer.objects.get(id=customer)
        content["customer"] = cust

        salesperson = content["salesperson"]
        sp = Salesperson.objects.get(id=salesperson)
        content["salesperson"] = sp

        sale = Sale.objects.create(**content)
        return JsonResponse(
            {"sale": sale},
            encoder=SalesListEncoder,
            safe=False,
        )


@require_http_methods(["GET", "DELETE"])
def api_sale(request, id):
    if request.method == "GET":
        sale = Sale.objects.get(id=id)
        return JsonResponse(
            {"sale": sale},
            encoder=SalesListEncoder,
        )
    elif request.method == "DELETE":
        count = Sale.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})


@require_http_methods(["PUT"])
def api_sold_sales(request, id):
    try:
        sale = Sale.objects.get(id=id)
        sale.soldauto()
        return JsonResponse(
            sale,
            encoder=SalesListEncoder,
            safe=False
        )
    except Sale.DoesNotExist:
        return JsonResponse(
            {"error": f"Sale with id {id} does not exist."},
            status=404
        )

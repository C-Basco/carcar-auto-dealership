from django.views.decorators.http import require_http_methods
import json
from django.http import JsonResponse

from .models import Salesperson, Sale, AutomobileVO
from customers.models import Customer

from .encoders import (
    SalespersonListEncoder,
    SalesListEncoder
)


@require_http_methods(["GET", "POST"])
def api_list_salespersons(request):
    if request.method == "GET":
        salespersons = Salesperson.objects.all()
        return JsonResponse(
            {"salespersons": salespersons},
            encoder=SalespersonListEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            salesperson = Salesperson.objects.create(**content)
            return JsonResponse(
                salesperson,
                encoder=SalespersonListEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the salesperson"}
            )
            response.status_code = 400
            return response


@require_http_methods(["GET", "DELETE", "PUT"])
def api_salesperson(request, id):
    if request.method == "GET":
        try:
            salesperson = Salesperson.objects.get(id=id)
            return JsonResponse(
                {"salesperson": salesperson},
                encoder=SalespersonListEncoder,
                safe=False,
            )
        except Salesperson.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            salesperson = Salesperson.objects.get(id=id)
            salesperson.delete()
            return JsonResponse(
                salesperson,
                encoder=SalespersonListEncoder,
                safe=False,
            )
        except Salesperson.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else:
        try:
            content = json.loads(request.body)
            Salesperson.objects.filter(id=id).update(**content)
            salesperson = Salesperson.objects.get(id=id)
            return JsonResponse(
                salesperson,
                encoder=SalespersonListEncoder,
                safe=False,
                )
        except Salesperson.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response


@require_http_methods(["GET", "POST"])
def api_list_sales(request, auto_vo_vin=None):
    if request.method == "GET":
        try:
            if auto_vo_vin is not None:
                sales = Sale.objects.filter(automobile=auto_vo_vin)
            else:
                sales = Sale.objects.all()
            return JsonResponse(
                {"sales": sales},
                encoder=SalesListEncoder,
            )
        except Sale.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    else:
        try:
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
        except Customer.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response


@require_http_methods(["GET", "DELETE"])
def api_sale(request, id):
    if request.method == "GET":
        sale = Sale.objects.get(id=id)
        return JsonResponse(
            sale,
            encoder=SalesListEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        sale = Sale.objects.get(id=id)
        sale.delete()
        return JsonResponse(
            sale,
            encoder=SalesListEncoder,
            safe=False,
        )


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

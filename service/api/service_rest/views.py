from django.shortcuts import render
from django.http import JsonResponse
from .models import AutomobileVO, Technician, Appointment
from common.json import ModelEncoder
from django.views.decorators.http import require_http_methods
import json
# Create your views here.


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin", "sold"]


class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = ["first_name", "last_name", "employee_id"]


class AppointmentDetailEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "date_time",
        "reason",
        "status",
        "vin",
        "customer",
        "technician"
    ]
    encoders = {
        "technician": TechnicianEncoder(),
    }



@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        technician = Technician.objects.all()
        return JsonResponse(
            {'technician': technician},
            encoder=TechnicianEncoder,
        )
    else:
        content = json.loads(request.body)
    technician = Technician.objects.create(**content)
    return JsonResponse(
        technician,
        encoder=TechnicianEncoder,
        safe=False
    )


@require_http_methods(["DELETE"])
def api_delete_technician(request, id):
    if request.method == "DELETE":
        count, _ = Technician.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})
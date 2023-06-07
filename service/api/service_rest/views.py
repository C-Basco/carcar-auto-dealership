from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from .models import Technician, Appointment
from django.views.decorators.http import require_http_methods
import json
from .encoders import (AppointmentDetailEncoder,
                       TechnicianEncoder)


@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        technician_list = []

        for technician in technicians:
            technician_dict = {}
            technician_dict['first_name'] = technician.first_name
            technician_dict['last_name'] = technician.last_name
            technician_dict['employee_id'] = technician.employee_id
            technician_dict['id'] = technician.id

            technician_list.append(technician_dict)
        return JsonResponse(
            {'technicians': technician_list, },
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
        tech = get_object_or_404(Technician, id=id)
        tech.delete()
        return JsonResponse(
                {"message": "Deleted"},
                status=200,
            )


@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {'appointments': appointments},
            encoder=AppointmentDetailEncoder,
        )
    else:
        content = json.loads(request.body)

        try:
            technician = Technician.objects.get(id=content["technician"])
            content["technician"] = technician
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid technician"},
                status=400,
            )

        appointment = Appointment.create(**content)
        return JsonResponse(
            appointment,
            encoder=AppointmentDetailEncoder,
            safe=False
        )


@require_http_methods(["DELETE", "GET"])
def api_list_appointment(request, id):
    if request.method == "GET":
        appointment = get_object_or_404(Appointment, id=id)
        return JsonResponse(
            appointment,
            encoder=AppointmentDetailEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        appointment = get_object_or_404(Appointment, id=id)
        count, _ = appointment.delete()
        return JsonResponse({"deleted": count > 0})


@require_http_methods(["PUT"])
def api_cancel_appointment(request, id):
    if request.method == "PUT":
        appointment = Appointment.objects.get(id=id)
        appointment.cancel()
        return JsonResponse(
            appointment,
            encoder=AppointmentDetailEncoder,
            safe=False,
        )


@require_http_methods(["PUT"])
def api_finish_appointment(request, id):
    if request.method == "PUT":
        appointment = Appointment.objects.get(id=id)
        appointment.finish()
        return JsonResponse(
            appointment,
            encoder=AppointmentDetailEncoder,
            safe=False,
        )

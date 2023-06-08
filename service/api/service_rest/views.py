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
        return JsonResponse(
            {'technicians': technicians},
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
        try:
            tech = Technician.objects.get(id=id)
            tech.delete()
            response = JsonResponse({
                "message": "Technician sucessfully deleted"})
            response.status_code = 200
            return response
        except Technician.DoesNotExist:
            response = JsonResponse({'message': 'Invalid Tech'})
            response.status_code = 404
            return response


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
        try:
            appointment = Appointment.objects.get(id=id)
            return JsonResponse(
                appointment,
                encoder=AppointmentDetailEncoder,
                safe=False,
            )
        except Appointment.DoesNotExist:
            response = JsonResponse({"message": "invalid appointment id"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            appointment = Appointment.objects.get(id=id)
            count, _ = appointment.delete()
            return JsonResponse({"deleted": count > 0})
        except Appointment.DoesNotExist:
            response = JsonResponse({"message": "invalid appointment id"})
            response.status_code = 404
            return response


@require_http_methods(["PUT"])
def api_cancel_appointment(request, id):
    if request.method == "PUT":
        try:
            appointment = Appointment.objects.get(id=id)
            appointment.cancel()
            return JsonResponse(
                appointment,
                encoder=AppointmentDetailEncoder,
                safe=False,
            )
        except Appointment.DoesNotExist:
            response = JsonResponse({"message": "invalid appointment id"})
            response.status_code = 404
            return response


@require_http_methods(["PUT"])
def api_finish_appointment(request, id):
    if request.method == "PUT":
        try:
            appointment = Appointment.objects.get(id=id)
            appointment.finish()
            return JsonResponse(
                appointment,
                encoder=AppointmentDetailEncoder,
                safe=False,
            )
        except Appointment.DoesNotExist:
            response = JsonResponse({"message": "invalid appointment id"})
            response.status_code = 404
            return response

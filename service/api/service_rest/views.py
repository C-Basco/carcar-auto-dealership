from django.http import JsonResponse
from .models import Technician, Appointment, ServiceGoal
from django.views.decorators.http import require_http_methods
import json
from .encoders import (AppointmentDetailEncoder,
                       TechnicianEncode,
                       ServiceGoalsEncoder)


@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
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
            response = JsonResponse({"message": "Invalid Tech"})
            response.status_code = 404
            return response


@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
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
                status=404,
            )
        appointment = Appointment.objects.create(**content)
        response = JsonResponse(
            appointment,
            encoder=AppointmentDetailEncoder,
            safe=False
        )
        response.status_code = 200
        return response


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
            appointment.delete()
            response = JsonResponse({"message": "appointment deleted"})
            response.status_code = 200
            return response
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


@require_http_methods(["GET", "POST"])
def api_list_service_goal(request):
    if request.method == "GET":
        goals = ServiceGoal.objects.all()
        return JsonResponse(
            {"goals": goals},
            encoder=ServiceGoalsEncoder,
        )
    else:
        content = json.loads(request.body)
        goal = ServiceGoal.objects.create(**content)
        return JsonResponse(
            goal,
            encoder=ServiceGoalsEncoder,
            safe=False
        )
        
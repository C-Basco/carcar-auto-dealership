from .models import AutomobileVO, Technician, Appointment, ServiceGoal
from common.json import ModelEncoder


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin", "sold"]


class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = ["id", "first_name", "last_name", "employee_id"]


class AppointmentDetailEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "id",
        "date_time",
        "reason",
        "vin",
        "customer",
        "technician",
        "status",
    ]
    encoders = {
        "technician": TechnicianEncoder(),
        "automobile": AutomobileVOEncoder(),
    }


class ServiceGoalsEncoder(ModelEncoder):
    model = ServiceGoal
    properties = [
        "id",
        "starts",
        "ends",
        "num_cars_confirmed",
        "num_cars_finished",
        "num_cars_canceled",
        "notes",         
    ]



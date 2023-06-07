from .models import AutomobileVO, Technician, Appointment
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
        "technician"
    ]
    encoders = {
        "technician": TechnicianEncoder(),
        "automobile": AutomobileVOEncoder(),
    }

    def get_extra_data(self, o):
        return {"status": o.status.name}

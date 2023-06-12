from django.contrib import admin
from .models import Technician, Appointment, ServiceGoal


@admin.register(Technician)
class TechnicianAdmin(admin.ModelAdmin):
    pass


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    pass


@admin.register(ServiceGoal)
class ServiceGoal(admin.ModelAdmin):
    pass


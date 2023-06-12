from django.urls import path

from .views import (
    api_list_technicians,
    api_delete_technician,
    api_list_appointments,
    api_list_appointment,
    api_cancel_appointment,
    api_finish_appointment,
    api_list_service_goal
)


urlpatterns = [
    path("technicians/", api_list_technicians,
         name="api_list_technicians"),
    path("technicians/<int:id>/", api_delete_technician,
         name="api_delete_technician"),
    path("appointments/", api_list_appointments,
         name="api_list_appointments"),
    path("appointments/<int:id>/", api_list_appointment,
         name="api_list_appointment"),
    path("appointments/<int:id>/cancel", api_cancel_appointment,
         name="api_cancel_appointment"),
    path("appointments/<int:id>/finish", api_finish_appointment,
         name="api_finish_appointment"),
     path("appointments/goals", api_list_service_goal,
         name="api_list_service_goal"),
     ]

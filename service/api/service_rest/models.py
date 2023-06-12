from django.db import models


class Technician(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    employee_id = models.CharField(max_length=50)

    def __str__(self):
        return self.employee_id


class Appointment(models.Model):

    date_time = models.CharField(max_length=30)
    reason = models.CharField(max_length=200)
    vin = models.CharField(max_length=17)
    customer = models.CharField(max_length=100)
    status = models.CharField(max_length=20, default="confirmed")

    technician = models.ForeignKey(
        Technician,
        related_name="technician",
        on_delete=models.PROTECT,
    )

    def cancel(self):
        status = "canceled"
        self.status = status
        self.save()

    def finish(self):
        status = "finished"
        self.status = status
        self.save()

    def __str__(self):
        return self.customer


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(default=False)


class ServiceGoal(models.Model):
    starts = models.DateTimeField()
    ends = models.DateTimeField()
    num_cars_confirmed = models.IntegerField()
    num_cars_finished = models.IntegerField()
    num_cars_canceled = models.IntegerField()
    notes = models.CharField(max_length=200)

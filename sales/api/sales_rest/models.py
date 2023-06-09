from django.db import models
from django.urls import reverse


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(default=False)

    def __str__(self):
        return self.vin


class Salesperson(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.first_name + " " + self.last_name

    def get_api_url(self):
        return reverse("api_salesperson", kwargs={"pk": self.id})


class Customer(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=12, unique=True)

    def __str__(self):
        return self.first_name + " " + self.last_name

    def get_api_url(self):
        return reverse("api_customer", kwargs={"pk": self.id})


class Sale(models.Model):
    automobile = models.ForeignKey(
        AutomobileVO, related_name="+",
        on_delete=models.CASCADE,
    )
    price = models.PositiveIntegerField()

    salesperson = models.ForeignKey(
        Salesperson,
        related_name="+",
        on_delete=models.CASCADE,
    )

    customer = models.ForeignKey(
        Customer,
        related_name="+",
        on_delete=models.CASCADE,
    )

    def soldauto(self):
        automobile = self.automobile
        automobile.sold = True
        automobile.save()
        self.save()

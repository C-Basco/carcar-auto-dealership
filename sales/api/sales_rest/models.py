from django.db import models


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(default=False)

    def __str__(self):
        return self.vin


class CustomerVO(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)

    def __str__(self):
        return self.first_name + " " + self.last_name


class Salesperson(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.first_name + " " + self.last_name


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
        CustomerVO,
        related_name="+",
        on_delete=models.CASCADE,
    )

    def soldauto(self):
        automobile = self.automobile
        automobile.sold = True
        automobile.save()
        self.save()

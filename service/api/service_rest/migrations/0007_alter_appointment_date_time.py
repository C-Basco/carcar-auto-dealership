# Generated by Django 4.0.3 on 2023-06-07 15:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0006_remove_technician_employee_user_name_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='date_time',
            field=models.CharField(max_length=20),
        ),
    ]

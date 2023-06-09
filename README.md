# CarCar

Team:

* Person 1 - Which microservice?
* Person 2 - Which microservice? - Amanda Southern | Service Microservice 

## Design

## Service microservice

Explain your models and integration with the inventory
microservice, here.

My Models include the technician model, appointment model, and the automobileVO model. The automobile VO model polls to the inventory microservice to see which automobiles have been sold, and what their VIN is. automobiles that have requested service and have a vin that matches one in inventory will be marked as VIP on the front end. The technician model is a foreign key to the appointment model so that a technician can be assigned to an appointment. This also means that technicians cannot be deleted if they are assigned to a pre existing appointment. 

## Sales microservice

Explain your models and integration with the inventory
microservice, here.

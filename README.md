# CarCar

# Overview
CarCar is an automobile dealership site that allows customers to to schedule appointments with a service representative and scroll through and selct cars from our inventory. 

this project was built by a team of two. Each member was in charge of their own microservice. 

Team:

* Person 1 - Constance Basco | Sales Microservice
* Person 2 - Amanda Southern | Service Microservice 

## Design

## Service microservice
Service microservice includeded the technician model, appointment model, and the automobileVO model. The automobile VO model polls to the inventory microservice to see which automobiles have been sold, and what their VIN is. automobiles that have requested service and have a vin that matches one in inventory will be marked as VIP on the front end. The technician model is a foreign key to the appointment model so that a technician can be assigned to an appointment. This also means that technicians cannot be deleted if they are assigned to a pre existing appointment. 

## Sales microservice
Sales microservice included a Salesperson model, Sale model, CustomerVO model and a automobileVO model. The automobileVO model polls to the inventory microservice to identify cars through a VIN number and alter the state of the car, whether it has been sold or not. The CustomerVO polls to the customers microservice and access customers through first and last name.

## Site Features
### Login/ Signup
Visitors to the site will be able to sign up to the dealership site. Those who have signed up will be able to login and logout of the website. 
### Scheduling
Customers will be able to select a date and time for an appointment from a selection of technicians. Admin has the ability to delete appointments. 
### Sales
If a sale has been made at the dealership it will be logged into the site. The car will be selected from inventory and then the salesperson who sold the car and the customer who purchased the car. Once logged the car status will be updated to sold. 

## Planned Features
an update to the design of the website to make it more appealing. 
## Technologies used


from django.db import models
from django.contrib.auth.models import User

class Rental(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    price_per_day = models.DecimalField(max_digits=10, decimal_places=2)
    available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class Booking(models.Model):
    rental = models.ForeignKey(Rental, related_name='bookings', on_delete=models.CASCADE)
    user_name = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Booking for {self.rental.title} by {self.user_name}'
    
class signup(models.Model):
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.username
    
class Property(models.Model):
    STATUS_CHOICES = [
        ("vacant", "Vacant"),
        ("pending", "Pending Approval"),
        ("approved", "Approved"),
        ("disapproved", "Disapproved"),
    ]

    landlord = models.ForeignKey(User, on_delete=models.CASCADE, related_name="properties")
    building_name = models.CharField(max_length=100)
    apartment_name = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    rent_per_month = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to="properties/")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="vacant")

    def __str__(self):
        return f"{self.building_name} - {self.apartment_name}"
from django.shortcuts import render, redirect
from rest_framework import viewsets
from .models import Rental
from .serializers import RentalSerializer
from .forms import *

class RentalViewSet(viewsets.ModelViewSet):
    queryset = Rental.objects.all()
    serializer_class = RentalSerializer

def signup_view(request):
    if request.method == 'POST':
        form = SignupForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login')
    else:
        form = SignupForm()
    return render(request, 'signup.html', {'form': form})

def login_view(request):
    if request.method == 'POST':
        form = LoginForm(data=request.POST)
        if form.is_valid():
            # Log the user in
            return redirect('rental-list')
    else:
        form = LoginForm()
    return render(request, 'login.html', {'form': form})
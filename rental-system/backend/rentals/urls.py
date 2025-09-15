from django.urls import path
from . import views

urlpatterns = [
    path('rentals/', views.RentalList.as_view(), name='rental-list'),
    path('rentals/<int:pk>/', views.RentalDetail.as_view(), name='rental-detail'),
]
from django.urls import path, include

urlpatterns = [
    path('rentals/', include('rentals.urls')),
]
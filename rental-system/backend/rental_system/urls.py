from django.contrib import admin
from django.urls import path
from rentals import views
from rentals.views import SignupView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", views.home, name="home"),  # Django homepage
    path('api/signup/', SignupView.as_view(), name='signup'),
]

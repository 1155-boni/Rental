from django.contrib import admin
from django.urls import path
from rentals import views
from rentals.views import SignupView, login_view

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", views.home, name="home"),  # Django homepage
    path('api/signup/', SignupView.as_view(), name='signup'),
    path("login/", login_view, name="login"),
    path("api/tenant-dashboard/", views.tenant_dashboard, name="tenant-dashboard"),
    path("api/landlord-dashboard/", views.landlord_dashboard, name="landlord-dashboard"),
    path("landlord/properties/", views.landlord_properties, name="landlord-properties"),
    path("tenant/properties/", views.tenant_properties, name="tenant-properties"),
]

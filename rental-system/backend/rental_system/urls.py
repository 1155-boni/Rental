from django.contrib import admin
from django.urls import path
from rentals import views
from rentals.views import SignupView, LoginView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", views.home, name="home"),  # Django homepage
    path('api/signup/', SignupView.as_view(), name='signup'),
    path('api/login/', LoginView.as_view(), name='login'),
    path("api/tenant-dashboard/", views.tenant_dashboard, name="tenant-dashboard"),
    path("api/landlord-dashboard/", views.landlord_dashboard, name="landlord-dashboard"),
]

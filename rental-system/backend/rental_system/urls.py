from django.contrib import admin
from django.urls import path
from rentals import views
from rentals.views import LoginView, SignupView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rentals.views import secret_view

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", views.home, name="home"),  # Django homepage
    path('api/signup/', SignupView.as_view(), name='signup'),
    path("api/login/", LoginView.as_view(), name="login"),
    path("api/landlord-dashboard/", views.landlord_dashboard, name="landlord-dashboard"),
    path("api/landlord/properties/", views.landlord_properties, name="landlord-properties"),
    path("api/tenant/properties/", views.tenant_properties, name="tenant-properties"),
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/secret/", secret_view, name="secret_view"),  # protected route,

]



from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view

def home(request):
    return HttpResponse("<h1>Welcome to the Rental System Backend!</h1>")

@api_view(["GET"])
def test_api(request):
    return Response({"message": "Hello from Django Backend!"})

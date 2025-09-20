from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework import status
from .serializers import SignupSerializer

def home(request):
    return HttpResponse("<h1>Welcome to the Rental System Backend!</h1>")

@api_view(["GET"])
def test_api(request):
    return Response({"message": "Hello from Django Backend!"})

class SignupView(APIView):
    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User created successfully."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

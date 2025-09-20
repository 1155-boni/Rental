from django.http import HttpResponse, JsonResponse
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework import status
from .serializers import SignupSerializer, LoginSerializer

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

class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = authenticate(
                username=serializer.validated_data['username'],
                password=serializer.validated_data['password']
            )
            if user:
                return Response({"message": "Login successful."}, status=status.HTTP_200_OK)
            return Response({"error": "Invalid credentials."}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
def tenant_dashboard(request):
    data = {
        "user_role": "Tenant",
        "my_rentals": [
            {"property": "2 Bedroom Apartment – Nairobi", "status": "Active"},
            {"property": "Studio – Mombasa", "status": "Pending Approval"},
        ],
        "payment_history": [
            {"date": "2025-09-01", "amount": "Ksh 20,000", "status": "Paid"},
            {"date": "2025-08-01", "amount": "Ksh 20,000", "status": "Paid"},
        ],
    }
    return JsonResponse(data)


def landlord_dashboard(request):
    data = {
        "user_role": "Landlord",
        "properties": [
            {"property": "3 Bedroom House – Kisumu", "status": "Occupied"},
            {"property": "1 Bedroom Apartment – Eldoret", "status": "Vacant"},
        ],
        "tenant_requests": [
            {"tenant": "John Doe", "property": "Studio – Nairobi", "status": "Pending"},
            {"tenant": "Jane Smith", "property": "1 Bedroom – Nakuru", "status": "Approved"},
        ],
    }
    return JsonResponse(data)
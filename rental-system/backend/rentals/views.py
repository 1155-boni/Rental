from django.http import HttpResponse, JsonResponse
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework import status
from .serializers import *
from .models import Property
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken


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

@api_view(["POST"])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(request, username=username, password=password)

    if user is not None:
        refresh = RefreshToken.for_user(user)
        return Response({
            "token": str(refresh.access_token),
            "refresh": str(refresh),
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
            }
        })
    else:
        return Response(
            {"detail": "Invalid username or password"},
            status=status.HTTP_401_UNAUTHORIZED
        )
    
@login_view
@api_view(["GET"])
@permission_classes([IsAuthenticated])
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

@login_view
@api_view(["GET"])
@permission_classes([IsAuthenticated])
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



# Landlord properties
@login_view
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def landlord_properties(request):
    properties = Property.objects.filter(landlord=request.user)
    serializer = PropertySerializer(properties, many=True)
    return Response(serializer.data)

# Tenant view: only vacant and not pending
@login_view
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def tenant_properties(request):
    properties = Property.objects.filter(status="Vacant")
    serializer = PropertySerializer(properties, many=True)
    return Response(serializer.data)
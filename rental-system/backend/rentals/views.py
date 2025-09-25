from contextvars import Token
from django.http import HttpResponse, JsonResponse
from django.contrib.auth import authenticate ,login, logout
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework import status
from .serializers import *
from .models import Property
from rest_framework import viewsets, permissions
from .serializers import PropertySerializer
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
    
class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data["username"]
            password = serializer.validated_data["password"]

            user = authenticate(username=username, password=password)

            if user is not None:
                return Response(
                    {
                        "message": "Login successful",
                        "user": {
                            "id": user.id,
                            "username": user.username,
                            "email": user.email,
                        },
                    },
                    status=status.HTTP_200_OK,
                )
            return Response(
                {"error": "Invalid username or password"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response({"message": "Logged out"}, status=status.HTTP_200_OK)


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

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def landlord_properties(request):
    properties = Property.objects.filter(landlord=request.user)
    serializer = PropertySerializer(properties, many=True)
    return Response(serializer.data)

# Tenant view: only vacant and not pending

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def tenant_properties(request):
    properties = Property.objects.filter(status="Vacant")
    serializer = PropertySerializer(properties, many=True)
    return Response(serializer.data)

class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    permission_classes = [permissions.AllowAny]

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def secret_view(request):
    user = request.user
    return Response({"message": f"Hey {user.username}, hii ni secret data! 🔒"})
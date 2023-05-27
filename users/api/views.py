from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from users.models import *
from users.api.serializers import RegistrationSerializer

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh'
    ]
    
    return Response(routes)


@api_view(['POST'])
def registerView(request):
    """Resgister a new user"""

    if request.method == 'POST':
        serializer = RegistrationSerializer(data=request.data)

        data = {}
        
        if serializer.is_valid():
            account = serializer.save()

            data['response'] = "Registration Successfull!"
            data['username'] = account.username
            data['email'] = account.email


            refresh = RefreshToken.for_user(account)
            data['token'] = {
                                'refresh': str(refresh),
                                'access': str(refresh.access_token),
                            }

        else:
            data = serializer.errors
            
        return Response(data, status=status.HTTP_201_CREATED)
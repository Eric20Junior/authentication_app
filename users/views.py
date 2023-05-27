from rest_framework.response import Response
from rest_framework import status
from .models import Profile
from .serializers import ProfileSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

# Create your views here.
class ProfileListCreateAPIView(APIView):
    """
    List all churches, or create a new church.
    """



    def get(self, request):
        profile = Profile.objects.all()
        serializer = ProfileSerializer(profile, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


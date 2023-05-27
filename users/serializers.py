from rest_framework import serializers
from users.models import *
from users.api.serializers import RegistrationSerializer

class ProfileSerializer(serializers.ModelSerializer):
    user = RegistrationSerializer(many=False, read_only=True)
    class Meta:
        model = Profile
        fields = ('user', 'first_name', 'last_name', 'bio', 'email')
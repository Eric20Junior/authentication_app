from django.urls import path
from users.api.views import registerView
from .views import MyTokenObtainPairView, getRoutes

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('', getRoutes),
    path('register/', registerView, name='register'),
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

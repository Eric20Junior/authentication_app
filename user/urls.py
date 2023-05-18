from django.urls import path
from . import views

urlpatterns = [
    path('profile/', views.profile_list),
    path('update/<int:pk>/', views.updateProfile.as_view()),
]

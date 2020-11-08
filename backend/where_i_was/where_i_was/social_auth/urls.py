from django.urls import path

from social_auth.views import UserDetailView


urlpatterns = [
    path('<int:id>/', UserDetailView.as_view())
]
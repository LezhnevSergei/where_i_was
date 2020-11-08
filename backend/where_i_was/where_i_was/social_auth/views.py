from rest_framework.response import Response
from rest_framework.views import APIView
from social_django.models import UserSocialAuth

from social_auth.serializers import UserSerializer


class UserDetailView(APIView):
    def get(self, request, id):
        user = UserSocialAuth.objects.get(uid=id)
        serializer = UserSerializer(user)
        return Response(serializer.data)

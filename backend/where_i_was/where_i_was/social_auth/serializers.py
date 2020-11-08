from django.contrib.auth.models import User
from rest_framework import serializers
from social_django.models import UserSocialAuth


class PictureDataSerializer(serializers.Serializer):
    url = serializers.CharField(max_length=255)


class PictureSerializer(serializers.Serializer):
    data = PictureDataSerializer()


class ExtraDataSerializer(serializers.Serializer):
    picture = PictureSerializer()


class NativeUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username',)


class UserSerializer(serializers.ModelSerializer):
    extra_data = ExtraDataSerializer()
    user = NativeUserSerializer()

    class Meta:
        model = UserSocialAuth
        fields = ('id', 'user', 'extra_data',)
        depth = 1




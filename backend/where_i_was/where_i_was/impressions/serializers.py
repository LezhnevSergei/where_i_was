from rest_framework import serializers

from impressions.models import Impression


class ImpressionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Impression
        fields = ('id', 'author', 'title', 'lat', 'lng', 'comment',)
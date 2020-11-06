from rest_framework import viewsets

from impressions.models import Impression
from impressions.serializers import ImpressionSerializer


class ImpressionViewSet(viewsets.ModelViewSet):
    queryset = Impression.objects.all()
    serializer_class = ImpressionSerializer


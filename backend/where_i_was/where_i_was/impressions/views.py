from rest_framework import viewsets

from impressions.models import Impression
from impressions.serializers import ImpressionSerializer


class ImpressionViewSet(viewsets.ModelViewSet):
    serializer_class = ImpressionSerializer

    def get_queryset(self):
        current_user = self.request.user
        impressions = Impression.objects.filter(author=current_user.id)
        ordered_impressions = impressions.order_by('-created_at')
        return ordered_impressions


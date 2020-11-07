from django.contrib.auth import get_user_model
from django.test import TestCase

from impressions.models import Impression
from impressions.serializers import ImpressionSerializer


class ImpressionSerializerTestCase(TestCase):
    def setUp(self):
        self.user = get_user_model().objects.create(
            username='testuser',
            password='password123',
        )
        self.impression1 = Impression.objects.create(
            author=self.user,
            title='Some title',
            comment='Some comment...',
            lat=12.3456789,
            lng=98.7654321,
        )
        self.impression2 = Impression.objects.create(
            author=self.user,
            title='Some other title',
            comment='Some other comment...',
            lat=98.7654321,
            lng=12.3456789,
        )

    def test_ok(self):
        impression1 = self.impression1
        impression2 = self.impression2
        serialized = ImpressionSerializer(
            [impression1, impression2],
            many=True,
        )
        serialized_data = serialized.data
        expected_data = [
            {
                'id': impression1.id,
                'author': self.user.id,
                'title': 'Some title',
                'lat': '12.34567890',
                'lng': '98.76543210',
                'comment': 'Some comment...',
            },
            {
                'id': impression2.id,
                'author': self.user.id,
                'title': 'Some other title',
                'lat': '98.76543210',
                'lng': '12.34567890',
                'comment': 'Some other comment...',
            },
        ]

        self.assertEquals(expected_data, serialized_data)

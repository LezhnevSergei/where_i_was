import json

from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from impressions.models import Impression
from impressions.serializers import ImpressionSerializer


class ImpressionApiTestCase(APITestCase):
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

    def test_get(self):
        impression1 = self.impression1
        impression2 = self.impression2
        serialized = ImpressionSerializer(
            [impression1, impression2],
            many=True,
        )
        serialized_data = serialized.data
        url = reverse('impression-list')
        response = self.client.get(url)
        response_status_code = response.status_code
        response_data = response.data
        self.assertEquals(status.HTTP_200_OK, response_status_code)
        self.assertEquals(serialized_data, response_data)

    def test_create(self):
        self.assertEquals(2, Impression.objects.all().count())
        url = reverse('impression-list')
        data = {
            'author': self.user.id,
            'title': 'Some new impression title',
            'lat': 12.34557890,
            'lng': 98.76543210,
            'comment': 'Some new impression comment...',
        }
        json_data = json.dumps(data)
        self.client.force_login(self.user)
        response = self.client.post(
            url,
            data=json_data,
            content_type='application/json',
        )
        response_status_code = response.status_code
        self.assertEquals(status.HTTP_201_CREATED, response_status_code)
        self.assertEquals(3, Impression.objects.all().count())

    def test_remove(self):
        self.assertEquals(2, Impression.objects.all().count())
        impression_id_for_remove = self.impression2.id
        url = reverse(
            'impression-detail',
            kwargs={'pk': impression_id_for_remove},
        )
        self.client.force_login(self.user)
        response = self.client.delete(url)
        response_status_code = response.status_code
        self.assertEquals(status.HTTP_204_NO_CONTENT, response_status_code)
        self.assertEquals(1, Impression.objects.all().count())

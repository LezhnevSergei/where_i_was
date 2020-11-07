from django.contrib.auth import get_user_model
from django.test import TestCase

from impressions.models import Impression


class ImpressionModelTestCase(TestCase):

    def setUp(self):
        self.user = get_user_model().objects.create(
            username='testuser',
            password='password123',
        )
        self.impression = Impression.objects.create(
            author=self.user,
            title='Some title',
            comment='Some comment...',
            lat=12.3456789,
            lng=98.7654321,
        )

    def test_title_content(self):
        impression = self.impression
        expected_impression_title = f'{impression.title}'
        self.assertEquals(expected_impression_title, 'Some title')

    def test_text_content(self):
        impression = self.impression
        expected_impression_comment = f'{impression.comment}'
        self.assertEquals(expected_impression_comment, 'Some comment...')

    def test_bind_impression_to_user(self):
        impression = self.impression
        user = self.user
        user_id = user.id
        expected_user_id = impression.author.id
        self.assertEquals(expected_user_id, user_id)

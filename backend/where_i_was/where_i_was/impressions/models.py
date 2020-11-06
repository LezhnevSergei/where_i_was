from django.db import models
from django.contrib.auth.models import User


class Impression(models.Model):
    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
    )
    text = models.TextField(
        verbose_name='Текст воспоминания',
    )
    lat = models.DecimalField(
        verbose_name='Широта',
        max_digits=10,
        decimal_places=8,
    )
    lng = models.DecimalField(
        verbose_name='Долгота',
        max_digits=11,
        decimal_places=8,
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.text[:20]}..."

from rest_framework.routers import SimpleRouter

from impressions.views import ImpressionViewSet

router = SimpleRouter()
router.register('', ImpressionViewSet, basename='impression')

urlpatterns = router.urls

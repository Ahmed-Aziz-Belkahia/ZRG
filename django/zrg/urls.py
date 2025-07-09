from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
from api.views import FiveMCallback

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('accounts/fivem/callback/', FiveMCallback.as_view(), name='fivem-callback'),
    path('accounts/', include('allauth.urls')),
    re_path(r"^(?!admin|media/|static/|api/).*", TemplateView.as_view(template_name="index.html")),
]

# Serve static and media files during development
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
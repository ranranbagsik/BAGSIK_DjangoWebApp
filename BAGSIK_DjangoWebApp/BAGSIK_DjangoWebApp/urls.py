from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('dynamic-form/', include('home.urls')),   # from your earlier module
    path('registration/', include('registration.urls')),  # ✅ correct way
]

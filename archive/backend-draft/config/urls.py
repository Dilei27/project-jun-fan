from django.contrib import admin
from django.urls import path
from core.views import (
    home, hub, product_detail, product_dashboard, product_demo,
    project_detail, docs_index, doc_detail, decisions_page,
    framework, search, search_api, ai_ask, analytics, health,
)

urlpatterns = [
    path('', home, name='home'),
    path('hub/', hub, name='hub'),
    path('produto/<slug:product_id>/', product_detail, name='product_detail'),
    path('produto/<slug:product_id>/dashboard/', product_dashboard, name='product_dashboard'),
    path('produto/<slug:product_id>/demo/', product_demo, name='product_demo'),
    path('projeto/<slug:project_id>/', project_detail, name='project_detail'),
    path('docs/', docs_index, name='docs_index'),
    path('docs/<slug:doc_id>/', doc_detail, name='doc_detail'),
    path('decisoes/', decisions_page, name='decisions'),
    path('framework/', framework, name='framework'),
    path('busca/', search, name='search'),
    path('api/search/', search_api, name='search_api'),
    path('api/ai-ask/', ai_ask, name='ai_ask'),
    path('analytics/', analytics, name='analytics'),
    path('health/', health, name='health'),
    path('admin/', admin.site.urls),
]

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from .views import stats_view, featured_servers_view, script_by_slug_view, all_scripts_view, write_review_view, all_testimonials_view, faq_view, blog_post_view, all_blog_posts_view, team_members_view, fivem_login_view, FiveMCallback

urlpatterns = [
    path('stats/', stats_view, name='stats'),
    path('featured-servers/', featured_servers_view, name='featured_servers'),  # URL for featured servers
    path('scripts/<slug:slug>/', script_by_slug_view, name='script_by_slug'),  # URL for script by slug
    path('scripts/', all_scripts_view, name='all_scripts'),  # URL for all scripts
    path('write-review/', write_review_view, name='write_review'),
    path('testimonials/', all_testimonials_view, name='all_testimonials'),  # URL for all testimonials
    path('faqs/', faq_view, name='faq_view'),  # URL for FAQs
    path('posts/<slug:slug>/', blog_post_view, name='blog_post_view'),
    path('posts/', all_blog_posts_view, name='all_blog_posts_view'),
    path('team-members/', team_members_view, name='team_members_view'),
    path('fivem-login/', fivem_login_view, name='fivem_login'),
    path('fivem-callback/', FiveMCallback.as_view(), name='fivem_callback'),
]
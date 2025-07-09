from django.http import JsonResponse
from django.shortcuts import get_object_or_404, render, redirect
from .models import Stats, FeaturedServer, Script, Review, Testimonial, FAQ, BlogPost, TeamMember
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Q
import json
import requests
from django.conf import settings
from django.contrib.auth import login, get_user_model
from django.urls import reverse
from django.views import View
from django.contrib.auth.forms import UserCreationForm

def stats_view(request):
    """Returns the stats data as a JSON response."""
    try:
        stats = Stats.objects.first()  # Get the first Stats object (assuming only one exists)
        if stats:
            data = {
                "active_users": stats.get_active_users(),
                "premium_scripts": stats.get_premium_scripts(),
            }
        else:
            data = {
                "active_users": 0,
                "premium_scripts": 0,
            }
    except Exception as e:
        data = {"error": str(e)}

    return JsonResponse(data)

def featured_servers_view(request):
    """Returns the featured servers data as a JSON response."""
    try:
        servers = FeaturedServer.objects.all()  # Get all FeaturedServer objects
        data = [
            {
                "name": server.name,
                "image": server.image.url if server.image else None,
                "url": server.url,
            }
            for server in servers
        ]
    except Exception as e:
        data = {"error": str(e)}

    return JsonResponse(data, safe=False)

def script_by_slug_view(request, slug):
    """Returns a script by its slug as a JSON response."""
    try:
        script = get_object_or_404(Script, slug=slug)
        data = {
            "id": script.pk,  # Added id field using the primary key
            "title": script.title,
            "slug": script.slug,
            "description": script.description,
            "price": str(script.price),
            "image": script.image.url if script.image else None,
            "video": script.video,
            "demoVideo": script.video,
            "categories": [category.name for category in script.categories.all()],
            "frameworks": [framework.name for framework in script.frameworks.all()],
            "is_featured": script.is_featured,
            "is_bestseller": script.is_bestseller,
            "created_at": script.created_at,
            "tebex_id": script.tebex_id,
            "showcase_servers": [server.name for server in script.showcase_servers.all()],
            "images": [image.image.url if image.image else None for image in script.images.all()],
            "key_benefits": script.key_benefits,
            "reviews_count": script.get_reviews_count(),
            "rating": script.get_rating(),
            "reviews": [
                {
                    "name": review.name,
                    "rating": review.rating,
                    "description": review.description,
                    "created_at": review.created_at,
                }
                for review in script.get_reviews()
            ],
            "core_features": script.core_features,  # Added key_featured field
            "system_requirements": script.system_requirements,  # Added system_requirements field
        }
    except Exception as e:
        data = {"error": str(e)}

    return JsonResponse(data)

def all_scripts_view(request):
    """Returns all scripts as a JSON response."""
    try:
        scripts = Script.objects.all()
        data = [
            {
                "id": script.pk,
                "title": script.title,
                "slug": script.slug,
                "description": script.description,
                "price": str(script.price),
                "image": script.image.url if script.image else None,
                "video": script.video,
                "demoVideo": script.video,
                "categories": [category.name for category in script.categories.all()],
                "frameworks": [framework.name for framework in script.frameworks.all()],
                "is_featured": script.is_featured,
                "is_bestseller": script.is_bestseller,
                "created_at": script.created_at,
                "tebex_id": script.tebex_id,
                "showcase_servers": [server.name for server in script.showcase_servers.all()],
                "rating": script.get_rating(),
                "reviews_count": script.get_reviews_count(),
                "system_requirements": script.system_requirements,
            }
            for script in scripts
        ]
    except Exception as e:
        data = {"error": f"Failed to fetch scripts: {str(e)}"}

    return JsonResponse(data, safe=False)

@csrf_exempt
def write_review_view(request):
    """Handles review submissions for a script."""
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            script_id = data.get('script_id')
            name = data.get('name')
            rating = data.get('rating')
            description = data.get('description')

            if not all([script_id, name, rating, description]):
                return JsonResponse({'error': 'All fields are required.'}, status=400)

            script = Script.objects.filter(pk=script_id).first()
            if not script:
                return JsonResponse({'error': 'Script not found.'}, status=404)

            Review.objects.create(
                script=script,
                name=name,
                rating=rating,
                description=description
            )

            return JsonResponse({'message': 'Review submitted successfully.'}, status=201)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data.'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request method.'}, status=405)

def all_testimonials_view(request):
    """Returns all testimonials as a JSON response."""
    try:
        testimonials = Testimonial.objects.all()
        data = [
            {
                "pfp": testimonial.pfp.url if testimonial.pfp else None,
                "name": testimonial.name,
                "comment": testimonial.comment,
                "date": testimonial.date,
            }
            for testimonial in testimonials
        ]
    except Exception as e:
        data = {"error": str(e)}

    return JsonResponse(data, safe=False)

def faq_view(request):
    """Returns all FAQs as a JSON response."""
    try:
        faqs = FAQ.objects.all()
        data = [{'question': faq.question, 'answer': faq.answer} for faq in faqs]
    except Exception as e:
        data = {"error": str(e)}

    return JsonResponse(data, safe=False)

def blog_post_view(request, slug):
    """Returns a blog post by its slug as a JSON response."""
    try:
        post = BlogPost.objects.filter(slug=slug).first()
        if not post:
            return JsonResponse({"error": "Blog post not found."}, status=404)

        data = {
            "title": post.title,
            "description": post.description,
            "content": post.content,
            "author": post.author,
            "published_date": post.published_date,
            "modified_date": post.modified_date,
            "category": post.category,
            "slug": post.slug,
        }
        return JsonResponse(data)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

def all_blog_posts_view(request):
    """Returns all blog posts as a JSON response."""
    try:
        posts = BlogPost.objects.all()
        data = [
            {
                "title": post.title,
                "description": post.description,
                "author": post.author,
                "published_date": post.published_date,
                "category": post.category,
                "slug": post.slug,
            }
            for post in posts
        ]
    except Exception as e:
        data = {"error": str(e)}

    return JsonResponse(data, safe=False)

def team_members_view(request):
    """Returns all team members as a JSON response."""
    try:
        team_members = TeamMember.objects.all()
        data = [
            {
                "name": member.name,
                "role": member.role,
                "short_description": member.short_description,
            }
            for member in team_members
        ]
    except Exception as e:
        data = {"error": str(e)}

    return JsonResponse(data, safe=False)

def search_view(request):
    """Handles search queries for blog posts, scripts, and team members."""
    query = request.GET.get('q', '')
    results = {
        "blog_posts": [],
        "scripts": [],
        "team_members": []
    }

    if query:
        # Search BlogPosts
        blog_posts = BlogPost.objects.filter(
            Q(title__icontains=query) | Q(description__icontains=query) | Q(content__icontains=query)
        )
        results["blog_posts"] = [
            {
                "title": post.title,
                "description": post.description,
                "author": post.author,
                "published_date": post.published_date,
                "category": post.category,
                "slug": post.slug,
            }
            for post in blog_posts
        ]

        # Search Scripts
        scripts = Script.objects.filter(
            Q(title__icontains=query) | Q(description__icontains=query) | Q(key_benefits__icontains=query)
        )
        results["scripts"] = [
            {
                "title": script.title,
                "description": script.description,
                "price": str(script.price),
                "slug": script.slug,
                "images": [image.image.url if image.image else None for image in script.images.all()],
            }
            for script in scripts
        ]

        # Search TeamMembers
        team_members = TeamMember.objects.filter(
            Q(name__icontains=query) | Q(role__icontains=query) | Q(short_description__icontains=query)
        )
        results["team_members"] = [
            {
                "name": member.name,
                "role": member.role,
                "short_description": member.short_description,
            }
            for member in team_members
        ]

    return JsonResponse(results, safe=False)

class FiveMCallback(View):
    def get(self, request, *args, **kwargs):
        code = request.GET.get('code')
        if not code:
            return JsonResponse({'error': 'Code is missing'}, status=400)

        # Exchange code for access token
        token_response = requests.post(
            'https://idms.fivem.net/oauth2/token',
            data={
                'grant_type': 'authorization_code',
                'code': code,
                'redirect_uri': request.build_absolute_uri(reverse('fivem_callback')),
                'client_id': settings.FIVEM_CLIENT_ID,
                'client_secret': settings.FIVEM_CLIENT_SECRET,
            }
        )

        if token_response.status_code != 200:
            return JsonResponse({'error': 'Token exchange failed'}, status=400)

        access_token = token_response.json().get('access_token')

        # Fetch user info
        userinfo_response = requests.get(
            'https://idms.fivem.net/oauth2/userinfo',
            headers={
                'Authorization': f'Bearer {access_token}'
            }
        )

        if userinfo_response.status_code != 200:
            return JsonResponse({'error': 'Failed to fetch user info'}, status=400)

        userinfo = userinfo_response.json()
        sub = userinfo.get('sub')
        email = userinfo.get('email')
        preferred_username = userinfo.get('preferred_username')

        # Get or create user
        User = get_user_model()
        user = User.objects.filter(fivem_id=sub).first()
        if not user:
            username = preferred_username or f'fivem_{sub}'
            user = User.objects.create(
                username=username,
                email=email,
                fivem_id=sub
            )

        # Return user data as JSON
        return JsonResponse({
            'username': user.username,
            'email': user.email,
            'fivem_id': user.fivem_id
        }, status=200)

def fivem_login_view(request):
    """Returns the FiveM OAuth login URL."""
    fivem_auth_url = (
        f"https://idms.fivem.net/oauth2/authorize?"
        f"response_type=code&client_id={settings.FIVEM_CLIENT_ID}&redirect_uri={request.build_absolute_uri(reverse('fivem_callback'))}"
    )
    return JsonResponse({'url': fivem_auth_url}, status=200)
from django.core.management.base import BaseCommand
from django.utils.text import slugify
from api.models import BlogPost

class Command(BaseCommand):
    help = 'Generate slugs for BlogPost entries that are missing them.'

    def handle(self, *args, **kwargs):
        posts_without_slugs = BlogPost.objects.filter(slug__isnull=True)
        for post in posts_without_slugs:
            post.slug = slugify(post.title)
            post.save()
            self.stdout.write(self.style.SUCCESS(f'Slug generated for: {post.title}'))

        self.stdout.write(self.style.SUCCESS('Slug generation completed.'))
    
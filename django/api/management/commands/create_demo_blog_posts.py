from django.core.management.base import BaseCommand
from api.models import BlogPost
from datetime import datetime

class Command(BaseCommand):
    help = 'Create 5 demo blog posts'

    def handle(self, *args, **kwargs):
        blog_posts = [
            {
                'title': 'How to Get Started with Django',
                'description': 'A beginner-friendly guide to setting up your first Django project.',
                'content': '<p>Django is a powerful web framework...</p>',
                'author': 'Jane Doe',
                'published_date': datetime(2025, 5, 1, 10, 0),
                'modified_date': datetime(2025, 5, 2, 12, 0),
                'category': 'Development',
            },
            {
                'title': 'Understanding REST APIs',
                'description': 'Learn the basics of REST APIs and how to integrate them into your projects.',
                'content': '<p>REST APIs are a cornerstone...</p>',
                'author': 'John Smith',
                'published_date': datetime(2025, 5, 3, 14, 0),
                'modified_date': datetime(2025, 5, 4, 16, 0),
                'category': 'API',
            },
            {
                'title': 'Top 10 Tips for Writing Clean Code',
                'description': 'Improve your coding skills with these essential tips.',
                'content': '<p>Writing clean code is an art...</p>',
                'author': 'Alice Johnson',
                'published_date': datetime(2025, 5, 5, 9, 0),
                'modified_date': datetime(2025, 5, 6, 11, 0),
                'category': 'Programming',
            },
            {
                'title': 'Deploying Your Django App',
                'description': 'A step-by-step guide to deploying your Django application.',
                'content': '<p>Deploying a Django app...</p>',
                'author': 'Michael Brown',
                'published_date': datetime(2025, 5, 7, 13, 0),
                'modified_date': datetime(2025, 5, 8, 15, 0),
                'category': 'Deployment',
            },
            {
                'title': 'Exploring Python Libraries for Data Science',
                'description': 'An overview of popular Python libraries for data analysis and visualization.',
                'content': '<p>Python offers a rich ecosystem...</p>',
                'author': 'Emily Davis',
                'published_date': datetime(2025, 5, 9, 10, 0),
                'modified_date': datetime(2025, 5, 10, 12, 0),
                'category': 'Data Science',
            },
        ]

        for post in blog_posts:
            BlogPost.objects.create(**post)

        self.stdout.write(self.style.SUCCESS('Successfully created 5 demo blog posts'))

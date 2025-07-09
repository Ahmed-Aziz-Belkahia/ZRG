from django.core.management.base import BaseCommand
from api.models import Testimonial

class Command(BaseCommand):
    help = 'Create 5 demo testimonials'

    def handle(self, *args, **kwargs):
        demo_testimonials = [
            {
                'pfp': None,
                'name': 'John Doe',
                'comment': 'This script is amazing! It has completely transformed my server.',
                'date': '2025-05-01',
            },
            {
                'pfp': None,
                'name': 'Jane Smith',
                'comment': 'I love the features and the ease of use. Highly recommended!',
                'date': '2025-05-02',
            },
            {
                'pfp': None,
                'name': 'Alice Johnson',
                'comment': 'The support team is fantastic. They helped me set everything up.',
                'date': '2025-05-03',
            },
            {
                'pfp': None,
                'name': 'Bob Brown',
                'comment': 'Great value for money. My players are loving it.',
                'date': '2025-05-04',
            },
            {
                'pfp': None,
                'name': 'Charlie Davis',
                'comment': 'The best script I have ever used. Kudos to the developers!',
                'date': '2025-05-05',
            },
        ]

        for testimonial_data in demo_testimonials:
            Testimonial.objects.create(**testimonial_data)

        self.stdout.write(self.style.SUCCESS('Successfully created 5 demo testimonials'))

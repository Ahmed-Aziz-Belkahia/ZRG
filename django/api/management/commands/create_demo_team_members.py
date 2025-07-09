from django.core.management.base import BaseCommand
from api.models import TeamMember

class Command(BaseCommand):
    help = 'Create 4 demo Team Members'

    def handle(self, *args, **kwargs):
        demo_members = [
            {"name": "Alice Johnson", "role": "Project Manager", "short_description": "Oversees project timelines and deliverables."},
            {"name": "Bob Smith", "role": "Software Engineer", "short_description": "Develops and maintains software solutions."},
            {"name": "Charlie Brown", "role": "Designer", "short_description": "Creates user-friendly designs and interfaces."},
            {"name": "Diana Prince", "role": "Quality Assurance", "short_description": "Ensures the quality of software through rigorous testing."},
        ]

        for member_data in demo_members:
            TeamMember.objects.create(**member_data)

        self.stdout.write(self.style.SUCCESS('Successfully created 4 demo Team Members'))

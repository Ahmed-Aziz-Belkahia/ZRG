from django.core.management.base import BaseCommand
from django.core.management import call_command

class Command(BaseCommand):
    help = 'Master command to reset migrations, drop tables, reapply migrations, and populate the database with demo data.'

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.WARNING('Populating database with demo data...'))
        call_command('create_demo_scripts')
        call_command('create_demo_team_members')
        call_command('create_demo_testimonials')
        call_command('create_demo_faqs')
        call_command('create_demo_blog_posts')

        self.stdout.write(self.style.SUCCESS('Database reset and populated successfully!'))
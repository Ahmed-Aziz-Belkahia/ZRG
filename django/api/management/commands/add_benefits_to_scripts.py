from django.core.management.base import BaseCommand
from api.models import Script

class Command(BaseCommand):
    help = 'Add benefits to all scripts in the database'

    def handle(self, *args, **kwargs):
        scripts = Script.objects.all()
        for script in scripts:
            # Example benefits, replace with actual logic or data source
            benefits = [
                'Easy to use',
                'Highly customizable',
                'Optimized for performance',
                'Regular updates',
                'Great support'
            ]
            script.key_benefits = ', '.join(benefits)
            script.save()
            self.stdout.write(self.style.SUCCESS(f'Updated benefits for script: {script.title}'))

        self.stdout.write(self.style.SUCCESS('Successfully added benefits to all scripts'))

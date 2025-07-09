from django.core.management.base import BaseCommand
from api.models import Script, Review
from faker import Faker

class Command(BaseCommand):
    help = 'Create 3 reviews for each script in the database'

    def handle(self, *args, **kwargs):
        fake = Faker()

        scripts = Script.objects.all()
        for script in scripts:
            for _ in range(3):
                Review.objects.create(
                    script=script,
                    name=fake.name(),
                    rating=fake.random_int(min=1, max=5),
                    description=fake.text(max_nb_chars=200),
                )

        self.stdout.write(self.style.SUCCESS('Successfully created 3 reviews for each script'))

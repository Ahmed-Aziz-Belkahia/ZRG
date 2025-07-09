from django.core.management.base import BaseCommand
from api.models import FAQ

class Command(BaseCommand):
    help = 'Create 5 demo FAQs'

    def handle(self, *args, **kwargs):
        faqs = [
            {
                'question': 'How do you update your scripts?',
                'answer': 'We regularly update our scripts to ensure compatibility with the latest FiveM version and to add new features. Updates are typically released monthly, with critical fixes deployed as needed.'
            },
            {
                'question': 'Do you offer refunds?',
                'answer': 'Yes, we offer a 30-day money-back guarantee if you are not satisfied with your purchase. Refunds are only available if the script has not been used in a production environment.'
            },
            {
                'question': 'Can I use your scripts on multiple servers?',
                'answer': 'License terms vary by script. Some scripts allow multiple server usage, while others require separate licenses. Check the individual script description for specific licensing terms.'
            },
            {
                'question': 'How often do you update your scripts?',
                'answer': 'We regularly update our scripts to ensure compatibility with the latest FiveM version and to add new features. Updates are typically released monthly, with critical fixes deployed as needed.'
            },
            {
                'question': 'What support options do you offer?',
                'answer': 'We offer 24/7 support through our ticketing system and Discord community. Our team is dedicated to resolving issues promptly.'
            }
        ]

        for faq in faqs:
            FAQ.objects.create(**faq)

        self.stdout.write(self.style.SUCCESS('Successfully created 5 demo FAQs'))

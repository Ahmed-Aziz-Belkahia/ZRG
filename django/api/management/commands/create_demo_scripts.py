from django.core.management.base import BaseCommand
from api.models import Script, Image, Category, Framework, ShowcaseServer, Review

class Command(BaseCommand):
    help = 'Create demo data including images, categories, frameworks, showcase servers, and reviews linked to existing scripts.'

    def handle(self, *args, **kwargs):
        # Create categories
        category1 = Category.objects.get_or_create(name='Roleplay')[0]
        category2 = Category.objects.get_or_create(name='Economy')[0]
        category3 = Category.objects.get_or_create(name='Vehicles')[0]

        # Create frameworks
        framework1 = Framework.objects.get_or_create(name='ESX')[0]
        framework2 = Framework.objects.get_or_create(name='QBCore')[0]

        # Create showcase servers
        server1 = ShowcaseServer.objects.get_or_create(name='Eclipse RP', url='https://eclipserp.com', logo='featured_servers/eclipserp_logo.png')[0]
        server2 = ShowcaseServer.objects.get_or_create(name='Liberty RP', url='https://libertyrp.com', logo='featured_servers/libertyrp_logo.png')[0]

        # Create demo scripts
        demo_scripts = [
            {
                'title': 'Advanced Roleplay Framework',
                'description': 'A comprehensive roleplay system with jobs, inventory, and character customization.',
                'price': 79.99,
                'image': 'scripts/images/roleplay_framework.png',
                'video': 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                'categories': [category1],
                'frameworks': [framework1, framework2],
                'is_featured': True,
                'is_bestseller': True,
                'tebex_id': '123',
                'showcase_servers': [server1]
            },
            {
                'title': 'Economy Plus',
                'description': 'Complete economy system with banking, ATMs, and player-to-player transactions.',
                'price': 49.99,
                'image': 'scripts/images/economy_plus.png',
                'video': None,  # Added default value for missing 'video'
                'categories': [category2],
                'frameworks': [framework1],
                'is_featured': True,
                'is_bestseller': True,
                'tebex_id': '124',
                'showcase_servers': [server2]
            },
            {
                'title': 'Vehicle Showroom',
                'description': 'Create an immersive vehicle dealership with test drives and financing options.',
                'price': 34.99,
                'image': 'scripts/images/vehicle_showroom.png',
                'video': None,  # Added default value for missing 'video'
                'categories': [category3],
                'frameworks': [framework2],
                'is_featured': True,
                'is_bestseller': False,
                'tebex_id': '125',
                'showcase_servers': [server1, server2]
            },
            {
                'title': 'Advanced Job System',
                'description': 'Create custom jobs with missions, progression, and rewards.',
                'price': 44.99,
                'image': 'scripts/images/job_system.png',
                'video': None,  # Added default value for missing 'video'
                'categories': [category1],
                'frameworks': [framework1],
                'is_featured': True,
                'is_bestseller': False,
                'tebex_id': '126',
                'showcase_servers': [server2]
            },
            {
                'title': 'Property Management',
                'description': 'Complete property system with interiors, furniture, and rental options.',
                'price': 59.99,
                'image': 'scripts/images/property_management.png',
                'video': None,  # Added default value for missing 'video'
                'categories': [category1, category2],
                'frameworks': [framework1, framework2],
                'is_featured': True,
                'is_bestseller': False,
                'tebex_id': '127',
                'showcase_servers': [server1]
            }
        ]

        for script_data in demo_scripts:
            script = Script.objects.create(
                title=script_data['title'],
                description=script_data['description'],
                price=script_data['price'],
                image=script_data['image'],
                video=script_data['video'],
                is_featured=script_data['is_featured'],
                is_bestseller=script_data['is_bestseller'],
                tebex_id=script_data['tebex_id']
            )
            script.categories.set(script_data['categories'])
            script.frameworks.set(script_data['frameworks'])
            script.showcase_servers.set(script_data['showcase_servers'])

        # Link categories, frameworks, and showcase servers to existing scripts
        scripts = Script.objects.all()
        for script in scripts:
            script.categories.add(category1, category2, category3)
            script.frameworks.add(framework1, framework2)
            script.showcase_servers.add(server1, server2)

            # Create images for each script
            Image.objects.get_or_create(script=script, image='scripts/images/demo_image.png', alt=f"Image for {script.title}")

            # Create reviews for each script
            Review.objects.get_or_create(
                script=script,
                pfp='reviews/pfps/demo_pfp.png',
                name='Demo User',
                rating=5,
                description='This is a demo review.',
                created_at=script.created_at
            )

        self.stdout.write(self.style.SUCCESS('Successfully created demo data and linked it to existing scripts.'))

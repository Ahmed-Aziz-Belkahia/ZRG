from django.test import TestCase
from django.urls import reverse
from .models import Script, Image

class ScriptBySlugViewTest(TestCase):
    def setUp(self):
        # Create a script and associated images
        self.script = Script.objects.create(
            title="Test Script",
            slug="test-script",
            description="A test script",
            price=10.00
        )
        Image.objects.create(script=self.script, image="test_image.jpg")

    def test_script_by_slug_view(self):
        url = reverse("script_by_slug", args=[self.script.slug])
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertIn("images", response.json())
        self.assertEqual(response.json()["images"], ["test_image.jpg"])

# Create your tests here.

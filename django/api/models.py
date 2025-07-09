from django.db import models
from django.utils.text import slugify
from django.db import IntegrityError
from ckeditor.fields import RichTextField
from django.contrib.auth.models import AbstractUser

# Create your models here.

class Stats(models.Model):
    active_users = models.IntegerField(default=0)  # Number of active users
    premium_scripts = models.IntegerField(default=0)  # Number of premium scripts

    def get_active_users(self):
        """Returns the number of active users."""
        return self.active_users

    def get_premium_scripts(self):
        """Returns the number of premium scripts."""
        return self.premium_scripts

    def __str__(self):
        return f"Stats(active_users={self.active_users}, premium_scripts={self.premium_scripts})"


class FeaturedServer(models.Model):
    name = models.CharField(max_length=255)  # Name of the server
    image = models.ImageField(upload_to='featured_servers/')  # Image for the server
    url = models.URLField()  # URL of the server

    def __str__(self):
        return self.name


class Category(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Framework(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class ShowcaseServer(models.Model):
    name = models.CharField(max_length=255, blank=True, null=True)
    url = models.URLField(blank=True, null=True)
    logo = models.ImageField(upload_to='showcase_servers/', blank=True, null=True)

    def __str__(self) -> str:
        return self.name or "Unnamed Showcase Server"


class Script(models.Model):
    title = models.CharField(max_length=255, blank=True, null=True)
    slug = models.SlugField(unique=True, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    image = models.ImageField(upload_to='scripts/images/', blank=True, null=True)
    video = models.URLField(blank=True, null=True)
    categories = models.ManyToManyField(Category, related_name='scripts', blank=True)
    frameworks = models.ManyToManyField(Framework, related_name='scripts', blank=True)
    is_featured = models.BooleanField(default=False, blank=True, null=True)
    is_bestseller = models.BooleanField(default=False, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    tebex_id = models.CharField(max_length=255, blank=True, null=True)
    showcase_servers = models.ManyToManyField(ShowcaseServer, related_name='scripts', blank=True)
    key_benefits = models.TextField(blank=True, null=True)
    core_features = models.TextField(blank=True, null=True)
    system_requirements = models.TextField(blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            if self.title:
                base_slug = slugify(self.title)
            else:
                base_slug = "untitled-script"

            self.slug = base_slug
            counter = 1
            while True:
                try:
                    super(Script, self).save(*args, **kwargs)
                    break
                except IntegrityError:
                    self.slug = f"{base_slug}-{counter}"
                    counter += 1
        else:
            super(Script, self).save(*args, **kwargs)

    def get_reviews_count(self):
        """Returns the count of reviews for the script."""
        return self.reviews.count()

    def get_rating(self):
        """Returns the average rating of the script based on its reviews as a float rounded to 1 decimal place."""
        avg_rating = self.reviews.aggregate(models.Avg('rating'))['rating__avg'] or 0
        return round(avg_rating, 1)

    def get_reviews(self):
        """Returns all reviews for the script."""
        return self.reviews.all()

    def __str__(self) -> str:
        return self.title or "Untitled Script"


class Image(models.Model):
    script = models.ForeignKey(Script, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='scripts/images/', blank=True, null=True)
    alt = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self) -> str:
        return f"Image for {self.script.title}" if self.script.title else "Image for Unknown Script"


class Review(models.Model):
    script = models.ForeignKey(Script, on_delete=models.CASCADE, related_name='reviews')  # Establish reverse relationship
    pfp = models.ImageField(upload_to='reviews/pfps/', blank=True, null=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    rating = models.IntegerField(choices=[(i, str(i)) for i in range(1, 6)], blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    def __str__(self) -> str:
        return f"Review by {self.name} for {self.script.title}" if self.name and self.script.title else "Unnamed Review"


class Testimonial(models.Model):
    pfp = models.ImageField(upload_to='testimonials/pfps/', blank=True, null=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    comment = models.TextField(blank=True, null=True)
    date = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    def __str__(self) -> str:
        return f"Testimonial by {self.name}" if self.name else "Unnamed Testimonial"


class FAQ(models.Model):
    question = models.CharField(max_length=255)
    answer = models.TextField()

    def __str__(self):
        return self.question


class BlogPost(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    content = RichTextField()
    author = models.CharField(max_length=255)
    published_date = models.DateTimeField()
    modified_date = models.DateTimeField()
    category = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title)
            self.slug = base_slug
            counter = 1
            while True:
                try:
                    super(BlogPost, self).save(*args, **kwargs)
                    break
                except IntegrityError:
                    self.slug = f"{base_slug}-{counter}"
                    counter += 1
        else:
            super(BlogPost, self).save(*args, **kwargs)

    def __str__(self):
        return self.title


class TeamMember(models.Model):
    name = models.CharField(max_length=255)
    role = models.CharField(max_length=255)
    short_description = models.TextField()

    def __str__(self):
        return f"{self.name} - {self.role}"


class CustomUser(AbstractUser):
    fivem_id = models.CharField(max_length=255, blank=True, null=True)
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='customuser_groups',  # Updated related_name
        blank=True
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='customuser_permissions',  # Updated related_name
        blank=True
    )

    def __str__(self):
        return self.username

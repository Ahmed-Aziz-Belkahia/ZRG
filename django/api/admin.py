from django.contrib import admin
from .models import CustomUser, FeaturedServer, Stats, Script, Image, Category, Review, Framework, ShowcaseServer, Testimonial, FAQ, BlogPost, TeamMember

admin.site.register(Stats)
admin.site.register(FeaturedServer)
admin.site.register(Script)
admin.site.register(Image)
admin.site.register(Category)
admin.site.register(Review)
admin.site.register(Framework)
admin.site.register(ShowcaseServer)
admin.site.register(Testimonial)
admin.site.register(TeamMember)
admin.site.register(CustomUser)

@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ('question', 'answer')
    search_fields = ('question', 'answer')

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'published_date', 'category')
    search_fields = ('title', 'author', 'category')
    list_filter = ('category', 'published_date')
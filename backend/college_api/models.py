import uuid
from django.db import models

class Page(models.Model):
    slug = models.SlugField(max_length=100, unique=True)
    title = models.CharField(max_length=200)
    subtitle = models.CharField(max_length=300, blank=True)
    body = models.TextField(blank=True)
    image = models.CharField(max_length=500, blank=True)
    meta_info = models.JSONField(default=dict, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} ({self.slug})"

class Event(models.Model):
    title = models.CharField(max_length=250)
    description = models.TextField()
    date = models.CharField(max_length=100)
    venue = models.CharField(max_length=200)
    category = models.CharField(max_length=100, default='General')
    image = models.CharField(max_length=500, blank=True)
    is_featured = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Enquiry(models.Model):
    TYPE_CHOICES = [
        ('admissions', 'Admissions'),
        ('contact', 'Contact / General'),
    ]
    name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=30)
    type = models.CharField(max_length=50, choices=TYPE_CHOICES, default='contact')
    course_interest = models.CharField(max_length=100, blank=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.type} ({self.email})"

class KnowledgeEntry(models.Model):
    CATEGORY_CHOICES = [
        ('Courses', 'Courses & Programs'),
        ('Admissions', 'Admissions & Eligibility'),
        ('Fees', 'Fees & Scholarships'),
        ('Events', 'Events & Celebrations'),
        ('Facilities', 'Campus Facilities & Labs'),
        ('Placements', 'Placements & Career'),
        ('Contacts', 'Contacts & Directions'),
        ('General', 'General Information & History'),
    ]
    title = models.CharField(max_length=250)
    category = models.CharField(max_length=100, choices=CATEGORY_CHOICES)
    text = models.TextField()
    tags = models.CharField(max_length=300, blank=True, help_text="Comma-separated keywords")
    is_active = models.BooleanField(default=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"[{self.category}] {self.title}"

class ChatSession(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=250, default='New Conversation')
    visitor_id = models.CharField(max_length=100, blank=True, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)
    last_active_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-last_active_at']

    def __str__(self):
        return f"{self.title} ({self.id})"

class ChatMessage(models.Model):
    ROLE_CHOICES = [
        ('user', 'User'),
        ('assistant', 'Assistant'),
    ]
    session = models.ForeignKey(ChatSession, on_delete=models.CASCADE, related_name='messages')
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return f"{self.role}: {self.content[:40]}..."

class Setting(models.Model):
    key = models.CharField(max_length=100, unique=True)
    value = models.TextField()

    def __str__(self):
        return f"{self.key}={self.value}"

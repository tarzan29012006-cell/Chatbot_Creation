from django.contrib import admin
from .models import Page, Event, Enquiry, KnowledgeEntry, ChatSession, ChatMessage, Setting

@admin.register(Page)
class PageAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'updated_at')
    search_fields = ('title', 'slug', 'body')
    prepopulated_fields = {'slug': ('title',)}

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'venue', 'category', 'is_featured')
    list_filter = ('category', 'is_featured')
    search_fields = ('title', 'description', 'venue')

@admin.register(Enquiry)
class EnquiryAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'type', 'course_interest', 'created_at')
    list_filter = ('type', 'created_at')
    search_fields = ('name', 'email', 'phone', 'message')

@admin.register(KnowledgeEntry)
class KnowledgeEntryAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'is_active', 'updated_at')
    list_filter = ('category', 'is_active')
    search_fields = ('title', 'text', 'tags')

class ChatMessageInline(admin.TabularInline):
    model = ChatMessage
    extra = 0
    readonly_fields = ('role', 'content', 'created_at')
    can_delete = False

@admin.register(ChatSession)
class ChatSessionAdmin(admin.ModelAdmin):
    list_display = ('title', 'id', 'visitor_id', 'created_at', 'last_active_at')
    search_fields = ('title', 'id', 'visitor_id')
    inlines = [ChatMessageInline]

@admin.register(ChatMessage)
class ChatMessageAdmin(admin.ModelAdmin):
    list_display = ('id', 'session', 'role', 'short_content', 'created_at')
    list_filter = ('role', 'created_at')
    search_fields = ('content',)

    def short_content(self, obj):
        return obj.content[:60]
    short_content.short_description = "Message"

@admin.register(Setting)
class SettingAdmin(admin.ModelAdmin):
    list_display = ('key', 'value')
    search_fields = ('key', 'value')

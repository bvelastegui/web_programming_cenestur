from django.contrib import admin
from .models import Task


# Register your models here.
class TaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'status')
    search_fields = ['title']
    ordering = ['status']
    list_filter = ['status']


admin.site.register(Task, TaskAdmin)

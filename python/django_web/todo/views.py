from django.views.generic import ListView
from .models import Task


# Create your views here.
class TodoListView(ListView):
    template_name = 'todo/list.html'
    model = Task
    context_object_name = 'tasks'
    ordering = ['-created_at']

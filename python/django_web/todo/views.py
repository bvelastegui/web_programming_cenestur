import logging

from django.http import HttpResponseRedirect
from django.views.generic import ListView

from .forms import TodoForm
from .models import Task

logger = logging.getLogger(__name__)


def store_task(request):
    if request.method == 'POST':
        form = TodoForm(request.POST)

        if form.is_valid():
            Task.objects.create(
                title=request.POST['title'],
                description=request.POST['description'],
                status=0
            )

    return HttpResponseRedirect("/todo/")

def update_task(request, pk):
    if request.method == 'POST':
        form = TodoForm(request.POST)
        action = request.POST['action']
        if action == 'update' and form.is_valid():
            entry = Task.objects.get(pk=pk)
            entry.title = request.POST['title']
            entry.description = request.POST['description']
            entry.status = request.POST['status']
            entry.save()
        if action == 'delete':
            entry = Task.objects.get(pk=pk)
            entry.delete()

    return HttpResponseRedirect("/todo/")

class TodoListView(ListView):
    template_name = 'todo/list.html'
    model = Task
    context_object_name = 'tasks'
    ordering = ['status', '-created_at']

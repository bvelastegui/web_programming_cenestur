from django.urls import path
from . import views

app_name = "todo"
urlpatterns = [
    path('', views.TodoListView.as_view(), name='list'),
    path('add', views.store_task, name='add'),
    path('<pk>', views.update_task, name='update')
]
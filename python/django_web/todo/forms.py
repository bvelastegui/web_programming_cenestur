from . import models
from django import forms

class TodoForm(forms.ModelForm):
    class Meta:
        model = models.Task
        fields = ['title', 'description']
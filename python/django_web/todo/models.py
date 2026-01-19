from datetime import timezone

from django.db import models
from django.db.models.functions import datetime


# Create your models here.
class Task(models.Model):
    STATE_CHOICES = (
        (0, 'Pendiente'),
        (1, 'En Progreso'),
        (2, 'Completado')
    )
    title = models.CharField("titulo", max_length=200)
    description = models.TextField("descripción", null=True, blank=True)
    status = models.IntegerField("estado", choices=STATE_CHOICES)
    created_at = models.DateTimeField("Fecha de creación", auto_now_add=True)
    updated_at = models.DateTimeField("Fecha de actualización", auto_now=True)

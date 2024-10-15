from django.contrib import admin
from .models import Registros, Materias, Horarios

# Register your models here.
admin.site.register(Horarios)
admin.site.register(Materias)
admin.site.register(Registros)
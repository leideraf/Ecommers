from rest_framework import serializers
from .models import Registros, Horarios, Materias

class RegistrosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Registros
        fields = ['id', 'nombres', 'apellidos', 'correo', 'materia', 'horario']

class MateriasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Materias
        fields = '__all__' 

class HorariosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Horarios
        fields = '__all__' 